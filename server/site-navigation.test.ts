import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("site navigation", () => {
  const source = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");
  const styles = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

  it("keeps the requested main-menu order", () => {
    const expectedOrder = [
      '"/", "Início", "01"',
      '"/discografia", "Discografia", "02"',
      '"/kyaraverse", "Kyaraverse", "03"',
      '"/kyara", "Kyara", "04"',
      '"/shopping", "Shop", "05"',
      '"/glossario", "Glossário", "06"',
      '"/mural", "Mural", "07"',
      '"/mente", "Mente", "08"',
    ];

    let previousIndex = -1;
    for (const entry of expectedOrder) {
      const currentIndex = source.indexOf(entry);
      expect(currentIndex).toBeGreaterThan(previousIndex);
      previousIndex = currentIndex;
    }
  });

  it("exposes Discografia as a dedicated route", () => {
    expect(source).toContain('<Route path="/discografia" component={Discografia} />');
    expect(source).toContain("function Discografia()");
  });

  it("opens site media in an accessible enlarged viewer", () => {
    expect(source).toContain("const openMediaLightbox");
    expect(source).toContain('target.closest("img, video")');
    expect(source).toContain('data-media-src={A.hero}');
    expect(source).toContain('data-media-src={A.city}');
    expect(source).toContain('data-media-src={A.close}');
    expect(source).toContain('target.closest<HTMLElement>("[data-media-src]")');
    expect(source).toContain('target.closest("img, video")');
    expect(source).toContain('className="media-lightbox"');
    expect(source).toContain('event.key === "Escape"');
    expect(styles).toContain("main img,main video");
  });

  it("restores the star easter egg with message, audio, video and a real button target", () => {
    expect(source).toContain('className="easter-egg-trigger"');
    expect(source).toContain("eggTrigger");
    expect(source).toContain("const eggTextByLocale");
    expect(source).not.toContain("speechSynthesis");
    expect(source).not.toContain("eggVideoRef");
    expect(source).not.toContain("eggVideos");
    expect(source).not.toContain("A.eggImage");
    expect(source).toContain("A.eggAudioEn");
    expect(source).toContain("onClick={openEgg}");
    expect(source).toContain("setEggOpen(true);");
    expect(source).toContain('className="egg-popover"');
    expect(source).toContain('className="egg-system-screen"');
    expect(source).toContain("SYSTEM MESSAGE // 1420.405 MHz");
    expect(source).toContain("window.matchMedia?.(\"(prefers-reduced-motion: reduce)\")?.matches ?? false");
    expect(source).toContain('localStorage.getItem("kyara-transmission-started")');
    expect(source).toContain('localStorage.setItem("kyara-transmission-started", "1")');
  });

  it("offers the six requested locales and persists the selection", () => {
    for (const locale of ["en", "pt", "es", "ko", "fr", "zh"]) {
      expect(source).toContain(`value: \"${locale}\"`);
    }
    expect(source).toContain('localStorage.setItem("kyara-locale", locale)');
    expect(source).toContain("localizedMenu");
    expect(source).toContain('if (typeof window === "undefined") return "en"');
    expect(source).toContain('return saved && localeOptions.some((option) => option.value === saved) ? saved : "en"');
  });

  it("provides the corrected media and discography safeguards", () => {
    expect(source).toContain("eggImage");
    expect(source).toContain("eggAudioEn");
    expect(source).toContain('https://open.spotify.com/artist/1ZEO4vaVjI3UXFvpljQUNe');
    expect(source).toContain('https://open.spotify.com/album/5Om4sjTmnNSTbxXdnisI84');
    expect(source).toContain('https://open.spotify.com/embed/track/${track.spotifyId}');
    expect(source).toContain("spotify-track-extension");
    expect(source).toContain("spotify-track-phrase");
    expect(source).toContain("tracks.slice(0, 6)");
    expect(source).toContain("tracks.slice(6, 12)");
    expect(source).not.toContain("openPreviewIndex");
    expect(source).not.toContain("track-spotify-preview");
    expect(source).not.toContain("track-card");
    expect(source).not.toContain("image: A.kyaraCrystalHero");
    expect(source).toContain("discography-interlude-01_9c729fe1.mp4");
    expect(source).toContain("discography-interlude-02_95971f70.mp4");
    expect(source).toContain("videoSrc={A.discographyInterludeOne}");
    expect(source).toContain("videoSrc={A.discographyInterludeTwo}");
    expect(source).toContain("video.muted = muted");
    expect(source).toContain("videoRef.current.muted = nextMuted");
    expect(source).toContain('duration="02:03"');
    expect(source).toContain('duration="02:36"');
    expect(source).not.toContain("audioSrc={A.audio}");
    expect(source).not.toContain("audioSrc={A.audio2}");
    expect(source).toContain("muted={muted}");
    expect(source).toContain("FULL AUDIO TRANSMISSION");
    expect(source).toContain("interlude-load");
    expect(source).toContain("LOAD VIDEO TRANSMISSION");
    expect(source).toContain("THE END OF THE LINE");
    expect(source).toContain("SYNTHETIC TEARS");
    expect(source.indexOf('title: "ERROR 404"')).toBeLessThan(source.indexOf('title: "GLASS SKIN"'));
    expect(source.indexOf('title: "WIRED HEART"')).toBeLessThan(source.indexOf('title: "ZERO"'));
    expect(source).toContain("12 TRACKS // 45:13 // OFFICIAL SPOTIFY RELEASE");
    expect(source).toContain("const officialNotes: Record<Locale, string[]>");
    expect(source).toContain("The first sound emerging from absolute emptiness.");
    expect(source).toContain("O primeiro som que emerge do vazio absoluto.");
    expect(source).not.toContain("kyara Nova");
    expect(source).toContain("La traducción algorítmica del dolor.");
    expect(source).toContain("절대적인 공허에서 솟아나는 첫 소리.");
    expect(source).toContain("Le premier son qui émerge du vide absolu.");
    expect(source).toContain("从绝对虚空中浮现的第一个声音。");
    expect(styles).toContain(".spotify-track-extension");
    expect(styles).toContain(".egg-anchor { position:relative; width:82px;");
  });

  it("uses the requested public contact addresses and social channels", () => {
    expect(source).toContain('mailto:k.nova@kyaraver.com');
    expect(source).toContain('mailto:MGMi@kyaraverse.com');
    expect(source).toContain('© 2026 KYARAVERSE. © 2026 MG MI. TODOS OS DIREITOS RESERVADOS.');
    expect(source).not.toContain('mailto:knova@kyraverse.com');
    expect(source).not.toContain('mailto:MG@kyraverse.com');
    expect(source).not.toContain('mailto:Mirian.garciafoz@gmail.com');
    expect(source).not.toContain('https://www.youtube.com');
    expect(source).not.toContain('https://www.facebook.com');
  });

  it("keeps every official route registered", () => {
    for (const path of ["/", "/kyaraverse", "/kyara", "/discografia", "/shopping", "/glossario", "/mural", "/mente"]) {
      expect(source).toContain(`path="${path}"`);
    }
  });

  it("localizes the missing-route state instead of exposing Portuguese copy outside PT", () => {
    expect(source).toContain("function NotFound()");
    expect(source).toContain('en: { titleA: "This frequency"');
    expect(source).toContain('pt: { titleA: "Esta frequência"');
    expect(source).toContain('es: { titleA: "Esta frecuencia"');
    expect(source).toContain('ko: { titleA: "이 주파수는"');
    expect(source).toContain('fr: { titleA: "Cette fréquence"');
    expect(source).toContain('zh: { titleA: "这个频率"');
  });

  it("loads the preserved Mente narrative as a route chunk", () => {
    expect(source).toContain('lazy(() => import("./pages/MentePage"))');
    const mente = readFileSync(resolve(process.cwd(), "client/src/pages/MentePage.tsx"), "utf8");
    expect(mente).toContain("Miucha");
    expect(mente).toContain("Mirian Garcia");
    expect(mente).toContain('https://open.spotify.com/artist/2Mdf6kCk9q7TZmogkYc28m');
    expect(mente).toContain('https://www.instagram.com/just.mg.mi');
    expect(mente).toContain('https://soundcloud.com/mirian-kraiss-garcia');
    expect(mente).toContain('aria-label="MG Mi no Spotify"');
  });

  it("uses the approved critical posthumanism biography in Mente", () => {
    const mente = readFileSync(resolve(process.cwd(), "client/src/pages/MentePage.tsx"), "utf8");
    expect(mente).toContain("Nos três anos em que cursou Ciências Sociais na UFSC");
    expect(mente).toContain("perspectiva crítica da pós-humanidade");
    expect(mente).toContain("a arte surge como extensão sensível dessas relações");
    expect(mente).not.toContain("gestão, atendimento, vendas e processos administrativos");
  });

  it("preserves approved wording while replacing only unnecessary interface dashes", () => {
    expect(source).toContain("Dr. Kraush");
    expect(source).toContain("Dre Kraush");
    expect(source).toContain('eggDialog: "Easter Egg, Secret Message"');
    expect(source).toContain('eggDialog: "Easter Egg：秘密讯息"');
    expect(source).toContain("KYARA NOVA: OFFICIAL TRANSMISSION");
    expect(source).not.toContain("KYARA NOVA — OFFICIAL TRANSMISSION");
    expect(styles).toContain(".mente-social-links");
  });

  it("uses real locale-bound editorial copy and defers archive video loading", () => {
    expect(source).toContain("const pageText: Record<Locale, Record<string, string>>");
    for (const key of ["homeLead", "kyaraverseTitleA", "kyaraTitleA", "discographyTitleA", "glossaryTitleA", "shopTitleA", "muralTitleA"]) {
      expect(source).toContain(`copy.${key}`);
    }
    expect(source).toContain('preload="metadata" poster={video.poster}');
    expect(source).toContain('poster: A.signal');
    expect(source).toContain('poster: A.crystal');
    expect(source).toContain('poster: A.error');
    expect(source).toContain("const copy = pageText[locale]");
  });

  it("shows a short custom opening loader without adding new editorial copy", () => {
    expect(source).toContain("const [isBooting, setIsBooting] = useState(true)");
    expect(source).toContain('className={`boot-loader ${isBooting ? "is-active" : ""}`}');
    expect(source).toContain("labels.signalShift");
    expect(source).toContain("labels.receiving");
    const css = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
    expect(css).toContain(".boot-loader");
    expect(css).toContain("@keyframes boot-orbit");
    expect(css).toContain("prefers-reduced-motion");
  });

  it("pauses the ambient soundtrack when foreground audio or video starts", () => {
    expect(source).toContain('document.addEventListener("play", pauseAmbientForForegroundMedia, true)');
    expect(source).toContain("media === audioRef.current");
    expect(source).toContain("setSoundEnabled(false);");
    expect(source).toContain('if (mediaType === "video") setSoundEnabled(false);');
  });

  it("uses the newly supplied Home, Kyara archive, and Glossary assets", () => {
    expect(source).toContain("kyara-moon-stage_d0562a85.jpg");
    expect(source).toContain("kyara-crystal-halo_e8c5414e.png");
    expect(source).not.toContain("A.homeStage");
    expect(source).not.toContain("A.homeReader");
    expect(source).toContain("kyara-fire-profile_d72c8a60.webp");
    expect(source).toContain("kyara-fractured-reflection_f43d5c4f.webp");
    expect(source).toContain("glossaryCrystalStar");
    expect(source).toContain('className="glossary-star-corner"');
    expect(styles).toContain(".glossary-star-corner");
    expect(styles).toContain(".profile-visual img { aspect-ratio:3 / 5");
  });

  it("adds a touch-and-mouse puzzle to the Mural without replacing the contact form", () => {
    expect(source).toContain("function MuralPuzzle");
    expect(source).toContain("mural-puzzle-kyara_43dfa793.jpg");
    expect(source).toContain("const muralPuzzleOrder");
    expect(source).toContain("onClick={() => selectPiece(index)}");
    expect(source).toContain("onClick={resetPuzzle}");
    expect(source).toContain("aria-live=\"polite\"");
    expect(source).toContain('className="mural-form"');
    expect(styles).toContain(".mural-puzzle-board");
    expect(styles).toContain(".mural-puzzle-piece");
    expect(styles).toContain("touch-action:manipulation");
  });

  it("submits public Mural transmissions to the Cloudflare Worker without a Manus RPC client", () => {
    expect(source).toContain('const MURAL_API = "https://mural.kyaraverse.com"');
    expect(source).toContain('fetch(`${MURAL_API}/message`');
    expect(source).toContain('method: "POST"');
    expect(source).toContain('headers: { "Content-Type": "application/json" }');
    expect(source).toContain('body: JSON.stringify({ ...form, locale })');
    expect(source).toContain('if (!response.ok || !result?.success)');
    expect(source).toContain('setSent(true);');
    expect(source).not.toContain("trpc.mural.submit.useMutation");
  });

  it("limits repeated public Mural submissions before storing a new transmission", () => {
    const routerSource = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf8");
    expect(routerSource).toContain("MURAL_MAX_SUBMISSIONS");
    expect(routerSource).toContain("enforceMuralRateLimit");
    expect(routerSource).toContain("TOO_MANY_REQUESTS");
  });

  it("keeps the Mural inbox as a Cloudflare-protected archive shell", () => {
    expect(source).toContain('path="/mural/inbox"');
    expect(source).toContain("function MuralInbox");
    expect(source).toContain("protected in the Cloudflare environment");
    expect(source).toContain("Owner authentication is required.");
    expect(source).not.toContain("trpc.mural.list.useQuery");
  });

  it("keeps the translated interface catalog complete", () => {
    for (const locale of ["en", "pt", "es", "ko", "fr", "zh"]) {
      expect(source).toContain(`${locale}: {`);
    }
    for (const label of ["eggTrigger", "eggDialog", "playOriginal", "commandInput", "binaryCode", "modeToggle", "glossarySearch"]) {
      expect(source).toContain(label);
    }
  });
});
