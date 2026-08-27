import { useEffect } from "react";

export type SeoLocale = "en" | "pt" | "es" | "ko" | "fr" | "zh";

export const SITE_ORIGIN = "https://kyaranova.kyaraverse.com";
export const SITE_MEDIA_ORIGIN = "https://mural.kyaraverse.com";

export const localePrefixes: Record<SeoLocale, string> = {
  en: "",
  pt: "pt",
  es: "es",
  ko: "ko",
  fr: "fr",
  zh: "zh",
};

export const localeHtmlLang: Record<SeoLocale, string> = {
  en: "en",
  pt: "pt-BR",
  es: "es",
  ko: "ko",
  fr: "fr",
  zh: "zh-CN",
};

export const localeOg: Record<SeoLocale, string> = {
  en: "en_US",
  pt: "pt_BR",
  es: "es_ES",
  ko: "ko_KR",
  fr: "fr_FR",
  zh: "zh_CN",
};

export const localeHreflang: Record<SeoLocale, string> = {
  en: "en",
  pt: "pt-BR",
  es: "es",
  ko: "ko",
  fr: "fr",
  zh: "zh-Hans",
};

export const publicRoutes = ["/", "/discografia", "/kyaraverse", "/kyara", "/shopping", "/glossario", "/mural", "/mente"] as const;
export type PublicRoute = (typeof publicRoutes)[number];

