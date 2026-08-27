import fs from "node:fs";
import path from "node:path";
import {
  SITE_MEDIA_ORIGIN,
  SITE_ORIGIN,
  localeHtmlLang,
  localeHreflang,
  localeOg,
  localePrefixes,
  localizedPath,
  publicRoutes,
  seoCatalog,
  type SeoLocale,
} from "../client/src/seo";

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, "dist", "public");
const templatePath = path.join(distRoot, "index.html");
const template = fs.readFileSync(templatePath, "utf8");
const locales = Object.keys(localePrefixes) as SeoLocale[];
const image = `${SITE_MEDIA_ORIGIN}/media/hero-crystal_8a6cd8a8.webp`;
const robots = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function localizedUrl(route: string, locale: SeoLocale) {
  return `${SITE_ORIGIN}${localizedPath(route, locale)}`;
}

function jsonLd(route: (typeof publicRoutes)[number], locale: SeoLocale, canonical: string, entry: { title: string; description: string }) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        name: "KYARA NOVA / Kyaraverse",
        url: SITE_ORIGIN,
        inLanguage: localeHtmlLang[locale],
        description: seoCatalog[locale]["/"].description,
      },
      {
        "@type": "MusicGroup",
        "@id": `${SITE_ORIGIN}/#artist`,
        name: "Kyara Nova",
        url: SITE_ORIGIN,
        description: "Brazilian virtual artist at the intersection of music, artificial intelligence and human imagination.",
        genre: ["dark electropop", "synthwave", "electronic pop"],
        sameAs: [
          "https://open.spotify.com/artist/1ZEO4vaVjI3UXFvpljQUNe",
          "https://www.instagram.com/just.k.nova",
          "https://www.youtube.com/channel/UCDhkt_QUqv33PY-izv_vPMg",
        ],
      },
      {
        "@type": route === "/discografia" ? "MusicAlbum" : "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: entry.title,
        description: entry.description,
        inLanguage: localeHtmlLang[locale],
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        about: { "@id": `${SITE_ORIGIN}/#artist` },
      },
    ],
  };
  return JSON.stringify(graph).replaceAll("<", "\\u003c");
}

function withoutDynamicHead(source: string) {
  return source
    .replace(/\s*<meta name="description"[^>]*\/>/g, "")
    .replace(/\s*<meta name="robots"[^>]*\/>/g, "")
    .replace(/\s*<meta name="googlebot"[^>]*\/>/g, "")
    .replace(/\s*<meta name="theme-color"[^>]*\/>/g, "")
    .replace(/\s*<meta property="og:[^"]+"[^>]*\/>/g, "")
    .replace(/\s*<meta name="twitter:[^"]+"[^>]*\/>/g, "")
    .replace(/\s*<link rel="canonical"[^>]*\/>/g, "")
    .replace(/\s*<link rel="alternate"[^>]*\/>/g, "")
    .replace(/\s*<title>[^<]*<\/title>/g, "")
    .replace(/\s*<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, "");
}

function pageHtml(route: (typeof publicRoutes)[number], locale: SeoLocale) {
  const entry = seoCatalog[locale][route];
  const canonical = localizedUrl(route, locale);
  const alternates = locales
    .map((alternateLocale) => {
      return `    <link rel="alternate" hreflang="${localeHreflang[alternateLocale]}" href="${escapeHtml(localizedUrl(route, alternateLocale))}" />`;
    })
    .concat(`    <link rel="alternate" hreflang="x-default" href="${escapeHtml(localizedUrl(route, "en"))}" />`)
    .join("\n");
  const metadata = [
    `    <meta name="description" content="${escapeHtml(entry.description)}" />`,
    `    <meta name="robots" content="${robots}" />`,
    `    <meta name="googlebot" content="${robots}" />`,
    `    <meta name="theme-color" content="#080b09" />`,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:site_name" content="KYARA NOVA / Kyaraverse" />`,
    `    <meta property="og:title" content="${escapeHtml(entry.title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(entry.description)}" />`,
    `    <meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `    <meta property="og:locale" content="${localeOg[locale]}" />`,
    `    <meta property="og:image" content="${image}" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${escapeHtml(entry.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(entry.description)}" />`,
    `    <meta name="twitter:image" content="${image}" />`,
    `    <link rel="canonical" href="${escapeHtml(canonical)}" />`,
    alternates,
    `    <title>${escapeHtml(entry.title)}</title>`,
    `    <script id="kyara-seo-jsonld" type="application/ld+json">${jsonLd(route, locale, canonical, entry)}</script>`,
  ].join("\n");
  return withoutDynamicHead(template)
    .replace('<html lang="en">', `<html lang="${localeHtmlLang[locale]}">`)
    .replace("  </head>", `${metadata}\n  </head>`);
}

for (const locale of locales) {
  for (const route of publicRoutes) {
    const prefix = localePrefixes[locale];
    const routeDirectory = route === "/" ? "" : route.slice(1);
    const outputDirectory = path.join(distRoot, prefix, routeDirectory);
    fs.mkdirSync(outputDirectory, { recursive: true });
    fs.writeFileSync(path.join(outputDirectory, "index.html"), pageHtml(route, locale));
  }
}

console.log(`Generated ${locales.length * publicRoutes.length} static SEO pages in ${distRoot}`);
