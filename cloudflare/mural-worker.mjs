const ALLOWED_ORIGINS = new Set([
  "https://kyaranova.kyaraverse.com",
  "https://kyara-nova-site.pages.dev",
]);

const BLOCKED_WORDS = [
  "spam", "viagra", "casino", "porn", "xxx", "fuck", "shit", "bitch", "merda", "porra", "caralho", "idiota", "otario",
];

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const rateMap = new Map();
const legacyMediaOrigin = "https://kyaranova-kdbxcdvq.manus.space/manus-storage/";

function corsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://kyaranova.kyaraverse.com";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Admin-Token",
    Vary: "Origin",
  };
}

function isSafeMediaKey(value) {
  return typeof value === "string" && /^[a-zA-Z0-9._-]+$/.test(value);
}

function sanitize(value) {
  return String(value ?? "")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .trim();
}

function isBlocked(value) {
  const lower = value.toLowerCase();
  return BLOCKED_WORDS.some((word) => lower.includes(word));
}

function underRateLimit(ip) {
  const now = Date.now();
  const previous = rateMap.get(ip) ?? [];
  const recent = previous.filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return false;
  recent.push(now);
  rateMap.set(ip, recent);
  return true;
}

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

async function serveMedia(key, env) {
  const object = await env.KYARA_MEDIA.get(key);
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("ETag", object.httpEtag);
  return new Response(object.body, { headers });
}

async function migrateMedia(request, env) {
  if (request.headers.get("Authorization") !== `Bearer ${env.MIGRATION_TOKEN}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!isSafeMediaKey(payload?.key)) return new Response("Invalid key", { status: 400 });

  const upstream = await fetch(`${legacyMediaOrigin}${encodeURIComponent(payload.key)}`);
  if (!upstream.ok || !upstream.body) return new Response("Source unavailable", { status: 502 });

  await env.KYARA_MEDIA.put(payload.key, upstream.body, {
    httpMetadata: {
      contentType: upstream.headers.get("content-type") ?? "application/octet-stream",
      cacheControl: "public, max-age=31536000, immutable",
    },
  });

  return json({ success: true, key: payload.key });
}

async function listMessages(env, headers, url) {
  const cursor = url.searchParams.get("cursor") || undefined;
  const list = await env.KYARA_MURAL.list({ limit: 100, cursor });
  const messages = list.keys
    .map((entry) => entry.metadata)
    .filter(Boolean)
    .sort((a, b) => b.timestamp - a.timestamp);

  return json({ success: true, messages, hasMore: !list.list_complete, cursor: list.list_complete ? null : list.cursor }, 200, headers);
}

async function createMessage(request, env, headers) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (!underRateLimit(ip)) {
    return json({ success: false, error: "RATE_LIMIT" }, 429, headers);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ success: false, error: "INVALID_JSON" }, 400, headers);
  }

  const name = sanitize(payload.name).slice(0, 120);
  const email = sanitize(payload.email).slice(0, 320);
  const purpose = sanitize(payload.purpose).slice(0, 120);
  const message = sanitize(payload.message).slice(0, 4000);
  const locale = ["en", "pt", "es", "ko", "fr", "zh"].includes(payload.locale) ? payload.locale : "en";

  if (name.length < 2 || message.length < 5 || !email.includes("@") || !purpose) {
    return json({ success: false, error: "INVALID_FIELDS" }, 400, headers);
  }
  if (isBlocked(`${name} ${message}`)) return json({ success: false, error: "MODERATED" }, 403, headers);

  const id = `${Date.now().toString(36)}${crypto.randomUUID().slice(0, 8)}`;
  const record = { id, name, email, purpose, message, locale, timestamp: Date.now(), emailDelivered: false };
  await env.KYARA_MURAL.put(id, JSON.stringify(record), { metadata: record });
  return json({ success: true, delivered: false }, 200, headers);
}

async function deleteMessage(request, env, headers, pathname) {
  if (request.headers.get("X-Admin-Token") !== env.ADMIN_TOKEN) {
    return json({ success: false, error: "UNAUTHORIZED" }, 401, headers);
  }

  const id = pathname.replace("/message/", "");
  if (!id) return json({ success: false, error: "MISSING_ID" }, 400, headers);
  await env.KYARA_MURAL.delete(id);
  return json({ success: true }, 200, headers);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = corsHeaders(request.headers.get("Origin") || "");

    if (request.method === "OPTIONS") return new Response(null, { headers });
    if (request.method === "GET" && url.pathname === "/health") return json({ status: "ok", timestamp: Date.now() }, 200, headers);
    if (request.method === "GET" && url.pathname.startsWith("/media/")) {
      const key = decodeURIComponent(url.pathname.slice("/media/".length));
      return isSafeMediaKey(key) ? serveMedia(key, env) : new Response("Not found", { status: 404 });
    }
    if (request.method === "POST" && url.pathname === "/migrate") return migrateMedia(request, env);
    if (request.method === "GET" && url.pathname === "/messages") {
      if (request.headers.get("X-Admin-Token") !== env.ADMIN_TOKEN) {
        return json({ success: false, error: "UNAUTHORIZED" }, 401, headers);
      }
      return listMessages(env, headers, url);
    }
    if (request.method === "POST" && (url.pathname === "/message" || url.pathname === "/")) return createMessage(request, env, headers);
    if (request.method === "DELETE" && url.pathname.startsWith("/message/")) return deleteMessage(request, env, headers, url.pathname);
    return json({ success: false, error: "NOT_FOUND" }, 404, headers);
  },
};