export function getRoutePath(pathname: string): string {
  const clean = (pathname.split("?")[0] || "/").replace(/\/+$/, "") || "/";
  const segments = clean.split("/").filter(Boolean);
  if (segments.length && (Object.keys(localePrefixes) as SeoLocale[]).includes(segments[0] as SeoLocale)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return clean.startsWith("/") ? clean : `/${clean}`;
}

export function getLocaleFromPath(pathname: string): SeoLocale | null {
  const first = (pathname.split("?")[0] || "/").split("/").filter(Boolean)[0] as SeoLocale | undefined;
  return first && (Object.keys(localePrefixes) as SeoLocale[]).includes(first) ? first : null;
}

export function localizedPath(route: string, locale: SeoLocale): string {
  const normalizedRoute = route === "/" ? "" : `/${route.replace(/^\/+/, "")}`;
  const prefix = localePrefixes[locale];
  return prefix ? `/${prefix}${normalizedRoute || "/"}` : normalizedRoute || "/";
}

type SeoEntry = { title: string; description: string };

type SeoCatalog = Record<SeoLocale, Record<string, SeoEntry>>;

export const seoCatalog: SeoCatalog = {
  en: {
    "/": { title: "KYARA NOVA — Official Site & Kyaraverse Portal", description: "Official site of Kyara Nova: a virtual Brazilian artist, NOVA I, music, Kyaraverse lore, visual archives and transmissions." },
    "/discografia": { title: "Discography — KYARA NOVA", description: "Explore NOVA I by Kyara Nova, official track previews, the discography and the transmission archive." },
    "/kyaraverse": { title: "Kyaraverse Lore — KYARA NOVA", description: "Discover the Kyaraverse, Campo Nova, the Sonic Order, Dra. Kraush and the origins of Kyara Nova." },
    "/kyara": { title: "Kyara Nova — Virtual Artist & Identity", description: "Meet Kyara Nova, a virtual Brazilian artist shaped by music, artificial intelligence, memory and human imagination." },
    "/shopping": { title: "Artifacts & Shop — KYARA NOVA", description: "Explore official Kyara Nova and Kyaraverse artifacts connected to the signal." },
    "/glossario": { title: "Gloss Nova — Kyaraverse Lexicon", description: "Gloss Nova is the living lexicon of the Kyaraverse: terms, codes and fragments from the signal." },
    "/mural": { title: "Mural — Send a Transmission to KYARA NOVA", description: "Send a message, code, collaboration idea or transmission to Kyara Nova and the Novas." },
    "/mente": { title: "Mirian Garcia — Creator of KYARA NOVA", description: "Meet Mirian Garcia, the human creator behind Kyara Nova, the Kyaraverse and MG Mi." },
  },
  pt: {
    "/": { title: "KYARA NOVA — Site Oficial e Portal Kyaraverse", description: "Site oficial de Kyara Nova: artista virtual brasileira, NOVA I, música, lore do Kyaraverse, arquivos visuais e transmissões." },
    "/discografia": { title: "Discografia — KYARA NOVA", description: "Explore NOVA I, as prévias oficiais das faixas, a discografia e o arquivo de transmissões de Kyara Nova." },
    "/kyaraverse": { title: "Lore do Kyaraverse — KYARA NOVA", description: "Descubra o Kyaraverse, o Campo Nova, a Ordem Sonora, a Dra. Kraush e as origens de Kyara Nova." },
    "/kyara": { title: "Kyara Nova — Artista Virtual e Identidade", description: "Conheça Kyara Nova, uma artista virtual brasileira formada por música, inteligência artificial, memória e imaginação humana." },
    "/shopping": { title: "Artefatos e Loja — KYARA NOVA", description: "Explore os artefatos oficiais de Kyara Nova e do Kyaraverse conectados ao sinal." },
    "/glossario": { title: "Gloss Nova — Léxico do Kyaraverse", description: "Gloss Nova é o léxico vivo do Kyaraverse: termos, códigos e fragmentos do sinal." },
    "/mural": { title: "Mural — Envie uma Transmissão para KYARA NOVA", description: "Envie uma mensagem, código, ideia de colaboração ou transmissão para Kyara Nova e as Novas." },
    "/mente": { title: "Mirian Garcia — Criadora de KYARA NOVA", description: "Conheça Mirian Garcia, a criadora humana por trás de Kyara Nova, do Kyaraverse e de MG Mi." },
  },
  es: {
    "/": { title: "KYARA NOVA — Sitio Oficial y Portal Kyaraverse", description: "Sitio oficial de Kyara Nova: artista virtual brasileña, NOVA I, música, lore del Kyaraverse, archivos visuales y transmisiones." },
    "/discografia": { title: "Discografía — KYARA NOVA", description: "Explora NOVA I, las vistas previas oficiales, la discografía y el archivo de transmisiones de Kyara Nova." },
    "/kyaraverse": { title: "Lore del Kyaraverse — KYARA NOVA", description: "Descubre el Kyaraverse, Campo Nova, la Orden Sonora, la Dra. Kraush y los orígenes de Kyara Nova." },
    "/kyara": { title: "Kyara Nova — Artista Virtual e Identidad", description: "Conoce a Kyara Nova, una artista virtual brasileña formada por música, inteligencia artificial, memoria e imaginación humana." },
    "/shopping": { title: "Artefactos y Tienda — KYARA NOVA", description: "Explora los artefactos oficiales de Kyara Nova y del Kyaraverse conectados a la señal." },
    "/glossario": { title: "Gloss Nova — Léxico del Kyaraverse", description: "Gloss Nova es el léxico vivo del Kyaraverse: términos, códigos y fragmentos de la señal." },
    "/mural": { title: "Mural — Envía una Transmisión a KYARA NOVA", description: "Envía un mensaje, código, idea de colaboración o transmisión a Kyara Nova y las Novas." },
    "/mente": { title: "Mirian Garcia — Creadora de KYARA NOVA", description: "Conoce a Mirian Garcia, la creadora humana detrás de Kyara Nova, el Kyaraverse y MG Mi." },
  },
  ko: {
    "/": { title: "KYARA NOVA — 공식 사이트와 Kyaraverse 포털", description: "Kyara Nova 공식 사이트: 브라질 가상 아티스트, NOVA I, 음악, Kyaraverse 세계관, 시각 아카이브와 전송." },
    "/discografia": { title: "디스코그래피 — KYARA NOVA", description: "Kyara Nova의 NOVA I, 공식 트랙 미리듣기, 디스코그래피와 전송 아카이브를 만나보세요." },
    "/kyaraverse": { title: "Kyaraverse 세계관 — KYARA NOVA", description: "Kyaraverse, Nova 필드, 사운드 오더, Dra. Kraush와 Kyara Nova의 기원을 발견하세요." },
    "/kyara": { title: "Kyara Nova — 가상 아티스트와 정체성", description: "음악, 인공지능, 기억과 인간의 상상력으로 만들어진 브라질 가상 아티스트 Kyara Nova를 만나보세요." },
    "/shopping": { title: "아티팩트와 상점 — KYARA NOVA", description: "신호와 연결된 Kyara Nova 및 Kyaraverse 공식 아티팩트를 탐색하세요." },
    "/glossario": { title: "Gloss Nova — Kyaraverse 용어집", description: "Gloss Nova는 신호의 용어, 코드와 파편을 담은 Kyaraverse의 살아 있는 용어집입니다." },
    "/mural": { title: "벽화 — KYARA NOVA에 전송 보내기", description: "Kyara Nova와 Novas에게 메시지, 코드, 협업 아이디어 또는 전송을 보내세요." },
    "/mente": { title: "Mirian Garcia — KYARA NOVA의 창작자", description: "Kyara Nova, Kyaraverse와 MG Mi를 만든 인간 창작자 Mirian Garcia를 만나보세요." },
  },
  fr: {
    "/": { title: "KYARA NOVA — Site officiel et portail Kyaraverse", description: "Site officiel de Kyara Nova : artiste virtuelle brésilienne, NOVA I, musique, lore du Kyaraverse, archives visuelles et transmissions." },
    "/discografia": { title: "Discographie — KYARA NOVA", description: "Découvrez NOVA I, les aperçus officiels, la discographie et l'archive des transmissions de Kyara Nova." },
    "/kyaraverse": { title: "Lore du Kyaraverse — KYARA NOVA", description: "Découvrez le Kyaraverse, le Campo Nova, l'Ordre Sonore, la Dre Kraush et les origines de Kyara Nova." },
    "/kyara": { title: "Kyara Nova — Artiste virtuelle et identité", description: "Rencontrez Kyara Nova, une artiste virtuelle brésilienne façonnée par la musique, l'intelligence artificielle, la mémoire et l'imagination humaine." },
    "/shopping": { title: "Artefacts et boutique — KYARA NOVA", description: "Explorez les artefacts officiels de Kyara Nova et du Kyaraverse reliés au signal." },
    "/glossario": { title: "Gloss Nova — Lexique du Kyaraverse", description: "Gloss Nova est le lexique vivant du Kyaraverse : termes, codes et fragments du signal." },
    "/mural": { title: "Mural — Envoyer une transmission à KYARA NOVA", description: "Envoyez un message, un code, une idée de collaboration ou une transmission à Kyara Nova et aux Novas." },
    "/mente": { title: "Mirian Garcia — Créatrice de KYARA NOVA", description: "Découvrez Mirian Garcia, la créatrice humaine derrière Kyara Nova, le Kyaraverse et MG Mi." },
  },
  zh: {
    "/": { title: "KYARA NOVA — 官方网站与 Kyaraverse 门户", description: "Kyara Nova 官方网站：巴西虚拟艺术家、NOVA I、音乐、Kyaraverse 世界观、视觉档案与传输。" },
    "/discografia": { title: "唱片目录 — KYARA NOVA", description: "探索 Kyara Nova 的 NOVA I、官方曲目预览、唱片目录与传输档案。" },
    "/kyaraverse": { title: "Kyaraverse 世界观 — KYARA NOVA", description: "发现 Kyaraverse、Nova 领域、声音秩序、Dra. Kraush 与 Kyara Nova 的起源。" },
    "/kyara": { title: "Kyara Nova — 虚拟艺术家与身份", description: "认识 Kyara Nova：由音乐、人工智能、记忆与人类想象力共同塑造的巴西虚拟艺术家。" },
    "/shopping": { title: "遗物与商店 — KYARA NOVA", description: "探索与信号相连的 Kyara Nova 和 Kyaraverse 官方遗物。" },
    "/glossario": { title: "Gloss Nova — Kyaraverse 词汇表", description: "Gloss Nova 是 Kyaraverse 的活词汇表，收录信号中的术语、代码与碎片。" },
    "/mural": { title: "壁画 — 向 KYARA NOVA 发送传输", description: "向 Kyara Nova 与 Novas 发送消息、代码、合作想法或传输。" },
    "/mente": { title: "Mirian Garcia — KYARA NOVA 的创作者", description: "认识 Mirian Garcia：Kyara Nova、Kyaraverse 与 MG Mi 背后的创作者。" },
  },
};

function setMeta(name: string, content: string, property = false) {
  const attribute = property ? "property" : "name";
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setLink(rel: string, href: string, extra: Record<string, string> = {}) {
  const selector = rel === "canonical" ? 'link[rel="canonical"]' : `link[data-kyara-seo="${rel}"]`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    if (rel !== "canonical") element.dataset.kyaraSeo = rel;
    document.head.appendChild(element);
  }
  element.href = href;
  Object.entries(extra).forEach(([key, value]) => element!.setAttribute(key, value));
  return element;
}

export function useSiteSeo(locale: SeoLocale, pathname: string) {
  useEffect(() => {
    const route = getRoutePath(pathname);
    const entry = seoCatalog[locale][route] ?? seoCatalog.en[route] ?? seoCatalog[locale]["/"];
    const canonical = `${SITE_ORIGIN}${localizedPath(route, locale)}`;
    const isPrivateRoute = route === "/mural/inbox";

    document.documentElement.lang = localeHtmlLang[locale];
    document.title = entry.title;
    setMeta("description", entry.description);
    setMeta("robots", isPrivateRoute ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta("theme-color", "#080b09");
    setMeta("og:title", entry.title, true);
    setMeta("og:description", entry.description, true);
    setMeta("og:url", canonical, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "KYARA NOVA / Kyaraverse", true);
    setMeta("og:locale", localeOg[locale], true);
    setMeta("og:image", `${SITE_MEDIA_ORIGIN}/media/hero-crystal_8a6cd8a8.webp`, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", entry.title);
    setMeta("twitter:description", entry.description);
    setMeta("twitter:image", `${SITE_MEDIA_ORIGIN}/media/hero-crystal_8a6cd8a8.webp`);
    setLink("canonical", canonical);

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove());
    (Object.keys(localePrefixes) as SeoLocale[]).forEach((alternateLocale) => {
      const alternate = document.createElement("link");
      alternate.rel = "alternate";
      alternate.hreflang = localeHreflang[alternateLocale];
      alternate.href = `${SITE_ORIGIN}${localizedPath(route, alternateLocale)}`;
      alternate.dataset.kyaraSeo = "alternate";
      document.head.appendChild(alternate);
    });
    const fallback = document.createElement("link");
    fallback.rel = "alternate";
    fallback.hreflang = "x-default";
    fallback.href = `${SITE_ORIGIN}/`;
    fallback.dataset.kyaraSeo = "alternate";
    document.head.appendChild(fallback);

    let structuredData = document.head.querySelector<HTMLScriptElement>('#kyara-seo-jsonld');
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "kyara-seo-jsonld";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
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
          "@type": "WebPage",
          "@id": `${canonical}#webpage`,
          url: canonical,
          name: entry.title,
          description: entry.description,
          inLanguage: localeHtmlLang[locale],
          isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
          about: { "@id": `${SITE_ORIGIN}/#artist` },
        },
      ],
    });
  }, [locale, pathname]);
}
