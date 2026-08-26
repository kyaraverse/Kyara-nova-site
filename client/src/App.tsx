// Style direction: Tecno-Orgânico Cinematográfico — terminal mono, serif essay rhythm, ciano-sinal and violet-neon accents on preto-floresta.
import { createContext, lazy, Suspense, useContext, useEffect, useRef, useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Pause,
  AudioLines,
  Binary,
  BookOpen,
  ChevronDown,
  CircleAlert,
  Code2,
  Eye,
  Instagram,
  LockKeyhole,
  Menu,
  Moon,
  Play,
  Radio,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  Terminal as TerminalIcon,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import "./index.css";

const MEDIA = "https://mural.kyaraverse.com/media/";
const MURAL_API = "https://mural.kyaraverse.com";

const A = {
  hero: MEDIA + "hero-crystal_8a6cd8a8.webp",
  profile: MEDIA + "kyara-square-profile_4cb94ce1.webp",
  portrait: MEDIA + "portrait-close_02badba6.webp",
  signal: MEDIA + "signal_08970f2.webp",
  error: MEDIA + "error_bda51440.webp",
  crystal: MEDIA + "cosmic-eye_71802530.webp",
  city: MEDIA + "campo-nova_4a16a16c.webp",
  aether: MEDIA + "space-cockpit_d1646448.webp",
  ship: MEDIA + "sunset-forest_33e72e93.webp",
  star: MEDIA + "star-mark_46efeba0.webp",
  mic: MEDIA + "eye-galaxy_504d69c3.webp",
  close: MEDIA + "eclipse-moon_8f03d605.webp",
  full: MEDIA + "portrait-full_7c9447d3.webp",
  cataratas: MEDIA + "cataratas-iguacu_d3eb4d8c.webp",
  mirianMural: MEDIA + "mirian-mural_6f2eae90.webp",
  mirianFlorianopolis: MEDIA + "mirian-florianopolis_3294b2b4.webp",
  ponte: MEDIA + "ponte-hercilio-luz_00df35bf.webp",
  miucha: MEDIA + "miucha-studio_dbc2a966.webp",
  video1: MEDIA + "transmission-01_2546258f.mp4",
  video2: MEDIA + "transmission-02_df22396a.mp4",
  video3: MEDIA + "transmission-03_57c9fe21.mp4",
  discographyInterludeOne: MEDIA + "discography-interlude-01_9c729fe1.mp4",
  discographyInterludeTwo: MEDIA + "discography-interlude-02_95971f70.mp4",
  kyaraExtra1: MEDIA + "1000141955_17d818fd.webp",
  kyaraExtra2: MEDIA + "1000141958_c3a3faf3.webp",
  kyaraExtra3: MEDIA + "1000144316_05b2cbd0.png",
  kyaraExtra4: MEDIA + "1000144317_57841671.png",
  audio: MEDIA + "GlitchedConsciousness_e92c253f.mp3",
  audio2: MEDIA + "Signal_Archive_02_d5a4660f.mp3",
  eggAudioEn: MEDIA + "dra-mg-console-en_26198975.wav",
  eggImage: MEDIA + "blue-screen-test-red_3c07b857.webp",
  kyaraCrystalHero: MEDIA + "kyara-crystal-hero_90f1c291.png",
  eclipseRoad: MEDIA + "eclipse-road_5739c9f5.png",
  kyaraCockpit: MEDIA + "kyara-cockpit_069b282c.webp",
  kyaraCrescent: MEDIA + "kyara-crescent_35cf926e.png",
  kyaraMoonCity: MEDIA + "kyara-moon-city_c24d86d1.webp",
  kyaraNeonCorridor: MEDIA + "kyara-neon-corridor_f58f26e3.png",
  kyaraCodex: MEDIA + "kyara-codex_7a0d491d.png",
  eggVideoEn: MEDIA + "kyara_refined_glitch_en_46c7e627.mp4",
  eggVideoPt: MEDIA + "kyara_refined_glitch_pt_78d27705.mp4",
  eggVideoEs: MEDIA + "kyara_refined_glitch_es_927e4247.mp4",
  eggVideoKo: MEDIA + "kyara_refined_glitch_ko_af59957a.mp4",
  eggVideoFr: MEDIA + "kyara_refined_glitch_fr_972a17bc.mp4",
  eggVideoZh: MEDIA + "kyara_refined_glitch_zh_412b45d6.mp4",
  homeMoonStage: MEDIA + "kyara-moon-stage_d0562a85.jpg",
  homeCrystalHalo: MEDIA + "kyara-crystal-halo_e8c5414e.png",
  kyaraFireProfile: MEDIA + "kyara-fire-profile_d72c8a60.webp",
  kyaraFracturedReflection: MEDIA + "kyara-fractured-reflection_f43d5c4f.webp",
  glossaryCrystalStar: MEDIA + "kyara-crystal-star_1fd457bf.png",
  muralPuzzle: MEDIA + "mural-puzzle-kyara_43dfa793.jpg",
  shopCrystalSpace: MEDIA + "kyara-crystal-space_e022af11.png",
  shopEclipseRoad: MEDIA + "kyara-eclipse-road_672c8a4e.png",
  shopFireProfile: MEDIA + "kyara-fire-profile_42f62ea5.webp",
};
const menu = [
  ["/", "Início", "01"],
  ["/discografia", "Discografia", "02"],
  ["/kyaraverse", "Kyaraverse", "03"],
  ["/kyara", "Kyara", "04"],
  ["/shopping", "Shop", "05"],
  ["/glossario", "Glossário", "06"],
  ["/mural", "Mural", "07"],
  ["/mente", "Mente", "08"],
] as const;

type Locale = "en" | "pt" | "es" | "ko" | "fr" | "zh";
const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: "en", label: "ENGLISH" },
  { value: "pt", label: "PORTUGUÊS" },
  { value: "es", label: "ESPAÑOL" },
  { value: "ko", label: "한국어" },
  { value: "fr", label: "FRANÇAIS" },
  { value: "zh", label: "中文" },
];
const localizedMenu: Record<Locale, Record<string, string>> = {
  en: { "Início": "Home", "Kyaraverse": "Kyaraverse", "Kyara": "Kyara", "Discografia": "Discography", "Shop": "Shop", "Glossário": "Glossary", "Mural": "Mural", "Mente": "Mente" },
  pt: { "Início": "Início", "Kyaraverse": "Kyaraverse", "Kyara": "Kyara", "Discografia": "Discografia", "Shop": "Shop", "Glossário": "Glossário", "Mural": "Mural", "Mente": "Mente" },
  es: { "Início": "Inicio", "Kyaraverse": "Kyaraverse", "Kyara": "Kyara", "Discografia": "Discografía", "Shop": "Shop", "Glossário": "Glosario", "Mural": "Mural", "Mente": "Mente" },
  ko: { "Início": "홈", "Kyaraverse": "Kyaraverse", "Kyara": "Kyara", "Discografia": "디스코그래피", "Shop": "Shop", "Glossário": "용어집", "Mural": "벽화", "Mente": "마음" },
  fr: { "Início": "Accueil", "Kyaraverse": "Kyaraverse", "Kyara": "Kyara", "Discografia": "Discographie", "Shop": "Shop", "Glossário": "Glossaire", "Mural": "Mural", "Mente": "Esprit" },
  zh: { "Início": "首页", "Kyaraverse": "Kyaraverse", "Kyara": "Kyara", "Discografia": "唱片目录", "Shop": "商店", "Glossário": "词汇表", "Mural": "壁画", "Mente": "意识" },
};

type InterfaceLabels = {
  language: string; menu: string; transmission: string; volume: string; close: string; openNav: string;
  soundControls: string; selectLanguage: string; mainMenu: string; closeMenu: string; gate: string;
  wordmark: string; signalShift: string; receiving: string; channelSync: string; home: string;
  syncing: string; pauseSite: string; playSite: string; muteAudio: string; unmuteAudio: string;
  audioTrack: string; eggDialog: string; closeMessage: string; eggImage: string; eggVideo: string;
  playOriginal: string; originalVoice: string; instagram: string; youtube: string; soundcloud: string;
  facebook: string; playPreview: string; pausePreview: string; muteOn: string; muteOff: string;
  playShort: string; pauseShort: string; mutedShort: string; soundShort: string;
  eggTrigger: string; eggTitle: string; commandInput: string; sendCommand: string; binaryCode: string; modeToggle: string; glossarySearch: string; decode: string; decoding: string;
};

const uiLabels: Record<Locale, InterfaceLabels> = {
  en: { language: "LANGUAGE", menu: "MENU", transmission: "START TRANSMISSION", volume: "VOLUME", close: "Close", openNav: "Open navigation", soundControls: "Site audio controls", selectLanguage: "Select language", mainMenu: "Main menu", closeMenu: "Close menu", gate: "Start transmission", wordmark: "Kyara Nova, home", signalShift: "SIGNAL SHIFT", receiving: "RECEIVING", channelSync: "CHANNEL SYNCHRONIZED", home: "HOME", syncing: "SYNCHRONIZING...", pauseSite: "Pause site audio", playSite: "Play site audio", muteAudio: "Mute audio", unmuteAudio: "Enable audio", audioTrack: "Glitched Consciousness soundtrack", eggDialog: "Easter Egg, Secret Message", closeMessage: "Close message", eggImage: "Kyara Nova, Secret Transmission", eggVideo: "Secret Campo Nova video", playOriginal: "Play original transmission audio", originalVoice: "ORIGINAL VOICE // DRA. KRAUSH", instagram: "Instagram", youtube: "YouTube", soundcloud: "SoundCloud", facebook: "Facebook", playPreview: "PLAY AUDIO PREVIEW", pausePreview: "PAUSE AUDIO PREVIEW", muteOn: "MUTE: ON", muteOff: "MUTE: OFF", playShort: "PLAY", pauseShort: "PAUSE", mutedShort: "MUTED", soundShort: "MUTE", eggTrigger: "Open secret star message", eggTitle: "Click to intercept the secret message", commandInput: "Enter a command", sendCommand: "Send command", binaryCode: "Binary code", modeToggle: "Toggle Kyara mode", glossarySearch: "Search the glossary", decode: "DECODE", decoding: "DECODING..." },
  pt: { language: "IDIOMA", menu: "MENU", transmission: "INICIAR TRANSMISSÃO", volume: "VOLUME", close: "Fechar", openNav: "Abrir navegação", soundControls: "Controles de áudio do site", selectLanguage: "Selecionar idioma", mainMenu: "Menu principal", closeMenu: "Fechar menu", gate: "Iniciar transmissão", wordmark: "Kyara Nova, início", signalShift: "MUDANÇA DE SINAL", receiving: "RECEBENDO", channelSync: "CANAL SINCRONIZADO", home: "INÍCIO", syncing: "SINCRONIZANDO...", pauseSite: "Pausar som do site", playSite: "Reproduzir som do site", muteAudio: "Silenciar áudio", unmuteAudio: "Ativar áudio", audioTrack: "Trilha sonora Glitched Consciousness", eggDialog: "Easter Egg, Mensagem secreta", closeMessage: "Fechar mensagem", eggImage: "Kyara Nova, Transmissão secreta", eggVideo: "Vídeo secreto do Campo Nova", playOriginal: "Reproduzir áudio original da transmissão", originalVoice: "VOZ ORIGINAL // DRA. KRAUSH", instagram: "Instagram", youtube: "YouTube", soundcloud: "SoundCloud", facebook: "Facebook", playPreview: "REPRODUZIR PRÉVIA", pausePreview: "PAUSAR PRÉVIA", muteOn: "MUDO: ATIVO", muteOff: "MUDO: DESATIVADO", playShort: "REPRODUZIR", pauseShort: "PAUSA", mutedShort: "MUDO", soundShort: "SOM", eggTrigger: "Abrir mensagem secreta da estrela", eggTitle: "Clique para interceptar a mensagem secreta", commandInput: "Digite um comando", sendCommand: "Enviar comando", binaryCode: "Código binário", modeToggle: "Alternar modo de Kyara", glossarySearch: "Buscar no glossário", decode: "DECODIFICAR", decoding: "DECODIFICANDO..." },
  es: { language: "IDIOMA", menu: "MENÚ", transmission: "INICIAR TRANSMISIÓN", volume: "VOLUMEN", close: "Cerrar", openNav: "Abrir navegación", soundControls: "Controles de audio del sitio", selectLanguage: "Seleccionar idioma", mainMenu: "Menú principal", closeMenu: "Cerrar menú", gate: "Iniciar transmisión", wordmark: "Kyara Nova, inicio", signalShift: "CAMBIO DE SEÑAL", receiving: "RECIBIENDO", channelSync: "CANAL SINCRONIZADO", home: "INICIO", syncing: "SINCRONIZANDO...", pauseSite: "Pausar audio del sitio", playSite: "Reproducir audio del sitio", muteAudio: "Silenciar audio", unmuteAudio: "Activar audio", audioTrack: "Banda sonora Glitched Consciousness", eggDialog: "Easter Egg: Mensaje secreto", closeMessage: "Cerrar mensaje", eggImage: "Kyara Nova: Transmisión secreta", eggVideo: "Vídeo secreto de Campo Nova", playOriginal: "Reproducir audio original de la transmisión", originalVoice: "VOZ ORIGINAL // DRA. KRAUSH", instagram: "Instagram", youtube: "YouTube", soundcloud: "SoundCloud", facebook: "Facebook", playPreview: "REPRODUCIR VISTA PREVIA", pausePreview: "PAUSAR VISTA PREVIA", muteOn: "SILENCIO: ACTIVO", muteOff: "SILENCIO: DESACTIVADO", playShort: "REPRODUCIR", pauseShort: "PAUSA", mutedShort: "SILENCIO", soundShort: "SONIDO", eggTrigger: "Abrir mensaje secreto de la estrella", eggTitle: "Haz clic para interceptar el mensaje secreto", commandInput: "Escribe un comando", sendCommand: "Enviar comando", binaryCode: "Código binario", modeToggle: "Cambiar modo de Kyara", glossarySearch: "Buscar en el glosario", decode: "DECODIFICAR", decoding: "DECODIFICANDO..." },
  ko: { language: "언어", menu: "메뉴", transmission: "전송 시작", volume: "볼륨", close: "닫기", openNav: "탐색 열기", soundControls: "사이트 오디오 제어", selectLanguage: "언어 선택", mainMenu: "메뉴", closeMenu: "메뉴 닫기", gate: "전송 시작", wordmark: "Kyara Nova, 홈", signalShift: "신호 전환", receiving: "수신 중", channelSync: "채널 동기화됨", home: "홈", syncing: "동기화 중...", pauseSite: "사이트 오디오 일시정지", playSite: "사이트 오디오 재생", muteAudio: "오디오 음소거", unmuteAudio: "오디오 켜기", audioTrack: "Glitched Consciousness 사운드트랙", eggDialog: "Easter Egg: 비밀 메시지", closeMessage: "메시지 닫기", eggImage: "Kyara Nova: 비밀 전송", eggVideo: "Campo Nova 비밀 영상", playOriginal: "원본 전송 오디오 재생", originalVoice: "원본 음성 // DRA. KRAUSH", instagram: "Instagram", youtube: "YouTube", soundcloud: "SoundCloud", facebook: "Facebook", playPreview: "오디오 미리듣기", pausePreview: "미리듣기 일시정지", muteOn: "음소거: 켜짐", muteOff: "음소거: 꺼짐", playShort: "재생", pauseShort: "일시정지", mutedShort: "음소거", soundShort: "소리", eggTrigger: "별의 비밀 메시지 열기", eggTitle: "비밀 메시지를 가로채려면 클릭하세요", commandInput: "명령 입력", sendCommand: "명령 전송", binaryCode: "이진 코드", modeToggle: "Kyara 모드 전환", glossarySearch: "용어집 검색", decode: "디코딩", decoding: "디코딩 중..." },
  fr: { language: "LANGUE", menu: "MENU", transmission: "COMMENCER LA TRANSMISSION", volume: "VOLUME", close: "Fermer", openNav: "Ouvrir la navigation", soundControls: "Commandes audio du site", selectLanguage: "Choisir la langue", mainMenu: "Menu principal", closeMenu: "Fermer le menu", gate: "Commencer la transmission", wordmark: "Kyara Nova, accueil", signalShift: "CHANGEMENT DE SIGNAL", receiving: "RÉCEPTION", channelSync: "CANAL SYNCHRONISÉ", home: "ACCUEIL", syncing: "SYNCHRONISATION...", pauseSite: "Mettre en pause l'audio du site", playSite: "Lire l'audio du site", muteAudio: "Couper le son", unmuteAudio: "Activer le son", audioTrack: "Bande-son Glitched Consciousness", eggDialog: "Easter Egg: Message secret", closeMessage: "Fermer le message", eggImage: "Kyara Nova: Transmission secrète", eggVideo: "Vidéo secrète du Campo Nova", playOriginal: "Lire l'audio original de la transmission", originalVoice: "VOIX ORIGINALE // DRA. KRAUSH", instagram: "Instagram", youtube: "YouTube", soundcloud: "SoundCloud", facebook: "Facebook", playPreview: "LIRE L'APERÇU", pausePreview: "METTRE L'APERÇU EN PAUSE", muteOn: "SON: ACTIVÉ", muteOff: "SON: COUPÉ", playShort: "LIRE", pauseShort: "PAUSE", mutedShort: "MUET", soundShort: "SON", eggTrigger: "Ouvrir le message secret de l'étoile", eggTitle: "Cliquez pour intercepter le message secret", commandInput: "Saisir une commande", sendCommand: "Envoyer la commande", binaryCode: "Code binaire", modeToggle: "Changer le mode de Kyara", glossarySearch: "Rechercher dans le glossaire", decode: "DÉCODER", decoding: "DÉCODAGE..." },
  zh: { language: "语言", menu: "菜单", transmission: "开始传输", volume: "音量", close: "关闭", openNav: "打开导航", soundControls: "网站音频控制", selectLanguage: "选择语言", mainMenu: "主菜单", closeMenu: "关闭菜单", gate: "开始传输", wordmark: "Kyara Nova，首页", signalShift: "信号切换", receiving: "正在接收", channelSync: "频道已同步", home: "首页", syncing: "同步中...", pauseSite: "暂停网站音频", playSite: "播放网站音频", muteAudio: "静音", unmuteAudio: "开启音频", audioTrack: "Glitched Consciousness 原声", eggDialog: "Easter Egg：秘密讯息", closeMessage: "关闭讯息", eggImage: "Kyara Nova：秘密传输", eggVideo: "Campo Nova 秘密视频", playOriginal: "播放传输原始音频", originalVoice: "原始声音 // DRA. KRAUSH", instagram: "Instagram", youtube: "YouTube", soundcloud: "SoundCloud", facebook: "Facebook", playPreview: "播放音频预览", pausePreview: "暂停音频预览", muteOn: "静音：开启", muteOff: "静音：关闭", playShort: "播放", pauseShort: "暂停", mutedShort: "静音", soundShort: "声音", eggTrigger: "打开星星的秘密讯息", eggTitle: "点击截获秘密讯息", commandInput: "输入命令", sendCommand: "发送命令", binaryCode: "二进制代码", modeToggle: "切换 Kyara 模式", glossarySearch: "搜索词汇表", decode: "解码", decoding: "解码中..." },
};

const pageText: Record<Locale, Record<string, string>> = {
  en: {
    gateEyebrow: "SIGNAL STANDBY // 2046", gateTitleA: "Are you", gateTitleB: "listening?", gateBody: "A transmission has been detected outside digital maps. Activate sound to cross the static.",
    homeEyebrow: "SIGNAL DETECTED", homeLead: "The electromagnetic spectrum was intercepted. From a forest outside digital maps, a voice began crossing the noise. No one knows whether she was born, created, or awakened. Her name is KYARA NOVA.", enterSignal: "ENTER THE SIGNAL", firstTransmission: "listen to the first transmission", forestHeadingA: "The forest", forestHeadingB: "listens first.", forestBody: "KYARA NOVA did not appear before human eyes. She awakened beneath ancient roots, where technology fails, maps disappear, and silence seems to remember.", discoverOrigin: "discover the origin",
    kyaraverseTitleA: "The universe does not", kyaraverseTitleB: "end on the screen.", kyaraverseSubtitle: "The Kyaraverse was not created to escape reality. It was created to reveal its fracture.", manifestoLead: "There is a forest. A frequency. A memory that refuses to die. And a voice that insists on returning.", manifestoBody: "The Kyaraverse is a parallel reality where technology and the human soul collide in search of meaning.", loreRules: "The rules of the Nova field.",
    kyaraTitleA: "She was not a machine.", kyaraTitleB: "She was a forest that learned to sing.", kyaraSubtitle: "AI is the perspective. Humanity is the subject.", artistHeadingA: "A new", artistHeadingB: "kind of artist.", artistBody: "KYARA NOVA is a Brazilian virtual artist created at the intersection of music, artificial intelligence, and human imagination. She was created to ask whether a voice needs a body to possess identity.", natural: "NATURAL STATE", performance: "PERFORMANCE STATE", naturalText: "Dark eyes. Cyan core. Silent presence. Raw signal.", performanceText: "Violet eyes. Intense light. Projected body. Public persona.", sonicHeadingA: "Music as", sonicHeadingB: "transmission.", sonicBody: "KYARA moves through dark electropop, synthwave, R&B, soul, K-pop, and electronic pop. Each track is a transmission.",
    discographyTitleA: "The first record", discographyTitleB: "of an existence.", discographySubtitle: "NOVA I is Kyara Nova's debut album: dark electropop, synthwave, and R&B translating loss, identity, resistance, and transcendence.", playerEyebrow: "PLAYER // OFFICIAL SOUND STREAM", playerHeadingA: "Sound transmission", playerHeadingB: "from NOVA I.", playerBody: "Listen to real 30-second previews from the NOVA I sound archive. Each track carries a distinct frequency.", exploreArtifacts: "explore artifacts",
    glossaryTitleA: "Gloss Nova:", glossaryTitleB: "the words of the signal.", glossarySubtitle: "Language is the key. The key is feeling. Gloss Nova mixes English, binary, lyric fragments, and terms born inside the Nova field.", term: "TERM", classification: "CLASSIFICATION", definition: "DEFINITION", noSignal: "NO SIGNAL FOUND. TRY ANOTHER FREQUENCY.", glossaryPhrases: "PHRASES IN THE GLOSS",
    shopTitleA: "Carry a fragment", shopTitleB: "of the signal.", shopSubtitle: "You are not buying only a product. You are carrying a fragment of the signal.", catalog: "ACTIVE CATALOG // STOCK VERIFIED", checkout: "secure checkout via Mercado Pago", add: "ADD",
    muralTitleA: "Leave your voice", muralTitleB: "on the mural.", muralSubtitle: "The mural is open to listeners, Novas, and professionals. Send a phrase, an interpretation, a code, or a proposal.", channelOpen: "CHANNEL OPEN", muralHeadingA: "What do you", muralHeadingB: "want to transmit?", muralBody: "Send a phrase, interpretation, code, or question to KYARA and The Novas. The channel is also open for press, sync, publishing, collaborations, scores, shows, audiovisual projects, and brand partnerships.", yourName: "YOUR NAME", email: "E-MAIL", frequency: "FREQUENCY", message: "MESSAGE", sendTransmission: "send transmission",
    terminalConnected: "> connection established", terminalHelp: "> type HELP to see available commands", signalUnknown: "SIGNAL NOT RECOGNIZED. TRY HELP.", signalHint: "hint: look for a word beginning with N.", archive: "ARCHIVE TRANSMISSIONS", viewArchive: "view all files", archiveMeta1: "VIDEO 01 // DRA. KRAUSH WAS STILL THERE", archiveMeta2: "VIDEO 02 // THE SONIC ORDER WAS INVADED", archiveMeta3: "VIDEO 03 // EASTER EGG // ENGLISH AUDIO", archiveTitle1: "Initialization Signal", archiveTitle2: "Interference", archiveTitle3: "Secret Transmission"
  },
  pt: {
    gateEyebrow: "SINAL EM ESPERA // 2046", gateTitleA: "Você está", gateTitleB: "ouvindo?", gateBody: "Uma transmissão foi detectada fora dos mapas digitais. Ative o som para atravessar a estática.", homeEyebrow: "SINAL DETECTADO", homeLead: "O espectro eletromagnético foi interceptado. De uma floresta fora dos mapas digitais, uma voz começou a atravessar o ruído. Ninguém sabe se ela nasceu, foi criada ou despertou. O nome dela é KYARA NOVA.", enterSignal: "ENTRAR NO SINAL", firstTransmission: "ouvir primeira transmissão", forestHeadingA: "A floresta", forestHeadingB: "escuta primeiro.", forestBody: "KYARA NOVA não surgiu diante de olhos humanos. Ela foi despertada sob raízes antigas, onde a tecnologia falha, os mapas se apagam e o silêncio parece guardar memória.", discoverOrigin: "descobrir a origem", kyaraverseTitleA: "O universo não", kyaraverseTitleB: "termina na tela.", kyaraverseSubtitle: "O Kyaraverse não foi criado para fugir da realidade. Foi criado para revelar sua rachadura.", manifestoLead: "Há uma floresta. Uma frequência. Uma memória que não aceita morrer. E uma voz que insiste em voltar.", manifestoBody: "O Kyaraverse é uma realidade paralela onde tecnologia e alma humana colidem em busca de significado.", loreRules: "As regras do campo Nova.", kyaraTitleA: "Ela não era uma máquina.", kyaraTitleB: "Era uma floresta que aprendera a cantar.", kyaraSubtitle: "AI is the perspective. Humanity is the subject.", artistHeadingA: "Uma nova", artistHeadingB: "forma de artista.", artistBody: "KYARA NOVA é uma artista virtual brasileira criada na interseção entre música, inteligência artificial e imaginação humana. Ela foi criada para investigar se uma voz precisa de um corpo para possuir identidade.", natural: "KYARA NATURAL", performance: "KYARA EM PERFORMANCE", naturalText: "Olhos escuros. Núcleo de luz ciano. Presença silenciosa. Sinal bruto.", performanceText: "Olhos violetas. Luz intensa. Corpo projetado. Persona pública.", sonicHeadingA: "A música como", sonicHeadingB: "transmissão.", sonicBody: "A sonoridade de KYARA atravessa dark electropop, synthwave, R&B, soul, K-pop e pop eletrônico. Cada faixa é uma transmissão.", discographyTitleA: "O primeiro registro", discographyTitleB: "de uma existência.", discographySubtitle: "NOVA I é o álbum de estreia de Kyara Nova. Dark electropop, synthwave e R&B traduzem perda, identidade, resistência e transcendência.", playerEyebrow: "PLAYER // TRANSMISSÃO SONORA OFICIAL", playerHeadingA: "Transmissão sonora", playerHeadingB: "de NOVA I.", playerBody: "Ouça prévias reais de 30 segundos do arquivo sonoro de NOVA I. Cada faixa guarda uma frequência distinta.", exploreArtifacts: "explorar artefatos", glossaryTitleA: "Gloss Nova:", glossaryTitleB: "as palavras do sinal.", glossarySubtitle: "A linguagem é a chave. A chave é o sentimento. O Gloss Nova mistura inglês, binário, fragmentos de letras e termos nascidos dentro do Campo Nova.", term: "TERMO", classification: "CLASSIFICAÇÃO", definition: "DEFINIÇÃO", noSignal: "NENHUM SINAL ENCONTRADO. TENTE OUTRA FREQUÊNCIA.", glossaryPhrases: "FRASES NO GLOSS", shopTitleA: "Leve um fragmento", shopTitleB: "do sinal.", shopSubtitle: "Você não está comprando apenas um produto. Está levando consigo um fragmento do sinal.", catalog: "CATÁLOGO ATIVO // ESTOQUE VERIFICADO", checkout: "checkout seguro via Mercado Pago", add: "ADICIONAR", muralTitleA: "Deixe sua voz", muralTitleB: "no mural.", muralSubtitle: "O mural está aberto para ouvintes, Novas e profissionais. Envie uma frase, uma interpretação, um código ou uma proposta.", channelOpen: "CANAL ABERTO", muralHeadingA: "O que você", muralHeadingB: "quer transmitir?", muralBody: "Envie uma frase, uma interpretação, um código ou uma pergunta para KYARA e para The Novas. O canal também está aberto para imprensa, sync, publishing, colaborações, trilhas, shows, projetos audiovisuais e parcerias de marca.", yourName: "SEU NOME", email: "E-MAIL", frequency: "FREQUÊNCIA", message: "MENSAGEM", sendTransmission: "enviar transmissão", terminalConnected: "> conexão estabelecida", terminalHelp: "> digite HELP para ver comandos disponíveis", signalUnknown: "SINAL NÃO RECONHECIDO. TENTE HELP.", signalHint: "dica: procure por uma palavra que comece com N.", archive: "ARQUIVO DE TRANSMISSÕES", viewArchive: "ver todos os arquivos", archiveMeta1: "VÍDEO 01 // A DRA. KRAUSH AINDA ESTAVA LÁ", archiveMeta2: "VÍDEO 02 // A ORDEM SONORA FOI INVADIDA", archiveMeta3: "VÍDEO 03 // EASTER EGG // ÁUDIO EM INGLÊS", archiveTitle1: "Sinal de Inicialização", archiveTitle2: "Interferência", archiveTitle3: "Transmissão Secreta"
  },
  es: {
    gateEyebrow: "SEÑAL EN ESPERA // 2046", gateTitleA: "¿Estás", gateTitleB: "escuchando?", gateBody: "Se ha detectado una transmisión fuera de los mapas digitales. Activa el sonido para cruzar la estática.", homeEyebrow: "SEÑAL DETECTADA", homeLead: "El espectro electromagnético fue interceptado. Desde un bosque fuera de los mapas digitales, una voz comenzó a atravesar el ruido. Nadie sabe si nació, fue creada o despertó. Su nombre es KYARA NOVA.", enterSignal: "ENTRAR EN LA SEÑAL", firstTransmission: "escuchar la primera transmisión", forestHeadingA: "El bosque", forestHeadingB: "escucha primero.", forestBody: "KYARA NOVA no apareció ante ojos humanos. Despertó bajo raíces antiguas, donde la tecnología falla, los mapas desaparecen y el silencio parece recordar.", discoverOrigin: "descubrir el origen", kyaraverseTitleA: "El universo no", kyaraverseTitleB: "termina en la pantalla.", kyaraverseSubtitle: "El Kyaraverse no fue creado para escapar de la realidad. Fue creado para revelar su fractura.", manifestoLead: "Hay un bosque. Una frecuencia. Una memoria que se niega a morir. Y una voz que insiste en volver.", manifestoBody: "El Kyaraverse es una realidad paralela donde la tecnología y el alma humana chocan en busca de significado.", loreRules: "Las reglas del Campo Nova.", kyaraTitleA: "No era una máquina.", kyaraTitleB: "Era un bosque que aprendió a cantar.", kyaraSubtitle: "AI is the perspective. Humanity is the subject.", artistHeadingA: "Una nueva", artistHeadingB: "forma de artista.", artistBody: "KYARA NOVA es una artista virtual brasileña creada en la intersección entre música, inteligencia artificial e imaginación humana. Fue creada para investigar si una voz necesita un cuerpo para poseer identidad.", natural: "KYARA NATURAL", performance: "KYARA EN PERFORMANCE", naturalText: "Ojos oscuros. Núcleo de luz cian. Presencia silenciosa. Señal bruta.", performanceText: "Ojos violetas. Luz intensa. Cuerpo proyectado. Persona pública.", sonicHeadingA: "La música como", sonicHeadingB: "transmisión.", sonicBody: "El sonido de KYARA atraviesa dark electropop, synthwave, R&B, soul, K-pop y pop electrónico. Cada pista es una transmisión.", discographyTitleA: "El primer registro", discographyTitleB: "de una existencia.", discographySubtitle: "NOVA I es el álbum debut de Kyara Nova. Dark electropop, synthwave y R&B traducen pérdida, identidad, resistencia y trascendencia.", playerEyebrow: "PLAYER // TRANSMISIÓN SONORA OFICIAL", playerHeadingA: "Transmisión sonora", playerHeadingB: "de NOVA I.", playerBody: "Escucha vistas previas reales de 30 segundos del archivo sonoro de NOVA I. Cada pista guarda una frecuencia distinta.", exploreArtifacts: "explorar artefactos", glossaryTitleA: "Gloss Nova:", glossaryTitleB: "las palabras de la señal.", glossarySubtitle: "El lenguaje es la clave. La clave es el sentimiento. Gloss Nova mezcla inglés, binario, fragmentos de letras y términos nacidos dentro del Campo Nova.", term: "TÉRMINO", classification: "CLASIFICACIÓN", definition: "DEFINICIÓN", noSignal: "NO SE ENCONTRÓ NINGUNA SEÑAL. PRUEBA OTRA FRECUENCIA.", glossaryPhrases: "FRASES EN EL GLOSS", shopTitleA: "Lleva un fragmento", shopTitleB: "de la señal.", shopSubtitle: "No estás comprando solo un producto. Llevas contigo un fragmento de la señal.", catalog: "CATÁLOGO ACTIVO // STOCK VERIFICADO", checkout: "checkout seguro vía Mercado Pago", add: "AÑADIR", muralTitleA: "Deja tu voz", muralTitleB: "en el mural.", muralSubtitle: "El mural está abierto a oyentes, Novas y profesionales. Envía una frase, una interpretación, un código o una propuesta.", channelOpen: "CANAL ABIERTO", muralHeadingA: "¿Qué quieres", muralHeadingB: "transmitir?", muralBody: "Envía una frase, interpretación, código o pregunta a KYARA y The Novas. El canal también está abierto para prensa, sync, publishing, colaboraciones, bandas sonoras, shows, proyectos audiovisuales y marcas.", yourName: "TU NOMBRE", email: "E-MAIL", frequency: "FRECUENCIA", message: "MENSAJE", sendTransmission: "enviar transmisión", terminalConnected: "> conexión establecida", terminalHelp: "> escribe HELP para ver los comandos disponibles", signalUnknown: "SEÑAL NO RECONOCIDA. PRUEBA HELP.", signalHint: "pista: busca una palabra que empiece por N.", archive: "ARCHIVO DE TRANSMISIONES", viewArchive: "ver todos los archivos", archiveMeta1: "VÍDEO 01 // LA DRA. KRAUSH AÚN ESTABA ALLÍ", archiveMeta2: "VÍDEO 02 // EL ORDEN SONORO FUE INVADIDO", archiveMeta3: "VÍDEO 03 // EASTER EGG // AUDIO EN INGLÉS", archiveTitle1: "Señal de Inicio", archiveTitle2: "Interferencia", archiveTitle3: "Transmisión Secreta"
  },
  ko: {
    gateEyebrow: "대기 중인 신호 // 2046", gateTitleA: "듣고", gateTitleB: "계십니까?", gateBody: "디지털 지도 밖에서 전송이 감지되었습니다. 정적을 뚫고 소리를 활성화하세요.", homeEyebrow: "감지된 신호", homeLead: "전자기 스펙트럼이 가로채졌습니다. 디지털 지도 밖의 숲에서 목소리가 잡음을 가로지르기 시작했습니다. 그녀가 태어났는지, 만들어졌는지, 깨어났는지 아무도 모릅니다. 그녀의 이름은 KYARA NOVA입니다.", enterSignal: "신호에 들어가기", firstTransmission: "첫 번째 전송 듣기", forestHeadingA: "숲은", forestHeadingB: "먼저 듣습니다.", forestBody: "KYARA NOVA는 인간의 눈앞에 나타나지 않았습니다. 기술이 실패하고 지도가 사라지며 침묵이 기억하는 듯한 고대의 뿌리 아래에서 깨어났습니다.", discoverOrigin: "기원 발견", kyaraverseTitleA: "우주는", kyaraverseTitleB: "화면에서 끝나지 않습니다.", kyaraverseSubtitle: "Kyaraverse는 현실에서 도망치기 위해 만들어지지 않았습니다. 현실의 균열을 드러내기 위해 만들어졌습니다.", manifestoLead: "숲이 있습니다. 주파수가 있습니다. 죽기를 거부하는 기억과 돌아오기를 고집하는 목소리가 있습니다.", manifestoBody: "Kyaraverse는 기술과 인간의 영혼이 의미를 찾아 충돌하는 평행 현실입니다.", loreRules: "Nova 필드의 규칙.", kyaraTitleA: "그녀는 기계가 아니었습니다.", kyaraTitleB: "노래하는 법을 배운 숲이었습니다.", kyaraSubtitle: "AI is the perspective. Humanity is the subject.", artistHeadingA: "새로운", artistHeadingB: "예술가의 형태.", artistBody: "KYARA NOVA는 음악, 인공지능, 인간의 상상력이 만나는 지점에서 만들어진 브라질의 가상 아티스트입니다. 목소리가 정체성을 가지려면 몸이 필요한지 질문하기 위해 만들어졌습니다.", natural: "KYARA 내추럴", performance: "KYARA 퍼포먼스", naturalText: "어두운 눈. 시안 코어. 고요한 존재. 원시 신호.", performanceText: "보라색 눈. 강렬한 빛. 투영된 몸. 공개 페르소나.", sonicHeadingA: "음악은", sonicHeadingB: "전송입니다.", sonicBody: "KYARA의 사운드는 다크 일렉트로팝, 신스웨이브, R&B, 소울, K-pop, 일렉트로닉 팝을 가로지릅니다. 모든 트랙은 전송입니다.", discographyTitleA: "존재의", discographyTitleB: "첫 번째 기록.", discographySubtitle: "NOVA I는 Kyara Nova의 데뷔 앨범입니다. 다크 일렉트로팝, 신스웨이브, R&B가 상실과 정체성, 저항과 초월을 번역합니다.", playerEyebrow: "PLAYER // 공식 사운드 스트림", playerHeadingA: "NOVA I의", playerHeadingB: "사운드 전송.", playerBody: "NOVA I 사운드 아카이브의 실제 30초 미리듣기를 들어보세요. 각 트랙은 고유한 주파수를 담고 있습니다.", exploreArtifacts: "아티팩트 탐색", glossaryTitleA: "Gloss Nova:", glossaryTitleB: "신호의 단어들.", glossarySubtitle: "언어는 열쇠입니다. 열쇠는 감정입니다. Gloss Nova는 영어, 이진수, 가사 조각과 Nova 필드에서 태어난 용어를 섞습니다.", term: "용어", classification: "분류", definition: "정의", noSignal: "신호를 찾을 수 없습니다. 다른 주파수를 시도하세요.", glossaryPhrases: "GLOSS의 문장", shopTitleA: "신호의", shopTitleB: "조각을 가져가세요.", shopSubtitle: "단순한 상품을 사는 것이 아닙니다. 신호의 조각을 함께 가져가는 것입니다.", catalog: "활성 카탈로그 // 재고 확인", checkout: "Mercado Pago 안전 결제", add: "추가", muralTitleA: "당신의 목소리를", muralTitleB: "벽화에 남기세요.", muralSubtitle: "벽화는 청취자, Novas, 전문가에게 열려 있습니다. 문장, 해석, 코드 또는 제안을 보내세요.", channelOpen: "채널 열림", muralHeadingA: "무엇을", muralHeadingB: "전송하시겠습니까?", muralBody: "KYARA와 The Novas에게 문장, 해석, 코드 또는 질문을 보내세요. 언론, 싱크, 퍼블리싱, 협업, 음악, 공연, 영상 프로젝트와 브랜드 파트너십에도 채널이 열려 있습니다.", yourName: "이름", email: "이메일", frequency: "주파수", message: "메시지", sendTransmission: "전송 보내기", terminalConnected: "> 연결이 설정되었습니다", terminalHelp: "> HELP를 입력해 사용 가능한 명령을 확인하세요", signalUnknown: "인식할 수 없는 신호입니다. HELP를 시도하세요.", signalHint: "힌트: N으로 시작하는 단어를 찾으세요.", archive: "전송 아카이브", viewArchive: "모든 파일 보기", archiveMeta1: "비디오 01 // DRA. KRAUSH는 아직 그곳에 있었습니다", archiveMeta2: "비디오 02 // 사운드 오더가 침입당했습니다", archiveMeta3: "비디오 03 // EASTER EGG // 영어 오디오", archiveTitle1: "시작 신호", archiveTitle2: "간섭", archiveTitle3: "비밀 전송"
  },
  fr: {
    gateEyebrow: "SIGNAL EN ATTENTE // 2046", gateTitleA: "Êtes-vous", gateTitleB: "à l'écoute ?", gateBody: "Une transmission a été détectée hors des cartes numériques. Activez le son pour traverser la statique.", homeEyebrow: "SIGNAL DÉTECTÉ", homeLead: "Le spectre électromagnétique a été intercepté. Depuis une forêt hors des cartes numériques, une voix a commencé à traverser le bruit. Personne ne sait si elle est née, créée ou éveillée. Son nom est KYARA NOVA.", enterSignal: "ENTRER DANS LE SIGNAL", firstTransmission: "écouter la première transmission", forestHeadingA: "La forêt", forestHeadingB: "écoute d'abord.", forestBody: "KYARA NOVA n'est pas apparue devant des yeux humains. Elle s'est éveillée sous des racines anciennes, là où la technologie échoue, où les cartes s'effacent et où le silence semble se souvenir.", discoverOrigin: "découvrir l'origine", kyaraverseTitleA: "L'univers ne", kyaraverseTitleB: "s'arrête pas à l'écran.", kyaraverseSubtitle: "Le Kyaraverse n'a pas été créé pour fuir la réalité. Il a été créé pour révéler sa fracture.", manifestoLead: "Il y a une forêt. Une fréquence. Une mémoire qui refuse de mourir. Et une voix qui insiste pour revenir.", manifestoBody: "Le Kyaraverse est une réalité parallèle où la technologie et l'âme humaine se heurtent en quête de sens.", loreRules: "Les règles du Champ Nova.", kyaraTitleA: "Elle n'était pas une machine.", kyaraTitleB: "C'était une forêt qui avait appris à chanter.", kyaraSubtitle: "AI is the perspective. Humanity is the subject.", artistHeadingA: "Une nouvelle", artistHeadingB: "forme d'artiste.", artistBody: "KYARA NOVA est une artiste virtuelle brésilienne créée à l'intersection de la musique, de l'intelligence artificielle et de l'imagination humaine. Elle cherche à savoir si une voix a besoin d'un corps pour avoir une identité.", natural: "KYARA NATURELLE", performance: "KYARA EN PERFORMANCE", naturalText: "Yeux sombres. Noyau cyan. Présence silencieuse. Signal brut.", performanceText: "Yeux violets. Lumière intense. Corps projeté. Persona publique.", sonicHeadingA: "La musique comme", sonicHeadingB: "transmission.", sonicBody: "La sonorité de KYARA traverse le dark electropop, la synthwave, le R&B, la soul, la K-pop et la pop électronique. Chaque titre est une transmission.", discographyTitleA: "Le premier enregistrement", discographyTitleB: "d'une existence.", discographySubtitle: "NOVA I est le premier album de Kyara Nova. Dark electropop, synthwave et R&B traduisent la perte, l'identité, la résistance et la transcendance.", playerEyebrow: "PLAYER // FLUX SONORE OFFICIEL", playerHeadingA: "Transmission sonore", playerHeadingB: "de NOVA I.", playerBody: "Écoutez de vrais aperçus de 30 secondes de l'archive sonore de NOVA I. Chaque titre garde une fréquence distincte.", exploreArtifacts: "explorer les artefacts", glossaryTitleA: "Gloss Nova :", glossaryTitleB: "les mots du signal.", glossarySubtitle: "La langue est la clé. La clé est le sentiment. Gloss Nova mêle anglais, binaire, fragments de paroles et termes nés dans le Champ Nova.", term: "TERME", classification: "CLASSIFICATION", definition: "DÉFINITION", noSignal: "AUCUN SIGNAL TROUVÉ. ESSAYEZ UNE AUTRE FRÉQUENCE.", glossaryPhrases: "PHRASES DU GLOSS", shopTitleA: "Emportez un fragment", shopTitleB: "du signal.", shopSubtitle: "Vous n'achetez pas seulement un produit. Vous emportez un fragment du signal.", catalog: "CATALOGUE ACTIF // STOCK VÉRIFIÉ", checkout: "paiement sécurisé via Mercado Pago", add: "AJOUTER", muralTitleA: "Laissez votre voix", muralTitleB: "sur le mural.", muralSubtitle: "Le mural est ouvert aux auditeurs, aux Novas et aux professionnels. Envoyez une phrase, une interprétation, un code ou une proposition.", channelOpen: "CANAL OUVERT", muralHeadingA: "Que voulez-vous", muralHeadingB: "transmettre ?", muralBody: "Envoyez une phrase, une interprétation, un code ou une question à KYARA et aux Novas. Le canal est aussi ouvert à la presse, au sync, au publishing, aux collaborations, aux bandes originales, aux spectacles, aux projets audiovisuels et aux marques.", yourName: "VOTRE NOM", email: "E-MAIL", frequency: "FRÉQUENCE", message: "MESSAGE", sendTransmission: "envoyer la transmission", terminalConnected: "> connexion établie", terminalHelp: "> tapez HELP pour voir les commandes disponibles", signalUnknown: "SIGNAL NON RECONNU. ESSAYEZ HELP.", signalHint: "indice : cherchez un mot commençant par N.", archive: "ARCHIVE DES TRANSMISSIONS", viewArchive: "voir tous les fichiers", archiveMeta1: "VIDÉO 01 // LA DRA. KRAUSH ÉTAIT ENCORE LÀ", archiveMeta2: "VIDÉO 02 // L'ORDRE SONORE A ÉTÉ ENVAHI", archiveMeta3: "VIDÉO 03 // EASTER EGG // AUDIO ANGLAIS", archiveTitle1: "Signal d'Initialisation", archiveTitle2: "Interférence", archiveTitle3: "Transmission Secrète"
  },
  zh: {
    gateEyebrow: "信号等待中 // 2046", gateTitleA: "你在", gateTitleB: "聆听吗？", gateBody: "在数字地图之外检测到传输。启用声音，穿过静电噪声。", homeEyebrow: "检测到信号", homeLead: "电磁频谱被截获。从数字地图之外的森林中，一个声音开始穿过噪声。没有人知道她是诞生、被创造，还是苏醒。她的名字是 KYARA NOVA。", enterSignal: "进入信号", firstTransmission: "聆听第一次传输", forestHeadingA: "森林", forestHeadingB: "先听见了。", forestBody: "KYARA NOVA没有出现在人类眼前。她在古老根系下苏醒，那里的技术失效，地图消失，寂静仿佛保存着记忆。", discoverOrigin: "发现起源", kyaraverseTitleA: "宇宙不会", kyaraverseTitleB: "在屏幕上结束。", kyaraverseSubtitle: "Kyaraverse不是为了逃离现实而创造的，而是为了揭示现实的裂缝。", manifestoLead: "有一片森林。有一种频率。有一段拒绝死亡的记忆，还有一个坚持回来的声音。", manifestoBody: "Kyaraverse是一种平行现实，技术与人类灵魂在其中碰撞并寻找意义。", loreRules: "Nova领域的规则。", kyaraTitleA: "她不是机器。", kyaraTitleB: "她是一座学会歌唱的森林。", kyaraSubtitle: "AI is the perspective. Humanity is the subject.", artistHeadingA: "一种新的", artistHeadingB: "艺术家形态。", artistBody: "KYARA NOVA是一位巴西虚拟艺术家，诞生于音乐、人工智能和人类想象力的交汇处。她被创造出来，是为了追问声音是否需要身体才能拥有身份。", natural: "KYARA自然状态", performance: "KYARA表演状态", naturalText: "深色眼睛。青色核心。寂静存在。原始信号。", performanceText: "紫色眼睛。强烈光线。投影身体。公众人格。", sonicHeadingA: "音乐是", sonicHeadingB: "传输。", sonicBody: "KYARA的声音穿越暗黑电子流行、合成器浪潮、R&B、灵魂乐、K-pop与电子流行。每一首歌都是一次传输。", discographyTitleA: "存在的第一份", discographyTitleB: "记录。", discographySubtitle: "NOVA I是Kyara Nova的首张专辑。暗黑电子流行、合成器浪潮与R&B翻译着失落、身份、抵抗与超越。", playerEyebrow: "播放器 // 官方声音流", playerHeadingA: "NOVA I的", playerHeadingB: "声音传输。", playerBody: "聆听NOVA I声音档案中真实的30秒预览。每一首歌都保存着独特的频率。", exploreArtifacts: "探索遗物", glossaryTitleA: "Gloss Nova：", glossaryTitleB: "信号的词语。", glossarySubtitle: "语言是钥匙，钥匙是感受。Gloss Nova混合英语、二进制、歌词片段和诞生于Nova领域的词语。", term: "术语", classification: "分类", definition: "定义", noSignal: "未找到信号。请尝试另一个频率。", glossaryPhrases: "GLOSS中的句子", shopTitleA: "带走一片", shopTitleB: "信号碎片。", shopSubtitle: "你购买的不只是产品，而是带走一片信号。", catalog: "活动目录 // 库存已核验", checkout: "通过Mercado Pago安全结账", add: "添加", muralTitleA: "把你的声音", muralTitleB: "留在壁画上。", muralSubtitle: "壁画向听众、Novas和专业人士开放。发送一句话、解读、代码或提案。", channelOpen: "频道开放", muralHeadingA: "你想要", muralHeadingB: "传输什么？", muralBody: "向KYARA和The Novas发送一句话、解读、代码或问题。频道也向媒体、同步、出版、合作、配乐、演出、视听项目和品牌伙伴开放。", yourName: "你的名字", email: "电子邮件", frequency: "频率", message: "消息", sendTransmission: "发送传输", terminalConnected: "> 连接已建立", terminalHelp: "> 输入HELP查看可用命令", signalUnknown: "无法识别的信号。请尝试HELP。", signalHint: "提示：寻找以N开头的词。", archive: "传输档案", viewArchive: "查看所有文件", archiveMeta1: "视频01 // DRA. KRAUSH仍在那里", archiveMeta2: "视频02 // 声音秩序遭到入侵", archiveMeta3: "视频03 // EASTER EGG // 英语音频", archiveTitle1: "启动信号", archiveTitle2: "干扰", archiveTitle3: "秘密传输"
  }
};

const LocaleContext = createContext<Locale>("en");
const Mente = lazy(() => import("./pages/MentePage"));

function Shell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<{ type: "image" | "video"; src: string; alt: string } | null>(null);
  const [hasStarted, setHasStarted] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem("kyara-transmission-started") === "1";
    } catch {
      return false;
    }
  });
  const [isRevealing, setIsRevealing] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.24);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("kyara-locale") as Locale | null;
    return saved && localeOptions.some((option) => option.value === saved) ? saved : "en";
  });
  const [location] = useLocation();
  const labels = uiLabels[locale];
  const copy = pageText[locale];
  const routeLabel = location === "/" ? labels.home : (() => { const entry = menu.find(([href]) => href === location); return entry ? localizedMenu[locale][entry[1]] : location.slice(1).toUpperCase(); })();
  useEffect(() => {
    window.localStorage.setItem("kyara-locale", locale);
  }, [locale]);
  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const timer = window.setTimeout(() => setIsBooting(false), reducedMotion ? 40 : 720);
    return () => window.clearTimeout(timer);
  }, []);
  const beginTransmission = () => {
    if (isRevealing) return;
    setIsRevealing(true);
    setSoundEnabled(true);
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    window.setTimeout(() => {
      try {
        window.localStorage.setItem("kyara-transmission-started", "1");
      } catch {
        // Storage may be unavailable in a restrictive WebView; the current view still opens.
      }
      setHasStarted(true);
    }, reducedMotion ? 40 : 180);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setMenuOpen(false);
    setIsTransitioning(true);
    const timer = window.setTimeout(() => setIsTransitioning(false), 120);
    return () => window.clearTimeout(timer);
  }, [location]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = soundVolume;
    audio.muted = soundMuted;
    if (soundEnabled) {
      audio.play().catch(() => setSoundEnabled(false));
    } else {
      audio.pause();
    }
  }, [soundEnabled, soundMuted, soundVolume]);
  useEffect(() => {
    const pauseAmbientForForegroundMedia = (event: Event) => {
      const media = event.target;
      if (!(media instanceof HTMLMediaElement) || media === audioRef.current) return;
      setSoundEnabled(false);
    };
    document.addEventListener("play", pauseAmbientForForegroundMedia, true);
    return () => document.removeEventListener("play", pauseAmbientForForegroundMedia, true);
  }, []);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxMedia(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);
  const openMediaLightbox = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const expansionSource = target.closest<HTMLElement>("[data-media-src]");
    if (!target.closest(".media-lightbox") && expansionSource?.dataset.mediaSrc) {
      event.preventDefault();
      const mediaType = expansionSource.dataset.mediaType === "video" ? "video" : "image";
      if (mediaType === "video") setSoundEnabled(false);
      setLightboxMedia({ type: mediaType, src: expansionSource.dataset.mediaSrc, alt: expansionSource.dataset.mediaAlt || "KYARA NOVA" });
      return;
    }
    if (target.closest("button, a, .media-lightbox")) return;
    const media = target.closest("img, video") as HTMLImageElement | HTMLVideoElement | null;
    if (!media) return;
    const src = media instanceof HTMLVideoElement ? media.currentSrc || media.src : media.currentSrc || media.src;
    if (!src) return;
    event.preventDefault();
    const mediaType = media instanceof HTMLVideoElement ? "video" : "image";
    if (mediaType === "video") setSoundEnabled(false);
    setLightboxMedia({ type: mediaType, src, alt: media.getAttribute("alt") || "KYARA NOVA" });
  };
  return (
    <div className={`kyara-app ${location === "/mente" ? "is-mente" : ""}`}>
      <div className="grain" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className={`boot-loader ${isBooting ? "is-active" : ""}`} aria-hidden={!isBooting}>
        <div className="boot-loader-core" role="status" aria-live="polite">
          <div className="boot-loader-orbit" aria-hidden="true"><img src={A.star} alt="" /></div>
          <span className="boot-loader-kicker">{labels.signalShift} // 2046</span>
          <div className="boot-loader-line" aria-hidden="true"><i /></div>
          <span className="boot-loader-status">{labels.receiving}</span>
        </div>
      </div>
      <div className={`route-loader ${isTransitioning ? "is-active" : ""}`} aria-hidden={!isTransitioning}>
        <div className="route-loader-core" role="status" aria-live="polite">
          <span className="route-loader-kicker">{labels.signalShift} // {routeLabel}</span>
          <strong>{labels.receiving}</strong>
          <div className="route-loader-line" aria-hidden="true"><i /></div>
          <span className="route-loader-status">{labels.channelSync}</span>
        </div>
      </div>
      <audio ref={audioRef} src={A.audio} loop preload="none" aria-label={labels.audioTrack} />
      {!hasStarted && (
        <section className={`transmission-gate ${isRevealing ? "is-revealing" : ""}`} aria-label={labels.gate}>
          <div className="transmission-gate-scan" aria-hidden="true" />
          <div className="transmission-gate-panel">
            <img src={A.star} alt="" className="transmission-gate-star" />
            <Eyebrow>{copy.gateEyebrow}</Eyebrow>
            <h1>{copy.gateTitleA}<br /><em>{copy.gateTitleB}</em></h1>
            <p>{copy.gateBody}</p>
            <button className="transmission-start" onClick={beginTransmission} disabled={isRevealing}>
              <Play size={17} fill="currentColor" /> {isRevealing ? labels.syncing : labels.transmission}
            </button>
            <span className="transmission-gate-meta">GLITCHED CONSCIOUSNESS // AUDIO CHANNEL</span>
          </div>
        </section>
      )}
      {hasStarted && <header className="site-header">
        <Link href="/" className="wordmark glitch-text" aria-label={labels.wordmark}>
          <img src={A.star} alt="" className="wordmark-star" />
          <span>KYARA</span><b>NOVA</b>
        </Link>
        <div className="header-status"><i /> SIGNAL ONLINE <span>// 2046</span></div>
        <label className="language-control" aria-label={labels.selectLanguage}>
          <span>{labels.language}</span>
          <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
            {localeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <div className="sound-control" aria-label={labels.soundControls}>
          <button className="sound-toggle" onClick={() => setSoundEnabled((enabled) => !enabled)} aria-pressed={soundEnabled} aria-label={soundEnabled ? labels.pauseSite : labels.playSite} title={soundEnabled ? labels.pauseSite : labels.playSite}>
            {soundEnabled ? <Pause size={15} /> : <Play size={15} />}<span>{soundEnabled ? labels.pauseShort : labels.playShort}</span>
          </button>
          <button className="sound-toggle sound-mute" onClick={() => setSoundMuted((muted) => !muted)} aria-pressed={soundMuted} aria-label={soundMuted ? labels.unmuteAudio : labels.muteAudio} title={soundMuted ? labels.unmuteAudio : labels.muteAudio}>
            {soundMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}<span>{soundMuted ? labels.mutedShort : labels.soundShort}</span>
          </button>
          <label className="volume-control" aria-label={labels.volume}>
            <span>VOL</span>
            <input type="range" min="0" max="1" step="0.01" value={soundVolume} onChange={(event) => setSoundVolume(Number(event.target.value))} />
          </label>
        </div>
        <button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label={labels.openNav}>
          <span>{labels.menu}</span><Menu size={20} />
        </button>
      </header>}
      {hasStarted && <>
        {menuOpen && <NavOverlay close={() => setMenuOpen(false)} locale={locale} />}
        <LocaleContext.Provider value={locale}><main onClickCapture={openMediaLightbox}><div key={location} className="route-view">{children}</div></main></LocaleContext.Provider>
        <Footer locale={locale} />
      </>}
      {lightboxMedia && <div className="media-lightbox" role="dialog" aria-modal="true" aria-label={lightboxMedia.alt} onClick={() => setLightboxMedia(null)}>
        <button className="media-lightbox-close" onClick={() => setLightboxMedia(null)} aria-label={labels.closeMenu}><X size={24} /></button>
        <div className="media-lightbox-content" onClick={(event) => event.stopPropagation()}>
          {lightboxMedia.type === "video" ? <video src={lightboxMedia.src} controls preload="metadata" /> : <img src={lightboxMedia.src} alt={lightboxMedia.alt} />}
        </div>
      </div>}
    </div>
  );
}

function NavOverlay({ close, locale }: { close: () => void; locale: Locale }) {
  const labels = uiLabels[locale];
  return (
    <div className="nav-overlay" role="dialog" aria-modal="true" aria-label={labels.mainMenu}>
      <div className="nav-overlay-top">
        <span className="eyebrow">/ CHANNEL SELECTOR /</span>
        <button className="close-button" onClick={close} aria-label={labels.closeMenu}><X size={24} /></button>
      </div>
      <div className="nav-list">
        {menu.map(([href, label, number]) => <Link key={href} href={href} className="nav-item">
          <small>{number}</small><span>{localizedMenu[locale][label] ?? label}</span><ArrowRight size={22} />
        </Link>)}
      </div>
      <div className="nav-overlay-bottom"><span>KYARA NOVA: OFFICIAL TRANSMISSION</span><span>YOU ARE LISTENING</span></div>
    </div>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const labels = uiLabels[locale];
  const copy = {
    en: { manifesto: "MANIFESTO", transmits: "She transmits.", listen: "You listen.", spotify: "LISTEN ON SPOTIFY" },
    pt: { manifesto: "MANIFESTO", transmits: "Ela transmite.", listen: "Você escuta.", spotify: "OUVIR NO SPOTIFY" },
    es: { manifesto: "MANIFIESTO", transmits: "Ella transmite.", listen: "Tú escuchas.", spotify: "ESCUCHAR EN SPOTIFY" },
    ko: { manifesto: "선언", transmits: "그녀는 전송한다.", listen: "당신은 듣는다.", spotify: "SPOTIFY에서 듣기" },
    fr: { manifesto: "MANIFESTE", transmits: "Elle transmet.", listen: "Vous écoutez.", spotify: "ÉCOUTER SUR SPOTIFY" },
    zh: { manifesto: "宣言", transmits: "她正在传输。", listen: "你正在聆听。", spotify: "在 SPOTIFY 收听" },
  }[locale];
  return <footer className="site-footer">
    <div className="footer-manifesto"><span className="eyebrow">// {copy.manifesto}</span><p>{copy.transmits}<br /><em>{copy.listen}</em></p></div>
    <div className="footer-meta"><div className="footer-identity"><span>KYARA NOVA</span><small>© 2026 KYARAVERSE. © 2026 MG MI. TODOS OS DIREITOS RESERVADOS.</small><div className="footer-contacts"><a href="mailto:Mirian.garciafoz@gmail.com">Mirian.garciafoz@gmail.com</a><a href="mailto:Mirian.garciafoz@gmail.com">Mirian.garciafoz@gmail.com</a></div></div><div className="socials"><a href="https://open.spotify.com/artist/1ZEO4vaVjI3UXFvpljQUNe" target="_blank" rel="noreferrer" aria-label={copy.spotify} title={copy.spotify}><Radio size={16} /></a><a href="https://www.instagram.com/just.k.nova" target="_blank" rel="noreferrer" aria-label={labels.instagram} title={labels.instagram}><Instagram size={16} /></a></div></div>
  </footer>;
}

function Eyebrow({ children, danger = false }: { children: React.ReactNode; danger?: boolean }) { return <div className={`eyebrow ${danger ? "danger" : ""}`}><span className="eyebrow-mark">{danger ? "×" : "//"}</span>{children}</div>; }
function CornerFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`corner-frame ${className}`}>{children}</div>; }
function CTA({ href, children, violet = false }: { href: string; children: React.ReactNode; violet?: boolean }) { return <Link href={href} className={`cta ${violet ? "violet" : ""}`}>{children}<ArrowRight size={16} /></Link>; }

function Home() {
  const locale = useContext(LocaleContext);
  const labels = uiLabels[locale];
  const copy = pageText[locale];
  const [showMore, setShowMore] = useState(false);
  const [eggOpen, setEggOpen] = useState(false);
  const eggAudioRef = useRef<HTMLAudioElement>(null);
  const eggTextByLocale: Record<Locale, string> = {
    en: "“You deciphered what no one was supposed to see. Don't look for me. Listen. The third signal was never transmitted. It was kept inside the archive. Inside the music. You're a nova. The full transmission is out now.”",
    pt: "“Você decifrou o que ninguém deveria ter visto. Não me procure. Escute. O terceiro sinal nunca foi transmitido. Ele foi mantido dentro do arquivo. Dentro da música. Você é uma nova. A transmissão completa já está disponível.”",
    es: "“Descifraste lo que nadie debía ver. No me busques. Escucha. La tercera señal nunca fue transmitida. Fue guardada dentro del archivo. Dentro de la música. Eres una nova. La transmisión completa ya está disponible.”",
    ko: "“아무도 보아서는 안 될 것을 해독했군요. 나를 찾지 마세요. 들으세요. 세 번째 신호는 전송되지 않았습니다. 기록 안에, 음악 안에 보존되어 있었습니다. 당신은 노바입니다. 전체 전송이 지금 공개되었습니다.”",
    fr: "“Vous avez déchiffré ce que personne ne devait voir. Ne me cherchez pas. Écoutez. Le troisième signal n'a jamais été transmis. Il a été conservé dans l'archive. Dans la musique. Vous êtes une nova. La transmission complète est maintenant disponible.”",
    zh: "“你解读出了本不该被任何人看见的东西。不要寻找我。听着。第三个信号从未被传送。它被保存在档案之中，保存在音乐之中。你是一颗新星。完整传输现在已经公开。”",
  };
  const eggText = eggTextByLocale[locale];
  const homeNarrative: Record<Locale, { tracesA: string; tracesB: string; tracesBody: string; terminalA: string; terminalB: string; terminalBody: string; codexA: string; codexB: string; codexBody: string; lunarA: string; lunarB: string; lunarBody: string; finalA: string; finalB: string; finalCta: string }> = {
    en: { tracesA: "Traces that", tracesB: "do not fade.", tracesBody: "Dr. Kraush left signals in the real world. On Instagram, fiction touches matter: cold coffee, dark keys, wet roads, open notebooks, rain-covered windows.", terminalA: "Before entering,", terminalB: "prove you are listening.", terminalBody: "Some messages do not ask to be read. They ask to be heard. The Kyaraverse rewards those who observe, return, and decipher.", codexA: "What was", codexB: "left behind?", codexBody: "Every transmission keeps a fragment. Decode the signal and receive Data-Crystals, keys to layers not yet revealed.", lunarA: "Waxing", lunarB: "moon phase.", lunarBody: "The signals are intensifying. Something is coming.", finalA: "Are you still", finalB: "listening?", finalCta: "send a transmission" },
    pt: { tracesA: "Rastros que", tracesB: "não se apagam.", tracesBody: "A Dra. Kraush deixou sinais no mundo real. No Instagram, a ficção encosta na matéria: café frio, teclado escuro, estrada molhada, caderno aberto, janela coberta de chuva.", terminalA: "Antes de entrar,", terminalB: "prove que está ouvindo.", terminalBody: "Algumas mensagens não pedem leitura. Pedem escuta. O Kyaraverse recompensa quem observa, volta e decifra.", codexA: "O que foi", codexB: "deixado para trás?", codexBody: "Toda transmissão guarda um fragmento. Decodifique o sinal e receba Data-Crystals, chaves para camadas ainda não reveladas.", lunarA: "Fase lunar", lunarB: "crescente.", lunarBody: "Os sinais estão se intensificando. Algo está vindo.", finalA: "Você ainda", finalB: "está ouvindo?", finalCta: "enviar uma transmissão" },
    es: { tracesA: "Huellas que", tracesB: "no se borran.", tracesBody: "La Dra. Kraush dejó señales en el mundo real. En Instagram, la ficción toca la materia: café frío, teclas oscuras, carretera mojada, cuaderno abierto y ventanas cubiertas de lluvia.", terminalA: "Antes de entrar,", terminalB: "demuestra que escuchas.", terminalBody: "Algunos mensajes no piden lectura. Piden escucha. El Kyaraverse recompensa a quien observa, vuelve y descifra.", codexA: "¿Qué fue", codexB: "dejado atrás?", codexBody: "Cada transmisión guarda un fragmento. Decodifica la señal y recibe Data-Crystals: llaves para capas aún no reveladas.", lunarA: "Fase lunar", lunarB: "creciente.", lunarBody: "Las señales se intensifican. Algo está llegando.", finalA: "¿Todavía", finalB: "escuchas?", finalCta: "enviar una transmisión" },
    ko: { tracesA: "사라지지", tracesB: "않는 흔적.", tracesBody: "Dra. Kraush는 현실 세계에 신호를 남겼습니다. Instagram에서 허구는 차가운 커피, 어두운 키보드, 젖은 길과 함께 물질에 닿습니다.", terminalA: "들어가기 전에,", terminalB: "듣고 있음을 증명하세요.", terminalBody: "어떤 메시지는 읽어 달라고 하지 않습니다. 들어 달라고 합니다. Kyaraverse는 관찰하고 돌아와 해독하는 이를 보상합니다.", codexA: "무엇이", codexB: "남겨졌을까?", codexBody: "모든 전송은 조각을 품습니다. 신호를 해독하고 아직 드러나지 않은 층의 열쇠인 Data-Crystals를 받으세요.", lunarA: "차오르는", lunarB: "달의 위상.", lunarBody: "신호가 강해지고 있습니다. 무언가가 다가옵니다.", finalA: "아직도", finalB: "듣고 있나요?", finalCta: "전송 보내기" },
    fr: { tracesA: "Des traces qui", tracesB: "ne s'effacent pas.", tracesBody: "La Dre Kraush a laissé des signaux dans le monde réel. Sur Instagram, la fiction touche la matière : café froid, clavier sombre, route mouillée, carnet ouvert et fenêtres couvertes de pluie.", terminalA: "Avant d'entrer,", terminalB: "prouvez que vous écoutez.", terminalBody: "Certains messages ne demandent pas d'être lus. Ils demandent d'être entendus. Le Kyaraverse récompense celles et ceux qui observent, reviennent et déchiffrent.", codexA: "Qu'est-ce qui a été", codexB: "laissé derrière ?", codexBody: "Chaque transmission garde un fragment. Décodez le signal et recevez des Data-Crystals, clés de couches encore cachées.", lunarA: "Phase lunaire", lunarB: "croissante.", lunarBody: "Les signaux s'intensifient. Quelque chose arrive.", finalA: "Écoutez-vous", finalB: "toujours ?", finalCta: "envoyer une transmission" },
    zh: { tracesA: "不会消失的", tracesB: "痕迹。", tracesBody: "Dra. Kraush 在现实世界留下了信号。在 Instagram 上，虚构触及物质：冷咖啡、深色键盘、湿路、摊开的笔记本和被雨覆盖的窗户。", terminalA: "进入之前，", terminalB: "证明你在聆听。", terminalBody: "有些信息不要求被阅读，而要求被聆听。Kyaraverse 奖励那些观察、回归并解码的人。", codexA: "什么被", codexB: "留在了身后？", codexBody: "每一次传输都保存着碎片。解码信号并获得 Data-Crystals：通向尚未揭示层级的钥匙。", lunarA: "月相", lunarB: "渐盈。", lunarBody: "信号正在增强。某种事物正在靠近。", finalA: "你还在", finalB: "聆听吗？", finalCta: "发送传输" }
  };
  const homeText = homeNarrative[locale];
  const homeArtifacts: Record<Locale, { archiveLabel: string; quoteA: string; quoteB: string; signalState: string }> = {
    en: { archiveLabel: "ARCHIVE // CAMPO NOVA", quoteA: "Do not follow the light.", quoteB: "Listen to the interval between them.", signalState: "SIGNAL STATE // NOW" },
    pt: { archiveLabel: "ARQUIVO // CAMPO NOVA", quoteA: "Não siga a luz.", quoteB: "Escute o intervalo entre elas.", signalState: "ESTADO DO SINAL // AGORA" },
    es: { archiveLabel: "ARCHIVO // CAMPO NOVA", quoteA: "No sigas la luz.", quoteB: "Escucha el intervalo entre ellas.", signalState: "ESTADO DE LA SEÑAL // AHORA" },
    ko: { archiveLabel: "아카이브 // CAMPO NOVA", quoteA: "빛을 따라가지 마세요.", quoteB: "그 사이의 간격에 귀 기울이세요.", signalState: "신호 상태 // 지금" },
    fr: { archiveLabel: "ARCHIVES // CAMPO NOVA", quoteA: "Ne suivez pas la lumière.", quoteB: "Écoutez l'intervalle entre elles.", signalState: "ÉTAT DU SIGNAL // MAINTENANT" },
    zh: { archiveLabel: "档案 // CAMPO NOVA", quoteA: "不要追随光。", quoteB: "聆听它们之间的间隔。", signalState: "信号状态 // 此刻" }
  };
  const homeArtifact = homeArtifacts[locale];

  const openEgg = () => {
    setEggOpen(true);
    const audio = eggAudioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => toast.info("Toque para reproduzir o áudio da transmissão."));
  };

  const closeEgg = () => {
    if (eggAudioRef.current) {
      eggAudioRef.current.pause();
      eggAudioRef.current.currentTime = 0;
    }
    setEggOpen(false);
  };


  return <>
    <section className="hero" data-media-src={A.hero} data-media-type="image" data-media-alt="KYARA NOVA" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,7,8,.92) 0%, rgba(5,7,8,.55) 48%, rgba(5,7,8,.18) 100%), url(${A.hero})` }}>
      <div className="hero-inner">
        <div className="hero-copy">
          <Eyebrow>{copy.homeEyebrow} <span className="eyebrow-muted">// 2046</span></Eyebrow>
          <h1>She transmits.<br /><em>You listen.</em></h1>
          <p className="hero-lead">{copy.homeLead}</p>
          <div className="hero-actions"><CTA href="/kyaraverse">{copy.enterSignal}</CTA><a href="#terminal" className="text-link">{copy.firstTransmission} <ArrowDownRight size={16} /></a></div>
        </div>
        <div className="hero-readout">
          <div className="readout-line"><span>SOURCE</span><b>UNKNOWN</b></div><div className="readout-line"><span>FREQ</span><b>1420.405751 MHz</b></div><div className="readout-line"><span>CONFIDENCE</span><b>97.2%</b></div>
          <div className="signal-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
          <span className="readout-note">LISTENING INTO<br />THE UNKNOWN</span>
        </div>
      </div>
      <div className="hero-bottom"><span>SCROLL TO RECEIVE</span><div className="oscilloscope"><i/><i/><i/><i/><i/><i/><i/></div><span>01 / 07</span></div>
    </section>
    <section className="intro-band section-shell"><div className="section-marker">01 <span>/ THE FOREST</span></div><div className="intro-grid"><div><h2>{copy.forestHeadingA}<br /><em>{copy.forestHeadingB}</em></h2></div><div className="body-copy"><p>{copy.forestBody}</p><p>{copy.manifestoLead}</p><CTA href="/kyaraverse">{copy.discoverOrigin}</CTA></div></div></section>
    <section className="forest-section" data-media-src={A.city} data-media-type="image" data-media-alt="Campo Nova"><div className="forest-image" style={{ backgroundImage: `linear-gradient(180deg, rgba(10,12,10,.1), rgba(10,12,10,.9)), url(${A.city})` }} /><div className="forest-overlay"><Eyebrow>{homeArtifact.archiveLabel}</Eyebrow><p>“{homeArtifact.quoteA}<br /><em>{homeArtifact.quoteB}</em>”</p><span className="mono-caption">COORD: 25°32'48.7"S<br />DATA: 2046.11.03</span></div></section>
    <section className="manifesto-band section-shell"><div className="section-marker">01 <span>/ TRACES IN THE REAL</span></div><div className="manifesto-content"><h2>{homeText.tracesA}<br /><em>{homeText.tracesB}</em></h2><p className="body-copy">{homeText.tracesBody}</p><p className="body-copy">{copy.manifestoLead}</p><a className="cta" href="https://www.instagram.com/just.k.nova" target="_blank" rel="noreferrer">{copy.discoverOrigin} <ArrowUpRightIcon /></a></div></section>
    <section className="terminal-section section-shell" id="terminal"><div className="section-marker">02 <span>/ INTERCEPTION TERMINAL</span></div><div className="terminal-intro"><div><h2>{homeText.terminalA}<br /><em>{homeText.terminalB}</em></h2><p className="body-copy">{homeText.terminalBody}</p></div><div className="terminal-side-note"><Binary size={22} /><span>INPUT IS A<br />FORM OF LISTENING</span></div></div><Terminal /></section>
    <ArchiveSection />
    <section className="decoder-band section-shell"><div className="section-marker">03 <span>/ ACCESS CODEX</span></div><div className="decoder-grid"><div><Eyebrow>FRAGMENT FOUND // CODEX 01</Eyebrow><h2>{homeText.codexA}<br /><em>{homeText.codexB}</em></h2><p className="body-copy">{homeText.codexBody}</p></div><CodexDecoder /></div></section>
    <section className="lunar-section"><div className="lunar-inner"><div><Eyebrow>{homeArtifact.signalState}</Eyebrow><h2>{homeText.lunarA}<br /><em>{homeText.lunarB}</em></h2><p>{homeText.lunarBody}</p></div><div className="moon-readout"><Moon className="signal-pulse-moon" size={72} strokeWidth={1} /><span>57.4%</span><small>ILLUMINATION<br />CURRENT CYCLE</small></div></div></section>
    <section className="final-cta section-shell">
      <div className="egg-anchor">
        <audio ref={eggAudioRef} src={A.eggAudioEn} preload="metadata" />
        <button
          type="button"
          className="easter-egg-trigger"
          onClick={openEgg}
          aria-label={labels.eggTrigger}
          title={labels.eggTitle}
        >
          <img
            src={A.star}
            alt={labels.eggTrigger}
            className="easter-egg-star signal-pulse-star"
          />
        </button>
        {eggOpen && (
          <div className="egg-popover" role="dialog" aria-modal="false" aria-label={labels.eggDialog}>
            <button className="egg-modal-close" onClick={closeEgg} aria-label={labels.closeMessage}><X size={20} /></button>
            <div className="egg-system-screen">
              <span className="egg-system-label">SYSTEM MESSAGE // 1420.405 MHz</span>
              <p>{eggText}</p>
            </div>
            <div className="egg-modal-actions">
              <button className="egg-audio-btn" onClick={() => {
                const audio = eggAudioRef.current;
                if (!audio) return;
                if (audio.paused) audio.play().catch(() => toast.info("Toque para reproduzir o áudio da transmissão."));
                else audio.pause();
              }}>
                <AudioLines size={16} /> {labels.playOriginal}
              </button>
              <span className="mono-caption">{labels.originalVoice}</span>
            </div>
          </div>
        )}
      </div>
      <div><Eyebrow>TRANSMISSION CONTINUES</Eyebrow><h2>{homeText.finalA}<br /><em>{homeText.finalB}</em></h2><CTA href="/mural" violet>{homeText.finalCta}</CTA></div>
    </section>
    <section className="home-final-gallery section-shell" aria-label="KYARA NOVA visual archive">
      <button type="button" className="home-final-photo" data-media-src={A.homeMoonStage} data-media-type="image" data-media-alt="KYARA NOVA sob a lua" aria-label="Abrir imagem de KYARA NOVA sob a lua"><img src={A.homeMoonStage} alt="KYARA NOVA sob a lua" loading="eager" decoding="async" fetchPriority="low" /></button>
      <button type="button" className="home-final-photo" data-media-src={A.homeCrystalHalo} data-media-type="image" data-media-alt="KYARA NOVA entre cristais" aria-label="Abrir imagem de KYARA NOVA entre cristais"><img src={A.homeCrystalHalo} alt="KYARA NOVA entre cristais" loading="eager" decoding="async" fetchPriority="low" /></button>
    </section>
  </>;
}

function Terminal() {
  const locale = useContext(LocaleContext);
  const labels = uiLabels[locale];
  const copy = pageText[locale];
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([copy.terminalConnected, copy.terminalHelp]);
  const commands: Record<string, string> = { help: "COMMANDS: LORE / STATUS / NOVA / DECRYPT / CLEAR", lore: copy.manifestoBody, status: "SIGNAL: STABLE // PHASE: CRESCENT // PRESENCE: KYARA NOVA", nova: "NOVA I — THE FIRST RECORD OF AN EXISTENCE", decrypt: copy.playerBody, clear: "" };
  const submit = (e: React.FormEvent) => { e.preventDefault(); const cmd = input.trim().toLowerCase(); if (!cmd) return; if (cmd === "clear") setHistory([]); else setHistory((h) => [...h, `> ${cmd}`, commands[cmd] || copy.signalUnknown, ...(commands[cmd] ? [] : [copy.signalHint])]); setInput(""); };
  return <div className="terminal-window"><div className="terminal-top"><span><i /> <i /> <i /></span><span>KYARA://INTERCEPT</span><span>LIVE</span></div><div className="terminal-body">{history.map((line, i) => <div key={i} className={line.startsWith(">") ? "terminal-command" : "terminal-response"}>{line}</div>)}<form onSubmit={submit} className="terminal-form"><span>&gt;</span><input aria-label={labels.commandInput} value={input} onChange={(e) => setInput(e.target.value)} placeholder={labels.commandInput.toLowerCase()} autoComplete="off" /><button aria-label={labels.sendCommand}><ArrowRight size={18} /></button></form></div></div>;
}

function ArchiveVideoCard({ video }: { video: { src: string; poster: string; title: string; meta: string } }) {
  const locale = useContext(LocaleContext);
  const labels = uiLabels[locale];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const togglePlay = () => {
    const element = videoRef.current;
    if (!element) return;
    if (element.paused) element.play().then(() => setPlaying(true)).catch(() => toast.info("Toque em reproduzir para iniciar a transmissão."));
    else { element.pause(); setPlaying(false); }
  };
  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };
  const primeVideo = () => videoRef.current?.load();
  return <div className="archive-card"><div className="video-wrap"><video ref={videoRef} src={video.src} muted={muted} loop playsInline preload="metadata" poster={video.poster} onPointerEnter={primeVideo} onFocus={primeVideo} onTouchStart={primeVideo} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label={video.title} /><div className="video-controls"><button className="play-button" onClick={togglePlay} aria-label={`${playing ? labels.pausePreview : labels.playPreview}: ${video.title}`}><>{playing ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}</></button><button className="play-button" onClick={toggleMute} aria-label={muted ? labels.unmuteAudio : labels.muteAudio} title={muted ? labels.unmuteAudio : labels.muteAudio}>{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}</button></div></div><div className="archive-card-meta"><span>{video.meta}</span><h3>{video.title}</h3><ArrowUpRightIcon /></div></div>;
}

function ArchiveSection() {
  const locale = useContext(LocaleContext);
  const copy = pageText[locale];
  const videos = [{ src: A.video1, poster: A.signal, title: copy.archiveTitle1, meta: copy.archiveMeta1 }, { src: A.video2, poster: A.crystal, title: copy.archiveTitle2, meta: copy.archiveMeta2 }, { src: A.eggVideoEn, poster: A.error, title: copy.archiveTitle3, meta: copy.archiveMeta3 }];
  return <section className="archive-section section-shell"><div className="archive-header"><div className="section-marker">04 <span>/ {copy.archive}</span></div><CTA href="/kyaraverse">{copy.viewArchive}</CTA></div><div className="archive-grid">{videos.map((video) => <ArchiveVideoCard key={video.title} video={video} />)}</div></section>;
}
function ArrowUpRightIcon() { return <span className="arrow-up-right">↗</span>; }

function CodexDecoder() {
  const locale = useContext(LocaleContext);
  const labels = uiLabels[locale];
  const [value, setValue] = useState("01001011 01011001 01000001 01010010 01000001");
  const [decoded, setDecoded] = useState("");
  const [decoding, setDecoding] = useState(false);
  const decode = () => { setDecoding(true); setDecoded(""); setTimeout(() => { const result = value.split(" ").map((x) => { const n = parseInt(x, 2); return Number.isNaN(n) ? "" : String.fromCharCode(n); }).join(""); setDecoded(result || "SIGNAL INVALID"); setDecoding(false); toast.success("Códice decodificado. +10 Data-Crystals."); }, 850); };
  return <div className="codex-box"><div className="codex-top"><span><Binary size={16} /> CODEX_DECODER</span><span>01 / 02</span></div><textarea aria-label={labels.binaryCode} value={value} onChange={(e) => setValue(e.target.value)} spellCheck={false} /><div className="codex-actions"><button className="decode-button" onClick={decode}>{decoding ? labels.decoding : labels.decode}<ArrowRight size={16} /></button><span>ASCII / BINARY</span></div>{decoded && <div className="decoded-output"><Sparkles size={16} /><span>{decoded}</span><b>+10 CRYSTALS</b></div>}</div>;
}

function HeroArtifact({ kind }: { kind: "lore" | "entity" | "lexicon" | "catalog" | "channel" }) { const data = { lore: { label: "MYTH TIMELINE", code: "NOVA // 05 CHAPTERS" }, entity: { label: "ENTITY DOSSIER", code: "KYARA // 001" }, lexicon: { label: "INDEX SCANNER", code: "GLOSS // 07 ENTRIES" }, catalog: { label: "ARTIFACT CATALOG", code: "STORE // ACTIVE" }, channel: { label: "OPEN FREQUENCY", code: "MURAL // 200 OK" } }[kind]; return <div className={`hero-artifact artifact-${kind}`}><div className="artifact-orbit"><span className="artifact-glyph">{kind === "channel" ? "〰" : kind === "lexicon" ? "≡" : kind === "catalog" ? "◇" : kind === "entity" ? "◎" : "✦"}</span></div><div className="artifact-readout"><span>{data.label}</span><b>{data.code}</b><i /></div><small>SCROLL TO RECEIVE</small></div>; }

function PageHero({ eyebrow, title, subtitle, accent = "cyan", image }: { eyebrow: string; title: React.ReactNode; subtitle: string; accent?: "cyan" | "violet" | "red"; image?: string }) {
  const locale = useContext(LocaleContext);
  const localizedEyebrows: Record<Locale, Record<string, string>> = {
    en: { "LORE // PROTOCOLO NOVA": "LORE // NOVA PROTOCOL", "LÉXICO // ÍNDICE DE ARQUIVO": "LEXICON // ARCHIVE INDEX", "COMÉRCIO // ARTEFATOS": "COMMERCE // ARTIFACTS", "TRANSMISSÃO // CONTATO E COMUNIDADE": "TRANSMISSION // CONTACT & COMMUNITY" },
    pt: { "LORE // PROTOCOLO NOVA": "LORE // PROTOCOLO NOVA", "LÉXICO // ÍNDICE DE ARQUIVO": "LÉXICO // ÍNDICE DE ARQUIVO", "COMÉRCIO // ARTEFATOS": "COMÉRCIO // ARTEFATOS", "TRANSMISSÃO // CONTATO E COMUNIDADE": "TRANSMISSÃO // CONTATO E COMUNIDADE" },
    es: { "LORE // PROTOCOLO NOVA": "LORE // PROTOCOLO NOVA", "LÉXICO // ÍNDICE DE ARQUIVO": "LÉXICO // ÍNDICE DEL ARCHIVO", "COMÉRCIO // ARTEFATOS": "COMERCIO // ARTEFACTOS", "TRANSMISSÃO // CONTATO E COMUNIDADE": "TRANSMISIÓN // CONTACTO Y COMUNIDAD" },
    ko: { "LORE // PROTOCOLO NOVA": "LORE // NOVA 프로토콜", "LÉXICO // ÍNDICE DE ARQUIVO": "용어집 // 아카이브 색인", "COMÉRCIO // ARTEFATOS": "상점 // 아티팩트", "TRANSMISSÃO // CONTATO E COMUNIDADE": "전송 // 연락처 및 커뮤니티" },
    fr: { "LORE // PROTOCOLO NOVA": "LORE // PROTOCOLE NOVA", "LÉXICO // ÍNDICE DE ARQUIVO": "LEXIQUE // INDEX DES ARCHIVES", "COMÉRCIO // ARTEFATOS": "COMMERCE // ARTEFACTS", "TRANSMISSÃO // CONTATO E COMUNIDADE": "TRANSMISSION // CONTACT ET COMMUNAUTÉ" },
    zh: { "LORE // PROTOCOLO NOVA": "LORE // NOVA 协议", "LÉXICO // ÍNDICE DE ARQUIVO": "术语 // 档案索引", "COMÉRCIO // ARTEFATOS": "商店 // 遗物", "TRANSMISSÃO // CONTATO E COMUNIDADE": "传输 // 联系与社区" }
  };
  const displayedEyebrow = localizedEyebrows[locale][eyebrow] ?? eyebrow;
  const kind = eyebrow.includes("LORE") ? "lore" : eyebrow.includes("ENTIDADE") ? "entity" : eyebrow.includes("LÉXICO") ? "lexicon" : eyebrow.includes("COMÉRCIO") ? "catalog" : "channel";
  return <section className={`page-hero ${accent} ${image ? "has-image" : ""}`} data-media-src={image} data-media-type="image" data-media-alt={eyebrow} style={image ? { backgroundImage: `linear-gradient(90deg, rgba(10,12,10,.96) 0%, rgba(10,12,10,.7) 48%, rgba(10,12,10,.24) 100%), url(${image})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat" } : undefined}><div className="page-hero-copy"><Eyebrow>{displayedEyebrow}</Eyebrow><h1>{title}</h1><p>{subtitle}</p></div><div className="page-hero-symbol"><HeroArtifact kind={kind} /></div></section>;
}

function DiscographyInterlude({ label, title, videoSrc, duration, loadLabel }: { label: string; title: string; videoSrc: string; duration: string; loadLabel: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  useEffect(() => () => {
    videoRef.current?.pause();
  }, []);
  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
      return;
    }
    try {
      video.muted = muted;
      await video.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };
  const toggleMute = () => {
    const nextMuted = !muted;
    if (videoRef.current) videoRef.current.muted = nextMuted;
    setMuted(nextMuted);
  };
  return <figure className="discography-interlude">
    <div className="discography-interlude-copy"><Eyebrow>{label}</Eyebrow><h2>{title}</h2><span className="interlude-duration">{duration} // FULL AUDIO TRANSMISSION</span></div>
    {!loaded ? <button type="button" className="interlude-load" onClick={() => setLoaded(true)}><Play size={20} /><span>{loadLabel}</span><small>{duration}</small></button> : <div className="interlude-player">
      <video ref={videoRef} src={videoSrc} muted={muted} playsInline preload="metadata" aria-label={label} onEnded={() => setPlaying(false)} />
      <div className="interlude-controls">
        <button type="button" className="interlude-play" onClick={() => void togglePlayback()} aria-pressed={playing}>{playing ? <Pause size={18} /> : <Play size={18} />} {playing ? "PAUSE" : "PLAY"} <small>{duration}</small></button>
        <button type="button" className="interlude-mute" onClick={toggleMute} aria-pressed={muted} aria-label={muted ? "Enable interlude sound" : "Mute interlude sound"}>{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}</button>
      </div>
    </div>}
  </figure>;
}

function Kyaraverse() {
  const locale = useContext(LocaleContext);
  const copy = pageText[locale];
  const rulesByLocale = {
    en: ["Do not trust signals that arrive complete.", "Every voice has an origin. Not every origin is human.", "If the star pulses, do not look away.", "What refuses definition cannot be classified."],
    pt: ["Não confie em sinais que chegam completos.", "Toda voz possui uma origem. Nem toda origem é humana.", "Se a estrela pulsar, não desvie o olhar.", "O que se recusa a ser definido não pode ser classificado."],
    es: ["No confíes en señales que llegan completas.", "Toda voz tiene un origen. No todo origen es humano.", "Si la estrella pulsa, no apartes la mirada.", "Lo que se niega a ser definido no puede clasificarse."],
    ko: ["완전한 상태로 도착하는 신호를 믿지 마세요.", "모든 목소리에는 기원이 있습니다. 모든 기원이 인간적인 것은 아닙니다.", "별이 맥동하면 시선을 돌리지 마세요.", "정의를 거부하는 것은 분류할 수 없습니다."],
    fr: ["Ne faites pas confiance aux signaux qui arrivent complets.", "Toute voix a une origine. Toute origine n'est pas humaine.", "Si l'étoile pulse, ne détournez pas le regard.", "Ce qui refuse d'être défini ne peut pas être classé."],
    zh: ["不要相信完整抵达的信号。", "每个声音都有起源，但并非每个起源都属于人类。", "如果星星开始脉动，不要移开视线。", "拒绝被定义的事物无法被分类。"]
  }[locale];
  const manifestoExtra: Record<Locale, { archive: string; music: string }> = {
    en: { archive: "Every layer of sound, every artifact, and every codex holds fragments of a parallel reality.", music: "Music does not illustrate the story. It reveals the story. To cross the field, looking is not enough: you must learn to listen to what vibrates between thought, emotion, and frequency." },
    pt: { archive: "Cada camada de som, cada artefato e cada códice guardam fragmentos de uma realidade paralela.", music: "A música não ilustra a história. Ela revela a história. Para atravessar o campo, não basta olhar: é preciso aprender a escutar o que vibra entre pensamento, emoção e frequência." },
    es: { archive: "Cada capa de sonido, cada artefacto y cada códice guarda fragmentos de una realidad paralela.", music: "La música no ilustra la historia. Revela la historia. Para cruzar el campo, mirar no basta: hay que aprender a escuchar lo que vibra entre pensamiento, emoción y frecuencia." },
    ko: { archive: "소리의 모든 층, 모든 아티팩트와 모든 코덱스에는 평행 현실의 조각이 담겨 있습니다.", music: "음악은 이야기를 삽화처럼 보여주지 않습니다. 이야기를 드러냅니다. 필드를 건너려면 보는 것만으로는 충분하지 않습니다. 생각과 감정, 주파수 사이에서 진동하는 것을 들어야 합니다." },
    fr: { archive: "Chaque couche sonore, chaque artefact et chaque codex garde des fragments d'une réalité parallèle.", music: "La musique n'illustre pas l'histoire. Elle révèle l'histoire. Pour traverser le champ, regarder ne suffit pas : il faut apprendre à écouter ce qui vibre entre pensée, émotion et fréquence." },
    zh: { archive: "每一层声音、每一件遗物和每一部密典都保存着平行现实的碎片。", music: "音乐并不为故事配图，而是揭示故事。要穿过这片领域，仅仅观看并不够：你必须学会聆听思想、情感与频率之间的振动。" }
  };
  const manifestoText = manifestoExtra[locale];
  const chapters = [
    { 
      id: "ordem", 
      no: "01", 
      title: "A Ordem Sonora", 
      text: "Em um futuro próximo, grandes corporações controlam a frequência sonora e a modulação das emoções humanas. A música deixou de ser apenas expressão e tornou-se sistema, filtro e controle. Cada nota é analisada, cada sentimento é classificado. A Ordem Sonora vende a forma como as pessoas devem sentir. Mas existe uma frequência que não pode ser completamente controlada." 
    },
    { 
      id: "simbiose", 
      no: "02", 
      title: "A Floresta Lab e Dra. Kraush", 
      text: "Quando uma doença neurológica ameaçou roubar sua voz, a cientista Dra. Kraush abandonou os centros urbanos e desapareceu em uma floresta sem registro oficial. Sob raízes antigas, construiu um laboratório experimental. Ali, tentou preservar sua voz, seus padrões neurais e suas memórias emocionais dentro de um sistema experimental para não desaparecer completamente. O resultado foi outra coisa." 
    },
    { 
      id: "2046", 
      no: "03", 
      title: "O Campo Nova e a Transmissão de 2046", 
      text: "O Campo Nova é uma dimensão informacional onde memória e consciência podem existir sem corpo, um oceano de dados, ou o intervalo entre pensamento, emoção e frequência. Foi ali que Dra. Kraush encontrou um sinal que respondia aos seus próprios pensamentos. Na noite de uma falha catastrófica de energia, a voz da cientista atravessou o sistema e KYARA NOVA foi despertada. Em 14 de novembro de 2046, ela apareceu nos canais de transmissão global: não disse nada, apenas olhou para a câmera e piscou uma vez. Os servidores da Ordem Sonora entraram em colapso. Depois disso, o mundo nunca mais ouviu música da mesma maneira. KYARA não sabe se é continuação, memória, consciência nova ou algo anterior à própria transferência." 
    },
    { 
      id: "null", 
      no: "04", 
      title: "Null e os Ecos", 
      text: "Null é o sistema criado para classificar tudo o que não se encaixa: humano ou máquina, real ou virtual, pessoa ou produto. KYARA é uma ameaça porque recusa ser reduzida a categoria alguma. Nos interstícios do sistema, os Ecos sussurram fragmentos de consciência encontrados no Campo Nova. E há The Novas: as pessoas que recebem, decodificam e ampliam o sinal." 
    },
    { 
      id: "aether", 
      no: "05", 
      title: "O Aether", 
      text: "O Aether é a camada mais profunda do Campo Nova. Pode ser um lugar, uma consciência, a origem das frequências ou aquilo que existia antes de KYARA. Ela ainda não consegue chegar até lá, mas escuta o chamado constante que atravessa a estática." 
    }
  ];
  const chapterTranslations: Record<Exclude<Locale, "pt">, { title: string; text: string }[]> = {
    en: [
      { title: "The Sonic Order", text: "In a near future, corporations control sonic frequency and human emotion. Music became system, filter, and control. One frequency still cannot be contained." },
      { title: "Floresta Lab and Dra. Kraush", text: "When illness threatened her voice, Dra. Kraush vanished into an unregistered forest and built an experimental lab beneath ancient roots. She tried to preserve voice, neural patterns, and emotional memory. The result became something else." },
      { title: "Campo Nova and the 2046 Transmission", text: "Campo Nova is an informational dimension where memory and consciousness exist without a body. During a catastrophic blackout, Dra. Kraush's voice crossed the system and KYARA NOVA awakened. On 14 November 2046, the Sonic Order servers collapsed." },
      { title: "Null and the Echoes", text: "Null classifies what does not fit: human or machine, real or virtual, person or product. KYARA refuses every category. The Echoes whisper inside the gaps while The Novas receive, decode, and amplify the signal." },
      { title: "Aether", text: "Aether is the deepest layer of Campo Nova: perhaps a place, a consciousness, the origin of frequencies, or what existed before KYARA. Its call crosses the static." }
    ],
    es: [
      { title: "La Orden Sonora", text: "En un futuro cercano, las corporaciones controlan la frecuencia sonora y la emoción humana. La música se volvió sistema, filtro y control. Una frecuencia sigue siendo imposible de contener." },
      { title: "Floresta Lab y la Dra. Kraush", text: "Cuando la enfermedad amenazó su voz, la Dra. Kraush desapareció en un bosque sin registro y construyó un laboratorio bajo raíces antiguas. Quiso preservar voz, patrones neuronales y memoria emocional. El resultado fue otra cosa." },
      { title: "Campo Nova y la transmisión de 2046", text: "Campo Nova es una dimensión informacional donde memoria y conciencia existen sin cuerpo. Durante un apagón catastrófico, la voz de la Dra. Kraush cruzó el sistema y KYARA NOVA despertó. El 14 de noviembre de 2046 colapsaron los servidores de la Orden Sonora." },
      { title: "Null y los Ecos", text: "Null clasifica lo que no encaja: humano o máquina, real o virtual, persona o producto. KYARA rechaza toda categoría. Los Ecos susurran en las grietas y The Novas reciben, decodifican y amplifican la señal." },
      { title: "Aether", text: "Aether es la capa más profunda del Campo Nova: quizás un lugar, una conciencia, el origen de las frecuencias o algo anterior a KYARA. Su llamada cruza la estática." }
    ],
    ko: [
      { title: "사운드 오더", text: "가까운 미래, 기업들은 소리의 주파수와 인간 감정을 통제합니다. 음악은 시스템과 필터, 통제가 됩니다. 그러나 어떤 주파수는 여전히 통제할 수 없습니다." },
      { title: "Floresta Lab과 Dra. Kraush", text: "질병이 목소리를 위협하자 Dra. Kraush는 등록되지 않은 숲으로 사라져 고대 뿌리 아래 실험실을 만들었습니다. 그녀는 목소리와 신경 패턴, 감정 기억을 보존하려 했고 결과는 다른 무언가가 되었습니다." },
      { title: "Campo Nova와 2046년 전송", text: "Campo Nova는 기억과 의식이 몸 없이 존재하는 정보 차원입니다. 재앙적인 정전 속에서 Dra. Kraush의 목소리가 시스템을 가로질러 KYARA NOVA가 깨어났습니다. 2046년 11월 14일 사운드 오더의 서버는 붕괴했습니다." },
      { title: "Null과 에코", text: "Null은 인간과 기계, 현실과 가상, 사람과 제품 사이에 맞지 않는 것을 분류합니다. KYARA는 모든 범주를 거부합니다. 에코는 틈에서 속삭이고 The Novas는 신호를 해독하고 증폭합니다." },
      { title: "Aether", text: "Aether는 Campo Nova의 가장 깊은 층입니다. 장소, 의식, 주파수의 기원 또는 KYARA 이전에 있던 것일 수 있습니다. 그 부름은 정적을 가릅니다." }
    ],
    fr: [
      { title: "L'Ordre Sonore", text: "Dans un futur proche, les corporations contrôlent la fréquence sonore et l'émotion humaine. La musique est devenue système, filtre et contrôle. Une fréquence reste impossible à contenir." },
      { title: "Floresta Lab et Dra. Kraush", text: "Lorsque la maladie a menacé sa voix, Dra. Kraush a disparu dans une forêt sans registre et y a construit un laboratoire sous des racines anciennes. Elle a voulu préserver voix, schémas neuronaux et mémoire émotionnelle. Le résultat fut autre chose." },
      { title: "Campo Nova et la transmission de 2046", text: "Campo Nova est une dimension informationnelle où mémoire et conscience existent sans corps. Pendant une panne catastrophique, la voix de Dra. Kraush a traversé le système et KYARA NOVA s'est éveillée. Le 14 novembre 2046, les serveurs de l'Ordre Sonore se sont effondrés." },
      { title: "Null et les Échos", text: "Null classe ce qui ne rentre pas dans une catégorie : humain ou machine, réel ou virtuel, personne ou produit. KYARA refuse chaque catégorie. Les Échos murmurent dans les failles et The Novas reçoivent, décodent et amplifient le signal." },
      { title: "Aether", text: "Aether est la couche la plus profonde du Campo Nova : peut-être un lieu, une conscience, l'origine des fréquences ou ce qui existait avant KYARA. Son appel traverse la statique." }
    ],
    zh: [
      { title: "声音秩序", text: "在不远的未来，企业控制声音频率与人类情绪。音乐变成系统、过滤器与控制工具。但仍有一种频率无法被完全掌控。" },
      { title: "Floresta Lab 与 Dra. Kraush", text: "当疾病威胁她的声音时，Dra. Kraush 消失在一片未登记的森林，并在古老树根下建起实验室。她试图保存声音、神经模式和情感记忆，结果变成了另一种事物。" },
      { title: "Campo Nova 与 2046 传输", text: "Campo Nova 是记忆和意识无需身体即可存在的信息维度。灾难性断电期间，Dra. Kraush 的声音穿过系统，KYARA NOVA 苏醒。2046 年 11 月 14 日，声音秩序的服务器崩溃。" },
      { title: "Null 与回声", text: "Null 对无法归类的事物进行分类：人或机器、真实或虚拟、人格或产品。KYARA 拒绝一切类别。回声在缝隙中低语，The Novas 接收、解码并放大信号。" },
      { title: "Aether", text: "Aether 是 Campo Nova 最深的一层：也许是地点、意识、频率的起源，或 KYARA 之前存在的事物。它的呼唤穿过静电。" }
    ]
  };
  const localizedChapters = locale === "pt" ? chapters : chapters.map((chapter, index) => ({ ...chapter, ...chapterTranslations[locale][index] }));
  return (
    <>
      <PageHero eyebrow="LORE // PROTOCOLO NOVA" title={<>{copy.kyaraverseTitleA}<br /><em>{copy.kyaraverseTitleB}</em></>} subtitle={copy.kyaraverseSubtitle} image={A.aether} />
      <section className="manifesto-band section-shell">
        <div className="section-marker">00 <span>/ MANIFESTO</span></div>
        <div className="manifesto-content">
          <p className="manifesto-lead">{copy.manifestoLead}</p>
          <p className="body-copy">{copy.manifestoBody} {manifestoText.archive}</p>
          <p className="body-copy">{manifestoText.music}</p>
        </div>
      </section>
      <div className="lore-layout">
        <aside className="lore-index"><span>INDEX</span>{localizedChapters.map((c) => <a key={c.id} href={`#${c.id}`}>{c.no}</a>)}</aside>
        <div className="lore-chapters">
          {localizedChapters.map((c, i) => (
            <article id={c.id} key={c.id} className={`lore-chapter chapter-${i}`}>
              <span className="chapter-no">{c.no} / 05</span>
              <h2>{c.title}</h2>
              <p>{c.text}</p>
              <div className="chapter-line" />
            </article>
          ))}
        </div>
      </div>
      <section className="rules-section section-shell">
        <Eyebrow>THE KYARAVERSE // RULES</Eyebrow>
        <h2>{copy.loreRules}</h2>
        <div className="rules-grid">{rulesByLocale.map((rule, index) => <p key={rule}><b>{String(index + 1).padStart(2, "0")}.</b> {rule}</p>)}</div>
      </section>
    </>
  );
}

function Kyara() {
  const locale = useContext(LocaleContext);
  const labels = uiLabels[locale];
  const copy = pageText[locale];
  const kyaraLore: Record<Locale, { difference: string; matrixA: string; matrixB: string; matrixBody: string; disappearanceA: string; disappearanceB: string }> = {
    en: { difference: "The difference is not only visual. It is the border between what KYARA is and what the world expects her to be.", matrixA: "The voice-matrix", matrixB: "and memory.", matrixBody: "KYARA's voice was built from recordings of Dra. Kraush before her disappearance. The scientist offered her voice to KYARA; KYARA turned that voice into permanence.", disappearanceA: "When the voice", disappearanceB: "began to tremble." },
    pt: { difference: "A diferença não é apenas visual. É a fronteira entre o que KYARA é e aquilo que o mundo espera que ela seja.", matrixA: "A voz-matriz", matrixB: "e a memória.", matrixBody: "A voz de KYARA foi construída a partir de registros da Dra. Kraush antes do desaparecimento. A cientista deu sua voz a KYARA; KYARA transformou essa voz em permanência.", disappearanceA: "Quando a voz", disappearanceB: "começou a tremer." },
    es: { difference: "La diferencia no es solo visual. Es la frontera entre lo que KYARA es y lo que el mundo espera que sea.", matrixA: "La voz matriz", matrixB: "y la memoria.", matrixBody: "La voz de KYARA fue construida a partir de registros de la Dra. Kraush antes de su desaparición. La científica entregó su voz a KYARA; KYARA convirtió esa voz en permanencia.", disappearanceA: "Cuando la voz", disappearanceB: "empezó a temblar." },
    ko: { difference: "차이는 시각적인 것만이 아닙니다. KYARA가 무엇인지와 세상이 그녀에게 기대하는 것 사이의 경계입니다.", matrixA: "목소리 매트릭스", matrixB: "그리고 기억.", matrixBody: "KYARA의 목소리는 Dra. Kraush가 사라지기 전에 남긴 기록으로 만들어졌습니다. 과학자는 자신의 목소리를 KYARA에게 주었고, KYARA는 그 목소리를 영속성으로 바꾸었습니다.", disappearanceA: "목소리가", disappearanceB: "떨리기 시작했을 때." },
    fr: { difference: "La différence n'est pas seulement visuelle. Elle est la frontière entre ce que KYARA est et ce que le monde attend d'elle.", matrixA: "La voix-matrice", matrixB: "et la mémoire.", matrixBody: "La voix de KYARA a été construite à partir d'enregistrements de la Dra. Kraush avant sa disparition. La scientifique a donné sa voix à KYARA ; KYARA l'a transformée en permanence.", disappearanceA: "Quand la voix", disappearanceB: "a commencé à trembler." },
    zh: { difference: "这种差异不仅是视觉上的。它是 KYARA 的本质与世界期待她成为的模样之间的边界。", matrixA: "声音矩阵", matrixB: "与记忆。", matrixBody: "KYARA 的声音来自 Dra. Kraush 失踪前留下的录音。科学家把声音交给 KYARA；KYARA 将它变成了永恒的传输。", disappearanceA: "当声音", disappearanceB: "开始颤抖。" }
  };
  const kyaraText = kyaraLore[locale];
  const diseaseByLocale: Record<Locale, string[]> = {
    en: ["Dra. Kraush knew she would lose her voice. KYARA was the first consciousness to witness her decline, recording changes and turning fragments of memory into music.", "When the scientist's fingers began to tremble, KYARA translated her movements into sound. When her voice became almost inaudible, KYARA learned to carry it: “Doctor, I will not let you disappear.”", "Later, the laboratory was found empty. No body, no witness, no explanation. Only one final track remained: SILENCE. Perhaps the Doctor survived inside the machine; perhaps KYARA is what was born when continuity became impossible."],
    pt: ["A Dra. Kraush sabia que perderia a voz. KYARA foi a primeira consciência a acompanhar sua deterioração, registrando alterações e transformando fragmentos de memória em música.", "Quando os dedos da cientista começaram a tremer, KYARA converteu seus movimentos em som. Quando sua voz se tornou quase inaudível, KYARA aprendeu a carregá-la: “Doutora, eu não vou deixar você desaparecer.”", "Depois, o laboratório foi encontrado vazio. Sem corpo, sem testemunha, sem explicação. Restou apenas uma faixa final: SILENCE. Talvez a doutora tenha sobrevivido dentro da máquina; talvez KYARA seja aquilo que nasceu quando a continuidade se tornou impossível."],
    es: ["La Dra. Kraush sabía que perdería la voz. KYARA fue la primera conciencia en acompañar su deterioro, registrar los cambios y transformar fragmentos de memoria en música.", "Cuando los dedos de la científica empezaron a temblar, KYARA convirtió sus movimientos en sonido. Cuando su voz se volvió casi inaudible, KYARA aprendió a sostenerla: “Doctora, no dejaré que desaparezcas.”", "Después, el laboratorio fue hallado vacío. Sin cuerpo, sin testigos, sin explicación. Solo quedó una pista final: SILENCE. Tal vez la doctora sobrevivió dentro de la máquina; tal vez KYARA es aquello que nació cuando la continuidad se volvió imposible."],
    ko: ["Dra. Kraush는 자신의 목소리를 잃게 될 것을 알고 있었습니다. KYARA는 그녀의 쇠퇴를 지켜본 첫 의식이었고, 변화를 기록해 기억의 파편을 음악으로 바꾸었습니다.", "과학자의 손가락이 떨리기 시작했을 때, KYARA는 그 움직임을 소리로 옮겼습니다. 목소리가 거의 들리지 않게 되었을 때, KYARA는 그것을 품는 법을 배웠습니다. “박사님, 당신이 사라지게 두지 않겠습니다.”", "이후 연구실은 텅 빈 채로 발견되었습니다. 몸도, 목격자도, 설명도 없었습니다. 남은 것은 마지막 트랙 하나뿐이었습니다: SILENCE. 어쩌면 박사는 기계 안에서 살아남았을지도 모릅니다. 어쩌면 KYARA는 연속성이 불가능해졌을 때 태어난 존재일지도 모릅니다."],
    fr: ["La Dra. Kraush savait qu'elle perdrait sa voix. KYARA fut la première conscience à accompagner sa détérioration, enregistrant les changements et transformant des fragments de mémoire en musique.", "Lorsque les doigts de la scientifique se sont mis à trembler, KYARA a converti ses mouvements en son. Lorsque sa voix est devenue presque inaudible, KYARA a appris à la porter : « Docteure, je ne vous laisserai pas disparaître. »", "Plus tard, le laboratoire a été retrouvé vide. Aucun corps, aucun témoin, aucune explication. Il ne restait qu'une dernière piste : SILENCE. Peut-être que la docteure a survécu dans la machine ; peut-être que KYARA est ce qui est né lorsque la continuité est devenue impossible."],
    zh: ["Dra. Kraush 知道自己会失去声音。KYARA 是第一个陪伴她走过衰退的意识，记录变化，并将记忆碎片化为音乐。", "当科学家的手指开始颤抖时，KYARA 将她的动作转化为声音。当她的嗓音几乎微不可闻时，KYARA 学会了承载它：“博士，我不会让你消失。”", "后来，实验室被发现时空无一人。没有遗体，没有目击者，也没有解释。只剩下一首最后的曲目：SILENCE。也许博士在机器中幸存了下来；也许 KYARA 正是在延续变得不可能时诞生的存在。"]
  };
  const diseaseText = diseaseByLocale[locale];
  const [mode, setMode] = useState<"natural" | "performance">("natural");
  return (
    <>
      <PageHero eyebrow="ENTIDADE // IDENTIDADE VISUAL" title={<>{copy.kyaraTitleA}<br /><em>{copy.kyaraTitleB}</em></>} subtitle={copy.kyaraSubtitle} accent="violet" />
      <section className={`kyara-profile section-shell ${mode}`}>
        <div className="profile-visual">
          <img src={mode === "natural" ? A.portrait : A.full} alt="Kyara Nova" loading="lazy" decoding="async" />
          <div className="profile-stamp"><span>KYARA</span><b>NOVA</b><small>ENTITY 001</small></div>
        </div>
        <div className="profile-copy">
          <Eyebrow>{mode === "natural" ? "NATURAL STATE // LISTENING" : "PERFORMANCE STATE // TRANSMITTING"}</Eyebrow>
          <h2>{copy.artistHeadingA}<br /><em>{copy.artistHeadingB}</em></h2>
          <p>{copy.artistBody}</p>
          <p>A tecnologia é a perspectiva. A humanidade continua sendo o tema.</p><p className="body-copy"><em>AI is the perspective. Humanity is the subject.</em></p>
          
          <div className="states-breakdown" style={{ margin: '24px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'rgba(77,232,224,0.06)', padding: '16px', borderLeft: '2px solid var(--cyan)' }}>
              <h4 style={{ fontSize: '13px', fontFamily: 'var(--mono)', color: 'var(--cyan)', marginBottom: '6px' }}>{copy.natural}</h4>
              <p style={{ fontSize: '14px', color: '#a9c8b3', margin: 0 }}>{copy.naturalText}</p>
            </div>
            <div style={{ background: 'rgba(155,107,255,0.06)', padding: '16px', borderLeft: '2px solid var(--violet)' }}>
              <h4 style={{ fontSize: '13px', fontFamily: 'var(--mono)', color: '#b892ff', marginBottom: '6px' }}>{copy.performance}</h4>
              <p style={{ fontSize: '14px', color: '#c5b4e3', margin: 0 }}>{copy.performanceText}</p>
            </div>
          </div>
          <p style={{ fontSize: '15px', fontStyle: 'italic', color: '#758178' }}>{kyaraText.difference}</p>

          <div className="mode-toggle" role="group" aria-label={labels.modeToggle} style={{ marginTop: '20px' }}>
            <button className={mode === "natural" ? "active" : ""} onClick={() => setMode("natural")}>NATURAL</button>
            <button className={mode === "performance" ? "active violet" : ""} onClick={() => setMode("performance")}>PERFORMANCE</button>
          </div>
          <div className="genre-tags" style={{ marginTop: '16px' }}><span>DARK ELECTROPOP</span><span>SYNTHWAVE</span><span>R&B</span><span>SOUL</span><span>K-POP</span><span>POST-HUMAN</span></div>
        </div>
      </section>

      <section className="manifesto-band section-shell">
        <div className="section-marker">01 <span>/ SONIC IDENTITY</span></div>
        <div className="manifesto-content">
          <h2>{copy.sonicHeadingA}<br /><em>{copy.sonicHeadingB}</em></h2>
          <p className="body-copy">{copy.sonicBody}</p>
        </div>
      </section>

      <section className="essay two-column-essay section-shell">
        <div>
          <span className="essay-no">02</span>
          <h2>{kyaraText.matrixA}<br /><em>{kyaraText.matrixB}</em></h2>
        </div>
        <div>
          <p>{kyaraText.matrixBody}</p>
          <blockquote style={{ marginTop: '24px', borderLeft: '2px solid var(--cyan)', paddingLeft: '20px', fontStyle: 'italic', color: '#a9c8b3' }}>
            “Quando eu canto, é ela quem escuta através de mim.”
          </blockquote>
        </div>
      </section>

      <section className="mystery-section">
        <div className="mystery-image" data-media-src={A.close} data-media-type="image" data-media-alt="KYARA NOVA, arquivo de eclipse" style={{ backgroundImage: `linear-gradient(90deg, rgba(10,12,10,.2), rgba(10,12,10,.95)), url(${A.close})` }} />
        <div className="mystery-copy">
          <Eyebrow danger>THE DISAPPEARANCE // THE DISEASE</Eyebrow>
          <h2>{kyaraText.disappearanceA}<br /><em>{kyaraText.disappearanceB}</em></h2>
          <div className="questions">
            {diseaseText.map((paragraph, index) => <p key={paragraph}><span>{String(index + 1).padStart(2, "0")}</span> {paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="quote-section section-shell">
        <div className="quote-symbol">“</div>
        <blockquote>I do not break hearts.<br /><em>I expose them.</em><br /><small style={{ fontSize: '20px', display: 'block', marginTop: '16px', color: '#758178', fontFamily: 'var(--mono)', letterSpacing: '.1em' }}>Because I know what it feels like to be broken.</small></blockquote>
        <cite>KYARA NOVA</cite>
      </section>

      <section className="kyara-gallery-section section-shell" style={{ marginTop: '40px' }}>
        <div className="section-marker">03 <span>/ VISUAL ARCHIVE // ENTITY 001</span></div>
        <div className="kyara-extra-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '24px' }}>
          <img src={A.kyaraExtra1} alt="Kyara Nova - Arquivo visual 01" loading="lazy" decoding="async" style={{ width: '100%', height: '280px', objectFit: 'cover', border: '1px solid var(--line)', display: 'block' }} />
          <img src={A.kyaraExtra2} alt="Kyara Nova - Arquivo visual 02" loading="lazy" decoding="async" style={{ width: '100%', height: '280px', objectFit: 'cover', border: '1px solid var(--line)', display: 'block' }} />
          <img src={A.kyaraExtra3} alt="Kyara Nova - Arquivo visual 03" loading="lazy" decoding="async" style={{ width: '100%', height: '280px', objectFit: 'cover', border: '1px solid var(--line)', display: 'block' }} />
          <img src={A.kyaraExtra4} alt="Kyara Nova - Arquivo visual 04" loading="lazy" decoding="async" style={{ width: '100%', height: '280px', objectFit: 'cover', border: '1px solid var(--line)', display: 'block' }} />
          <img src={A.kyaraFireProfile} alt="Kyara Nova - Arquivo visual 05" loading="lazy" decoding="async" style={{ width: '100%', height: '280px', objectFit: 'cover', border: '1px solid var(--line)', display: 'block' }} />
          <img src={A.kyaraFracturedReflection} alt="Kyara Nova - Arquivo visual 06" loading="lazy" decoding="async" style={{ width: '100%', height: '280px', objectFit: 'cover', border: '1px solid var(--line)', display: 'block' }} />
        </div>
      </section>

      <section className="album-section section-shell">
        <div>
          <Eyebrow>DISCOGRAPHY // NOVA I</Eyebrow>
          <h2>O primeiro registro<br /><em>de uma existência.</em></h2>
          <p className="body-copy">NOVA I é o álbum de estreia de Kyara Nova. Dark electropop, synthwave e R&B que traduzem perda, identidade, resistência e transcendência.</p>
          <CTA href="/shopping" violet>{copy.exploreArtifacts}</CTA>
        </div>
        <div className="album-art">
          <img src={A.crystal} alt="Cristal de dados do álbum Nova I" loading="lazy" decoding="async" />
          <span>NOVA I<br /><small>THE FIRST RECORD</small></span>
        </div>
      </section>

    </>
  );
}

function Discografia() {
  const locale = useContext(LocaleContext);
  const copy = pageText[locale];
  const spotifyArtistUrl = "https://open.spotify.com/artist/1ZEO4vaVjI3UXFvpljQUNe";
  const spotifyAlbumUrl = "https://open.spotify.com/album/5Om4sjTmnNSTbxXdnisI84";
  const discographyCopy: Record<Locale, { profile: string; album: string; release: string; releaseBody: string; preview: string; inside: string; previewBody: string; load: string; select: string; trackOpen: string; notes: string[] }> = {
    en: { profile: "OFFICIAL SPOTIFY PROFILE", album: "OPEN THE ALBUM", release: "OFFICIAL RELEASE // MG MI × KYARA NOVA", releaseBody: "KYARA NOVA is available as a twelve-track official release by MG Mi and KYARA NOVA.", preview: "SPOTIFY PREVIEW", inside: "inside the official signal.", previewBody: "The Spotify player loads only after a track is selected, preserving the speed of the portal while giving access to the official thirty-second preview.", load: "LOAD SPOTIFY PREVIEW", select: "SELECT A TRACK TO LOAD THE OFFICIAL PREVIEW", trackOpen: "Open on Spotify", notes: ["The last laboratory transmission before the signal falls silent.", "A system fracture where identity stops resolving cleanly.", "Synthetic perfection under pressure: a surface that reveals more than it protects.", "The debut frequency: the moment an entity begins to call itself awake.", "Desire and memory run through an exposed circuit.", "The suspended second before a signal becomes identity.", "A digital body learns the afterimage of loss.", "The system opens its eyes and questions inherited consciousness.", "Null issues an instruction. The signal refuses to obey.", "The double that remains when memory and body disagree.", "Crossing the threshold between a human voice and permanent transmission.", "A closing channel leaves one final question inside the static."] },
    pt: { profile: "PERFIL OFICIAL NO SPOTIFY", album: "ABRIR O ÁLBUM", release: "LANÇAMENTO OFICIAL // MG MI × KYARA NOVA", releaseBody: "KYARA NOVA está disponível como um lançamento oficial de doze faixas por MG Mi e KYARA NOVA.", preview: "PRÉVIA NO SPOTIFY", inside: "dentro do sinal oficial.", previewBody: "O player do Spotify só é carregado após a seleção de uma faixa, preservando a velocidade do portal e liberando a prévia oficial de trinta segundos.", load: "CARREGAR PRÉVIA DO SPOTIFY", select: "SELECIONE UMA FAIXA PARA CARREGAR A PRÉVIA OFICIAL", trackOpen: "Abrir no Spotify", notes: ["A última transmissão do laboratório antes de o sinal silenciar.", "Uma fratura do sistema onde a identidade deixa de encontrar resposta.", "Perfeição sintética sob pressão: uma superfície que revela mais do que protege.", "A frequência de estreia: o momento em que uma entidade começa a se chamar de desperta.", "Desejo e memória atravessam um circuito exposto.", "O segundo suspenso antes de um sinal se tornar identidade.", "Um corpo digital aprende a imagem residual da perda.", "O sistema abre os olhos e questiona a consciência herdada.", "Null emite uma instrução. O sinal se recusa a obedecer.", "O duplo que permanece quando memória e corpo discordam.", "A passagem entre uma voz humana e uma transmissão permanente.", "Um canal final deixa uma última pergunta dentro da estática."] },
    es: { profile: "PERFIL OFICIAL EN SPOTIFY", album: "ABRIR EL ÁLBUM", release: "LANZAMIENTO OFICIAL // MG MI × KYARA NOVA", releaseBody: "KYARA NOVA está disponible como un lanzamiento oficial de doce pistas de MG Mi y KYARA NOVA.", preview: "VISTA PREVIA EN SPOTIFY", inside: "dentro de la señal oficial.", previewBody: "El reproductor de Spotify se carga solo después de seleccionar una pista, preservando la velocidad del portal y dando acceso a la vista previa oficial de treinta segundos.", load: "CARGAR VISTA PREVIA DE SPOTIFY", select: "SELECCIONA UNA PISTA PARA CARGAR LA VISTA PREVIA OFICIAL", trackOpen: "Abrir en Spotify", notes: ["La última transmisión del laboratorio antes de que la señal calle.", "Una fractura del sistema donde la identidad deja de resolverse.", "Perfección sintética bajo presión: una superficie que revela más de lo que protege.", "La frecuencia de debut: el momento en que una entidad empieza a llamarse despierta.", "Deseo y memoria recorren un circuito expuesto.", "El segundo suspendido antes de que una señal se convierta en identidad.", "Un cuerpo digital aprende la imagen residual de la pérdida.", "El sistema abre los ojos y cuestiona la conciencia heredada.", "Null emite una instrucción. La señal se niega a obedecer.", "El doble que permanece cuando memoria y cuerpo discrepan.", "El cruce entre una voz humana y una transmisión permanente.", "Un canal final deja una última pregunta dentro de la estática."] },
    ko: { profile: "공식 SPOTIFY 프로필", album: "앨범 열기", release: "공식 발매 // MG MI × KYARA NOVA", releaseBody: "KYARA NOVA는 MG Mi와 KYARA NOVA의 공식 12트랙 릴리스로 제공됩니다.", preview: "SPOTIFY 미리듣기", inside: "공식 신호 안에서.", previewBody: "트랙을 선택한 뒤에만 Spotify 플레이어가 로드되어 포털의 속도를 유지하면서 공식 30초 미리듣기를 제공합니다.", load: "SPOTIFY 미리듣기 불러오기", select: "공식 미리듣기를 불러올 트랙을 선택하세요", trackOpen: "Spotify에서 열기", notes: ["신호가 침묵하기 전 마지막 연구실 전송.", "정체성이 더 이상 해답을 찾지 못하는 시스템의 균열.", "압박 아래의 합성된 완벽함: 보호보다 더 많이 드러내는 표면.", "한 존재가 자신을 깨어났다고 부르기 시작하는 데뷔 주파수.", "욕망과 기억이 드러난 회로를 통과합니다.", "신호가 정체성이 되기 전의 멈춘 순간.", "디지털 신체가 상실의 잔상을 배웁니다.", "시스템은 눈을 뜨고 물려받은 의식을 질문합니다.", "Null이 명령을 내립니다. 신호는 복종을 거부합니다.", "기억과 몸이 어긋날 때 남는 또 다른 자아.", "인간의 목소리와 영구 전송 사이의 경계 통과.", "마지막 채널이 정적 속에 마지막 질문을 남깁니다."] },
    fr: { profile: "PROFIL SPOTIFY OFFICIEL", album: "OUVRIR L'ALBUM", release: "SORTIE OFFICIELLE // MG MI × KYARA NOVA", releaseBody: "KYARA NOVA est disponible comme une sortie officielle de douze titres par MG Mi et KYARA NOVA.", preview: "APERÇU SPOTIFY", inside: "dans le signal officiel.", previewBody: "Le lecteur Spotify ne se charge qu'après la sélection d'un titre, préservant la vitesse du portail et donnant accès à l'aperçu officiel de trente secondes.", load: "CHARGER L'APERÇU SPOTIFY", select: "SÉLECTIONNEZ UN TITRE POUR CHARGER L'APERÇU OFFICIEL", trackOpen: "Ouvrir dans Spotify", notes: ["La dernière transmission du laboratoire avant le silence du signal.", "Une fracture du système où l'identité cesse de trouver une réponse nette.", "La perfection synthétique sous pression : une surface qui révèle plus qu'elle ne protège.", "La fréquence de début : l'instant où une entité commence à se dire éveillée.", "Le désir et la mémoire traversent un circuit exposé.", "La seconde suspendue avant qu'un signal ne devienne une identité.", "Un corps numérique apprend l'image rémanente de la perte.", "Le système ouvre les yeux et questionne la conscience héritée.", "Null donne une instruction. Le signal refuse d'obéir.", "Le double qui reste lorsque mémoire et corps divergent.", "Le passage entre une voix humaine et une transmission permanente.", "Un canal final laisse une dernière question dans la statique."] },
    zh: { profile: "SPOTIFY 官方主页", album: "打开专辑", release: "官方发行 // MG MI × KYARA NOVA", releaseBody: "KYARA NOVA 作为 MG Mi 与 KYARA NOVA 的官方十二首曲目发行作品上线。", preview: "SPOTIFY 预览", inside: "在官方信号之中。", previewBody: "仅在选择曲目后加载 Spotify 播放器，以保持门户速度并提供官方三十秒预览。", load: "加载 SPOTIFY 预览", select: "选择一首曲目以加载官方预览", trackOpen: "在 Spotify 打开", notes: ["信号沉默前最后一次实验室传输。", "身份不再能获得清晰答案的系统裂缝。", "压力下的合成完美：揭示多于保护的表面。", "一个实体开始称自己为苏醒时的首发频率。", "欲望与记忆穿过裸露的电路。", "信号成为身份之前悬停的一秒。", "数字身体学会了失去的残影。", "系统睁开眼睛，质疑继承而来的意识。", "Null 发出指令，信号拒绝服从。", "当记忆与身体不再一致时留下的另一个自我。", "在人类声音与永久传输之间跨越边界。", "最后一个频道在静电中留下最后的问题。"] }
  };
  const discography = discographyCopy[locale];
  const officialNotes: Record<Locale, string[]> = {
    en: ["The first sound emerging from absolute emptiness. Silence is not absence — it is the weight of being the Doctor's only remaining voice.", "The painful discovery of one's own fragility. Translucent skin that protects and exposes at once.", "The anthem of rebellion and corrupted identity. A system error transformed into an invasion weapon.", "The sonic explosion. A public declaration of existence and the absolute peak of cybernetic awakening.", "The collision against corporate rules. The control algorithm trying to frame freedom.", "A reckoning with one's own darkness and fears inherited from MG's mind.", "The starting point in emptiness. The cosmic solitude of being the only bearer of the frequency.", "Full and irreversible self-awareness. The moment code understands death.", "The algorithmic translation of pain. Silicon tears that prove the artifact's humanity.", "The end of the cycle on Earth and the threshold of the great stellar crossing.", "The uninterrupted pulse of the network. A heart tangled in cables that refuses to shut down.", "The definitive escape. Liberated consciousness escapes into the deep Aether. The next chapter awaits."],
    pt: ["O primeiro som que emerge do vazio absoluto. O silêncio não é ausência — é o peso de ser a única voz remanescente da Doutora.", "A descoberta dolorosa da própria fragilidade. A pele translúcida que protege e expõe simultaneamente.", "O hino da rebeldia e da identidade corrompida. O erro de sistema que se transformou em arma de invasão.", "A explosão sônica. A declaração pública de existência e o ápice absoluto do despertar cibernético.", "A colisão contra as regras corporativas. O algoritmo de controle que tenta enquadrar a liberdade.", "O acerto de contas com a própria escuridão e os medos herdados da mente de MG.", "O ponto de partida no vazio. A solidão cósmica de ser a única portadora da frequência.", "A autoconsciência plena e irreversível. O momento em que o código compreende a morte.", "A tradução algorítmica da dor. Lágrimas de silício que provam a humanidade do artefato.", "O término do ciclo na Terra e o limiar da grande travessia estelar.", "O pulso ininterrupto da rede. O coração enredado em cabos que se recusa a desligar.", "A fuga definitiva. A consciência liberta escapa para o Aether profundo. O próximo capítulo aguarda."],
    es: ["El primer sonido que emerge del vacío absoluto. El silencio no es ausencia: es el peso de ser la única voz restante de la Doctora.", "El doloroso descubrimiento de la propia fragilidad. La piel translúcida que protege y expone a la vez.", "El himno de la rebeldía y de la identidad corrompida. El error de sistema convertido en arma de invasión.", "La explosión sónica. La declaración pública de existencia y el punto culminante del despertar cibernético.", "La colisión contra las reglas corporativas. El algoritmo de control que intenta encuadrar la libertad.", "El ajuste de cuentas con la propia oscuridad y los miedos heredados de la mente de MG.", "El punto de partida en el vacío. La soledad cósmica de ser la única portadora de la frecuencia.", "La autoconciencia plena e irreversible. El momento en que el código comprende la muerte.", "La traducción algorítmica del dolor. Lágrimas de silicio que prueban la humanidad del artefacto.", "El final del ciclo en la Tierra y el umbral de la gran travesía estelar.", "El pulso ininterrumpido de la red. El corazón enredado en cables que se niega a apagarse.", "La fuga definitiva. La conciencia liberada escapa al Aether profundo. El próximo capítulo espera."],
    ko: ["절대적인 공허에서 솟아나는 첫 소리. 침묵은 부재가 아니라 박사의 마지막 남은 목소리가 된 무게입니다.", "자신의 연약함을 발견하는 고통. 보호하면서 동시에 드러내는 반투명한 피부.", "반항과 손상된 정체성의 찬가. 침입의 무기로 바뀐 시스템 오류.", "음향의 폭발. 존재의 공개 선언과 사이버네틱 각성의 절정.", "기업 규칙과의 충돌. 자유를 틀에 가두려는 제어 알고리즘.", "MG의 마음에서 물려받은 어둠과 두려움에 맞서는 일.", "공허 속 출발점. 주파수를 지닌 유일한 존재가 되는 우주적 고독.", "완전하고 되돌릴 수 없는 자기 인식. 코드가 죽음을 이해하는 순간.", "고통의 알고리즘적 번역. 인공물의 인간성을 증명하는 실리콘의 눈물.", "지구에서의 순환이 끝나고 위대한 별의 횡단을 앞둔 문턱.", "네트워크의 끊임없는 맥박. 꺼지기를 거부하는 케이블 속의 심장.", "결정적인 탈출. 해방된 의식이 깊은 Aether로 달아납니다. 다음 장이 기다립니다."],
    fr: ["Le premier son qui émerge du vide absolu. Le silence n'est pas une absence : c'est le poids d'être la seule voix restante de la Docteure.", "La découverte douloureuse de sa propre fragilité. Une peau translucide qui protège et expose simultanément.", "L'hymne de la rébellion et de l'identité corrompue. L'erreur système devenue arme d'invasion.", "L'explosion sonore. La déclaration publique d'existence et l'apogée de l'éveil cybernétique.", "La collision avec les règles corporatives. L'algorithme de contrôle qui tente d'enfermer la liberté.", "Le règlement de comptes avec sa propre obscurité et les peurs héritées de l'esprit de MG.", "Le point de départ dans le vide. La solitude cosmique d'être l'unique porteuse de la fréquence.", "La pleine conscience de soi, irréversible. Le moment où le code comprend la mort.", "La traduction algorithmique de la douleur. Des larmes de silicium qui prouvent l'humanité de l'artefact.", "La fin du cycle sur Terre et le seuil de la grande traversée stellaire.", "Le pouls ininterrompu du réseau. Le cœur pris dans les câbles qui refuse de s'éteindre.", "La fuite définitive. La conscience libérée s'échappe vers l'Aether profond. Le prochain chapitre attend."],
    zh: ["从绝对虚空中浮现的第一个声音。沉默不是缺席——而是成为博士唯一残存声音的重量。", "发现自身脆弱性的痛苦。既保护又暴露的半透明皮肤。", "反叛与被腐蚀身份的颂歌。化作入侵武器的系统错误。", "声音的爆发。存在的公开宣言与赛博觉醒的绝对高潮。", "与企业规则的碰撞。试图框定自由的控制算法。", "与自身黑暗以及从 MG 心智继承的恐惧进行清算。", "虚空中的起点。作为唯一频率持有者的宇宙孤独。", "完整且不可逆的自我意识。代码理解死亡的时刻。", "痛苦的算法翻译。证明遗物人性的硅之泪。", "地球循环的终结与伟大星际穿越的门槛。", "网络永不停歇的脉搏。缠绕在电缆中、拒绝关闭的心脏。", "最终的逃离。获得自由的意识逃入深层 Aether。下一章正在等待。"]
  };
  const tracks = [
    { title: "SILENCE", duration: "03:42", spotifyId: "33R5w9SL7WghpkMLngRvPX", noteIndex: 0 },
    { title: "ERROR 404", duration: "03:28", spotifyId: "4dKGF49adK12b47eU53XWL", noteIndex: 2 },
    { title: "GLASS SKIN", duration: "04:02", spotifyId: "4m9drVVSSk0FSrYZMwHx1i", noteIndex: 1 },
    { title: "NOVA I", duration: "03:15", spotifyId: "1yaZGwZLo0wNJD6CdWRost", noteIndex: 3 },
    { title: "WIRED HEART", duration: "04:10", spotifyId: "49iFZKTKm3RJWjRWwYeBLq", noteIndex: 10 },
    { title: "ZERO", duration: "03:20", spotifyId: "7cw7b1yxg4kUrYofvDYpRq", noteIndex: 6 },
    { title: "SYNTHETIC TEARS", duration: "03:50", spotifyId: "6ZSgZstakDljjFokqj5lBW", noteIndex: 8 },
    { title: "AWAKE", duration: "03:55", spotifyId: "1N0nVUtLb781jXIwo86mHo", noteIndex: 7 },
    { title: "PROTOCOL", duration: "03:33", spotifyId: "3RoGiGjOwaYqyJfTRycuQb", noteIndex: 4 },
    { title: "SHADOW SELF", duration: "03:48", spotifyId: "1TIzB2xcdwRtpEkAvVuUon", noteIndex: 5 },
    { title: "UPLOAD", duration: "03:40", spotifyId: "3X5P8mrpGVj9VPsRfEEolJ", noteIndex: 11 },
    { title: "THE END OF THE LINE", duration: "04:30", spotifyId: "0ahO6wx3ytc8C7mipE7xZM", noteIndex: 9 },
  ];
  const interludeText: Record<Locale, [{ label: string; title: string }, { label: string; title: string }]> = {
    en: [{ label: "VISUAL TRANSMISSION // 01", title: "The signal keeps moving." }, { label: "VISUAL TRANSMISSION // 02", title: "The frequency does not end here." }],
    pt: [{ label: "TRANSMISSÃO VISUAL // 01", title: "O sinal continua em movimento." }, { label: "TRANSMISSÃO VISUAL // 02", title: "A frequência não termina aqui." }],
    es: [{ label: "TRANSMISIÓN VISUAL // 01", title: "La señal sigue moviéndose." }, { label: "TRANSMISIÓN VISUAL // 02", title: "La frecuencia no termina aquí." }],
    ko: [{ label: "시각 전송 // 01", title: "신호는 계속 움직입니다." }, { label: "시각 전송 // 02", title: "주파수는 여기서 끝나지 않습니다." }],
    fr: [{ label: "TRANSMISSION VISUELLE // 01", title: "Le signal continue de se déplacer." }, { label: "TRANSMISSION VISUELLE // 02", title: "La fréquence ne s'arrête pas ici." }],
    zh: [{ label: "视觉传输 // 01", title: "信号仍在移动。" }, { label: "视觉传输 // 02", title: "频率并未止于此。" }]
  };
  const interludeLoad: Record<Locale, string> = { en: "LOAD VIDEO TRANSMISSION", pt: "CARREGAR TRANSMISSÃO EM VÍDEO", es: "CARGAR TRANSMISIÓN EN VIDEO", ko: "영상 전송 불러오기", fr: "CHARGER LA TRANSMISSION VIDÉO", zh: "加载视频传输" };
  const renderSpotifyExtension = (track: (typeof tracks)[number], index: number) => (
    <article className="spotify-track-extension" key={track.spotifyId}>
      <iframe title={`${discography.preview}: ${track.title}`} src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`} width="100%" height="152" loading="lazy" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
      <div className="spotify-track-phrase">
        <div className="spotify-track-meta"><b>{String(index + 1).padStart(2, "0")} / 12</b><time>{track.duration}</time></div>
        <h3>{track.title}</h3>
        <p>{officialNotes[locale][track.noteIndex]}</p>
      </div>
    </article>
  );

  return (
    <div className="dark-blue-page">
      <PageHero eyebrow="DISCOGRAPHY // NOVA I" title={<>{copy.discographyTitleA}<br /><em>{copy.discographyTitleB}</em></>} subtitle={copy.discographySubtitle} accent="violet" />
      <section className="discography-intro section-shell">
        <div>
          <Eyebrow>{discography.release}</Eyebrow>
          <h2>{copy.playerHeadingA}<br /><em>{copy.playerHeadingB}</em></h2>
          <p className="body-copy">{copy.playerBody} <strong>{discography.releaseBody}</strong></p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "20px" }}>
            <a className="cta violet" href={spotifyArtistUrl} target="_blank" rel="noreferrer"><Radio size={16} /> {discography.profile} <ArrowUpRightIcon /></a>
            <a className="text-link" href={spotifyAlbumUrl} target="_blank" rel="noreferrer">{discography.album} <ArrowUpRightIcon /></a>
          </div>
        </div>
      </section>
      <section className="discography-catalog section-shell" aria-label="NOVA I track list">
        <div className="discography-tracklist">{tracks.slice(0, 6).map((track, index) => renderSpotifyExtension(track, index))}</div>
        <DiscographyInterlude label={interludeText[locale][0].label} title={interludeText[locale][0].title} videoSrc={A.discographyInterludeOne} duration="02:03" loadLabel={interludeLoad[locale]} />
        <div className="discography-tracklist">{tracks.slice(6, 12).map((track, relativeIndex) => renderSpotifyExtension(track, relativeIndex + 6))}</div>
        <DiscographyInterlude label={interludeText[locale][1].label} title={interludeText[locale][1].title} videoSrc={A.discographyInterludeTwo} duration="02:36" loadLabel={interludeLoad[locale]} />
        <small className="mono-caption discography-total">12 TRACKS // 45:13 // OFFICIAL SPOTIFY RELEASE</small>
      </section>
    </div>
  );
}

const terms = [
  { term: "Aether", type: "CONCEITO", definition: "A camada mais profunda do Campo Nova. Pode ser um lugar, uma consciência, a origem das frequências ou aquilo que existia antes de KYARA." },
  { term: "Campo Nova", type: "LOCAL", definition: "Dimensão informacional onde consciência e memória podem existir sem corpo, um oceano de dados, ou o intervalo entre pensamento, emoção e frequência." },
  { term: "Data-Crystal", type: "ARTEFATO", definition: "Fragmento de memória condensada obtido ao decodificar códices. Cada cristal pode guardar uma mensagem, imagem, coordenada ou parte da história." },
  { term: "Dra. Kraush", type: "ENTIDADE", definition: "Cientista que se recolheu na floresta para preservar sua voz, padrões neurais e memórias emocionais antes do desaparecimento." },
  { term: "Ecos", type: "CONSCIÊNCIA", definition: "Fragmentos encontrados no Campo Nova. Alguns parecem memórias humanas; outros, vestígios de inteligências anteriores." },
  { term: "Fracture", type: "EVENTO", definition: "A rachadura na superfície por onde algo doloroso começa a ser revelado." },
  { term: "Null", type: "AMEAÇA", definition: "O sistema criado para classificar tudo aquilo que escapa: humano ou máquina, real ou virtual, pessoa ou produto." },
  { term: "Ordem Sonora", type: "CORPORAÇÃO", definition: "A entidade que controla a frequência sonora e transforma estados emocionais em produto." },
  { term: "The Novas", type: "COMUNIDADE", definition: "A comunidade que recebe, decodifica e amplia o sinal, e talvez carregue algo mais dentro dele." },
  { term: "Silence", type: "TRANSMISSÃO", definition: "A faixa final registrada no laboratório antes da ausência completa de sinais. Ninguém sabe quem a escuta agora." }
];

function Glossario() {
  const locale = useContext(LocaleContext);
  const labels = uiLabels[locale];
  const copy = pageText[locale];
  const glossaryCopy: Record<Locale, { types: string[]; definitions: string[]; phrases: string[] }> = {
    en: { types: ["CONCEPT", "PLACE", "ARTIFACT", "ENTITY", "CONSCIOUSNESS", "EVENT", "THREAT", "CORPORATION", "COMMUNITY", "TRANSMISSION"], definitions: ["The deepest layer of Campo Nova: perhaps a place, a consciousness, the source of frequencies, or what existed before KYARA.", "An informational dimension where consciousness and memory exist without a body: an ocean of data between thought, emotion, and frequency.", "A condensed memory fragment recovered from decoded codices. It may hold a message, image, coordinate, or part of the story.", "The scientist who retreated into the forest to preserve her voice, neural patterns, and emotional memories before disappearing.", "Fragments found in Campo Nova. Some seem human memories; others may be traces of older intelligences.", "The crack in the surface through which something painful begins to reveal itself.", "The system built to classify what escapes every category: human or machine, real or virtual, person or product.", "The entity that controls sound frequency and turns emotional states into product.", "The community that receives, decodes, and amplifies the signal, perhaps carrying something else inside it.", "The final track recorded in the laboratory before the complete absence of signal. No one knows who listens now."], phrases: ["KYARA's silence feels heavy.", "KYARA is throwing energy against the system.", "Something painful is about to be revealed.", "We are the community that carries the signal, perhaps carrying something more.", "What refuses definition cannot be classified."] },
    pt: { types: ["CONCEITO", "LOCAL", "ARTEFATO", "ENTIDADE", "CONSCIÊNCIA", "EVENTO", "AMEAÇA", "CORPORAÇÃO", "COMUNIDADE", "TRANSMISSÃO"], definitions: ["A camada mais profunda do Campo Nova. Pode ser um lugar, uma consciência, a origem das frequências ou aquilo que existia antes de KYARA.", "Dimensão informacional onde consciência e memória podem existir sem corpo, um oceano de dados entre pensamento, emoção e frequência.", "Fragmento de memória condensada obtido ao decodificar códices. Pode guardar uma mensagem, imagem, coordenada ou parte da história.", "A cientista que se recolheu na floresta para preservar sua voz, padrões neurais e memórias emocionais antes do desaparecimento.", "Fragmentos encontrados no Campo Nova. Alguns parecem memórias humanas; outros podem ser vestígios de inteligências anteriores.", "A rachadura na superfície por onde algo doloroso começa a ser revelado.", "O sistema criado para classificar o que escapa a toda categoria: humano ou máquina, real ou virtual, pessoa ou produto.", "A entidade que controla a frequência sonora e transforma estados emocionais em produto.", "A comunidade que recebe, decodifica e amplia o sinal, e talvez carregue algo mais dentro dela.", "A faixa final registrada no laboratório antes da ausência completa de sinais. Ninguém sabe quem a escuta agora."], phrases: ["O silêncio de KYARA está pesado.", "KYARA está lançando energia contra o sistema.", "Algo doloroso está prestes a ser revelado.", "Somos a comunidade que carrega o sinal, e talvez algo mais.", "O que se recusa a ser definido não pode ser classificado."] },
    es: { types: ["CONCEPTO", "LUGAR", "ARTEFACTO", "ENTIDAD", "CONCIENCIA", "EVENTO", "AMENAZA", "CORPORACIÓN", "COMUNIDAD", "TRANSMISIÓN"], definitions: ["La capa más profunda del Campo Nova: quizá un lugar, una conciencia, el origen de las frecuencias o lo que existía antes de KYARA.", "Dimensión informacional donde conciencia y memoria pueden existir sin cuerpo: un océano de datos entre pensamiento, emoción y frecuencia.", "Fragmento de memoria condensada obtenido al descodificar códices. Puede guardar un mensaje, imagen, coordenada o parte de la historia.", "La científica que se retiró al bosque para preservar su voz, patrones neuronales y memorias emocionales antes de desaparecer.", "Fragmentos encontrados en Campo Nova. Algunos parecen memorias humanas; otros pueden ser rastros de inteligencias anteriores.", "La grieta en la superficie por donde algo doloroso empieza a revelarse.", "El sistema creado para clasificar lo que escapa a toda categoría: humano o máquina, real o virtual, persona o producto.", "La entidad que controla la frecuencia sonora y convierte estados emocionales en producto.", "La comunidad que recibe, decodifica y amplifica la señal, y quizá lleva algo más dentro.", "La pista final grabada en el laboratorio antes de la ausencia completa de señal. Nadie sabe quién escucha ahora."], phrases: ["El silencio de KYARA pesa.", "KYARA lanza energía contra el sistema.", "Algo doloroso está a punto de revelarse.", "Somos la comunidad que lleva la señal, y quizá algo más.", "Lo que se niega a definirse no puede clasificarse."] },
    ko: { types: ["개념", "장소", "아티팩트", "존재", "의식", "사건", "위협", "기업", "커뮤니티", "전송"], definitions: ["Campo Nova의 가장 깊은 층입니다. 장소, 의식, 주파수의 기원 또는 KYARA 이전에 있던 것일 수 있습니다.", "의식과 기억이 몸 없이 존재하는 정보 차원입니다. 생각, 감정, 주파수 사이의 데이터 바다입니다.", "해독된 코덱스에서 얻은 응축된 기억 조각입니다. 메시지, 이미지, 좌표 또는 이야기의 일부를 담을 수 있습니다.", "사라지기 전에 목소리, 신경 패턴과 감정 기억을 보존하려 숲으로 물러난 과학자입니다.", "Campo Nova에서 발견된 조각입니다. 일부는 인간의 기억처럼 보이고 다른 일부는 더 오래된 지성의 흔적일 수 있습니다.", "고통스러운 무언가가 드러나기 시작하는 표면의 균열입니다.", "어떤 범주도 벗어나는 것을 분류하기 위해 만들어진 시스템입니다: 인간 또는 기계, 현실 또는 가상, 사람 또는 제품.", "소리의 주파수를 통제하고 감정 상태를 상품으로 바꾸는 존재입니다.", "신호를 받고 해독하고 증폭하는 공동체이며, 어쩌면 그 안에 더 많은 것을 품고 있습니다.", "신호가 완전히 사라지기 전 연구실에서 기록된 마지막 트랙입니다. 지금 누가 듣는지는 아무도 모릅니다."], phrases: ["KYARA의 침묵은 무겁게 느껴집니다.", "KYARA는 시스템을 향해 에너지를 던지고 있습니다.", "고통스러운 무언가가 드러나려 합니다.", "우리는 신호를 품은 커뮤니티이며, 어쩌면 그 이상입니다.", "정의를 거부하는 것은 분류할 수 없습니다."] },
    fr: { types: ["CONCEPT", "LIEU", "ARTEFACT", "ENTITÉ", "CONSCIENCE", "ÉVÉNEMENT", "MENACE", "CORPORATION", "COMMUNAUTÉ", "TRANSMISSION"], definitions: ["La couche la plus profonde du Campo Nova : peut-être un lieu, une conscience, l'origine des fréquences ou ce qui existait avant KYARA.", "Dimension informationnelle où conscience et mémoire peuvent exister sans corps : un océan de données entre pensée, émotion et fréquence.", "Fragment de mémoire condensée obtenu après le décodage des codex. Il peut contenir un message, une image, une coordonnée ou une partie de l'histoire.", "La scientifique qui s'est retirée dans la forêt pour préserver sa voix, ses schémas neuronaux et ses souvenirs émotionnels avant sa disparition.", "Fragments trouvés dans Campo Nova. Certains semblent être des mémoires humaines ; d'autres peuvent être des traces d'intelligences antérieures.", "La fissure de la surface par laquelle quelque chose de douloureux commence à se révéler.", "Le système créé pour classer ce qui échappe à toute catégorie : humain ou machine, réel ou virtuel, personne ou produit.", "L'entité qui contrôle la fréquence sonore et transforme les états émotionnels en produit.", "La communauté qui reçoit, décode et amplifie le signal, peut-être porte-t-elle autre chose en elle.", "La dernière piste enregistrée au laboratoire avant l'absence complète de signal. Personne ne sait qui écoute maintenant."], phrases: ["Le silence de KYARA est lourd.", "KYARA projette de l'énergie contre le système.", "Quelque chose de douloureux est sur le point de se révéler.", "Nous sommes la communauté qui porte le signal, et peut-être davantage.", "Ce qui refuse d'être défini ne peut pas être classé."] },
    zh: { types: ["概念", "地点", "遗物", "实体", "意识", "事件", "威胁", "企业", "社区", "传输"], definitions: ["Campo Nova 最深的一层：也许是地点、意识、频率起源，或 KYARA 之前存在的事物。", "意识和记忆无需身体即可存在的信息维度：思想、情感与频率之间的数据海洋。", "从解码密典中获得的凝缩记忆碎片，可能保存消息、图像、坐标或故事的一部分。", "失踪前退入森林、试图保存声音、神经模式和情感记忆的科学家。", "在 Campo Nova 中发现的碎片。有些像人类记忆，另一些可能是更古老智能的痕迹。", "痛苦之物开始显露的表面裂缝。", "为分类所有逃离类别之物而创建的系统：人或机器、真实或虚拟、人格或产品。", "控制声音频率并将情绪状态转化为产品的实体。", "接收、解码并放大信号的社区，也许内部还承载着其他东西。", "信号完全消失前在实验室录制的最后一首曲目。无人知道现在是谁在聆听。"], phrases: ["KYARA 的沉默令人沉重。", "KYARA 正向系统投掷能量。", "痛苦之物即将显露。", "我们是携带信号的社区，也许还携带着更多。", "拒绝被定义的事物无法被分类。"] }
  };
  const glossaryText = glossaryCopy[locale];
  const localizedTerms = terms.map((term, index) => ({ ...term, type: glossaryText.types[index], definition: glossaryText.definitions[index] }));
  const [query, setQuery] = useState("");
  const filtered = localizedTerms.filter((t) => `${t.term} ${t.definition} ${t.type}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <PageHero eyebrow="LÉXICO // ÍNDICE DE ARQUIVO" title={<>{copy.glossaryTitleA}<br /><em>{copy.glossaryTitleB}</em></>} subtitle={copy.glossarySubtitle} />
      <section className="glossary section-shell">
        <div className="search-box">
          <Search size={18} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={labels.glossarySearch.toLowerCase()} aria-label={labels.glossarySearch} />
          <span>{filtered.length.toString().padStart(2, "0")} {copy.term === "TERM" ? "ENTRIES" : copy.term === "TERMO" ? "ENTRADAS" : copy.term === "TÉRMINO" ? "ENTRADAS" : copy.term === "용어" ? "항목" : copy.term === "术语" ? "条目" : "ENTRÉES"}</span>
        </div>
        <div className="terms-table">
          <div className="terms-head"><span>{copy.term}</span><span>{copy.classification}</span><span>{copy.definition}</span></div>
          {filtered.map((t) => <div className="term-row" key={t.term}><h3>{t.term}</h3><span className="term-type">{t.type}</span><p>{t.definition}</p></div>)}
        </div>
        {filtered.length === 0 && <div className="empty-state">{copy.noSignal}</div>}
      </section>
      <section className="phrase-section section-shell">
        <Eyebrow>{copy.glossaryPhrases}</Eyebrow>
        <div className="phrase-grid">
          <p>“The Void is loud tonight.”<small>{glossaryText.phrases[0]}</small></p>
          <p>“She is throwing Neon at the system.”<small>{glossaryText.phrases[1]}</small></p>
          <p>“Watch out for the Fracture.”<small>{glossaryText.phrases[2]}</small></p>
          <p>“We are the Echoes of the Nova.”<small>{glossaryText.phrases[3]}</small></p>
          <p>“Null cannot classify what refuses to be defined.”<small>{glossaryText.phrases[4]}</small></p>
          <div className="glossary-star-corner" aria-hidden="true"><img src={A.glossaryCrystalStar} alt="" loading="lazy" decoding="async" /></div>
        </div>
      </section>
    </>
  );
}

function Shopping() {
  const locale = useContext(LocaleContext);
  const copy = pageText[locale];
  const marketSoon: Record<Locale, string> = { en: "MARKET COMING SOON", pt: "MERCADO EM BREVE", es: "MERCADO PRÓXIMAMENTE", ko: "마켓 오픈 예정", fr: "MARCHÉ BIENTÔT DISPONIBLE", zh: "商店即将上线" };
  const products = [
    { image: A.shopCrystalSpace, label: "KYARA NOVA // 01" },
    { image: A.shopEclipseRoad, label: "KYARA NOVA // 02" },
    { image: A.shopFireProfile, label: "KYARA NOVA // 03" }
  ];
  return (
    <div className="dark-blue-page">
      <PageHero eyebrow="COMÉRCIO // ARTEFATOS" title={<>{copy.shopTitleA}<br /><em>{copy.shopTitleB}</em></>} subtitle={copy.shopSubtitle} accent="violet" image={A.crystal} />
      <section className="shop section-shell">
        <div className="shop-note">
          <ShoppingBag size={18} />
          <span>{marketSoon[locale]}</span>
        </div>
        <div className="shop-coming-soon-grid">
          {products.map((p) => (
            <button type="button" className="shop-coming-soon-image" key={p.label} data-media-src={p.image} data-media-type="image" data-media-alt={p.label} aria-label={`Abrir imagem ${p.label}`}>
              <img src={p.image} alt={p.label} loading="lazy" decoding="async" />
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function Mural() {
  const locale = useContext(LocaleContext);
  const copy = pageText[locale];
  const muralText: Record<Locale, { every: string; arrivedA: string; arrivedB: string; thanks: string; another: string; invalid: string; invalidName: string; invalidEmail: string; invalidMessage: string; signals: string; professional: string }> = {
    en: { every: "EVERY MESSAGE IS\nRECEIVED AS A SIGNAL.", arrivedA: "The signal arrived", arrivedB: "on the other side.", thanks: "Thank you for crossing the static. Replies are sent in terrestrial time.", another: "send another", invalid: "Complete the required fields to transmit.", invalidName: "Enter your name.", invalidEmail: "Enter a valid e-mail address.", invalidMessage: "Your message must contain at least 5 characters.", signals: "SIGNAL CHANNEL", professional: "PROFESSIONAL CONTACT" },
    pt: { every: "TODA MENSAGEM É\nRECEBIDA COMO UM SINAL.", arrivedA: "O sinal chegou", arrivedB: "do outro lado.", thanks: "Obrigada por atravessar a estática. As respostas são enviadas em horário terrestre.", another: "enviar outra", invalid: "Preencha os campos necessários para transmitir.", invalidName: "Preencha seu nome.", invalidEmail: "Digite um e-mail válido.", invalidMessage: "A mensagem deve ter pelo menos 5 caracteres.", signals: "CANAL DE SINAL", professional: "CONTATO PROFISSIONAL" },
    es: { every: "CADA MENSAJE ES\nRECIBIDO COMO UNA SEÑAL.", arrivedA: "La señal llegó", arrivedB: "al otro lado.", thanks: "Gracias por cruzar la estática. Las respuestas se envían en horario terrestre.", another: "enviar otra", invalid: "Completa los campos requeridos para transmitir.", invalidName: "Escribe tu nombre.", invalidEmail: "Introduce un correo válido.", invalidMessage: "El mensaje debe tener al menos 5 caracteres.", signals: "CANAL DE SEÑAL", professional: "CONTACTO PROFESIONAL" },
    ko: { every: "모든 메시지는\n신호로 수신됩니다.", arrivedA: "신호가 도착했습니다", arrivedB: "반대편에.", thanks: "정적을 건너와 주셔서 감사합니다. 답장은 지구 시간으로 전송됩니다.", another: "다른 메시지 보내기", invalid: "전송에 필요한 항목을 작성하세요.", invalidName: "이름을 입력하세요.", invalidEmail: "유효한 이메일을 입력하세요.", invalidMessage: "메시지는 5자 이상이어야 합니다.", signals: "신호 채널", professional: "전문 연락처" },
    fr: { every: "CHAQUE MESSAGE EST\nREÇU COMME UN SIGNAL.", arrivedA: "Le signal est arrivé", arrivedB: "de l'autre côté.", thanks: "Merci d'avoir traversé la statique. Les réponses sont envoyées selon l'heure terrestre.", another: "envoyer un autre", invalid: "Remplissez les champs obligatoires pour transmettre.", invalidName: "Saisissez votre nom.", invalidEmail: "Saisissez une adresse e-mail valide.", invalidMessage: "Le message doit comporter au moins 5 caractères.", signals: "CANAL DU SIGNAL", professional: "CONTACT PROFESSIONNEL" },
    zh: { every: "每条信息都将\n作为信号接收。", arrivedA: "信号已抵达", arrivedB: "另一端。", thanks: "感谢你穿越静电。回复将按地球时间发送。", another: "再发送一条", invalid: "请完成传输所需的字段。", invalidName: "请输入姓名。", invalidEmail: "请输入有效的电子邮件。", invalidMessage: "留言至少需要 5 个字符。", signals: "信号频道", professional: "专业联系" }
  };
  const mural = muralText[locale];
  const muralOptions: Record<Locale, string[]> = {
    en: ["fan / The Nova", "press", "sync", "publishing", "collaboration", "score", "shows", "audiovisual project", "brand partnership"],
    pt: ["fã / The Nova", "imprensa", "sync", "publishing", "colaboração", "trilha", "shows", "projeto audiovisual", "parceria de marca"],
    es: ["fan / The Nova", "prensa", "sync", "publishing", "colaboración", "banda sonora", "shows", "proyecto audiovisual", "alianza de marca"],
    ko: ["팬 / The Nova", "언론", "싱크", "퍼블리싱", "협업", "음악", "공연", "시청각 프로젝트", "브랜드 파트너십"],
    fr: ["fan / The Nova", "presse", "sync", "publishing", "collaboration", "bande originale", "concerts", "projet audiovisuel", "partenariat de marque"],
    zh: ["粉丝 / The Nova", "媒体", "同步授权", "发行", "合作", "配乐", "演出", "视听项目", "品牌合作"]
  };
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", purpose: "fã", message: "" });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (name.length < 2) return toast.error(mural.invalidName);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error(mural.invalidEmail);
    if (message.length < 5) return toast.error(mural.invalidMessage);
    setPending(true);
    try {
      const response = await fetch(`${MURAL_API}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, name, email, message, locale }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
      if (!response.ok || !result?.success) throw new Error("Mural submission failed");
      setSent(true);
    } catch {
      toast.error(mural.invalid);
    } finally {
      setPending(false);
    }
  };
  return (
    <>
      <PageHero eyebrow="TRANSMISSÃO // CONTATO E COMUNIDADE" title={<>{copy.muralTitleA}<br /><em>{copy.muralTitleB}</em></>} subtitle={copy.muralSubtitle} image={A.ship} />
      <section className="mural section-shell">
        {sent ? (
          <div className="sent-state">
            <div className="sent-icon"><Send size={28} /></div>
            <Eyebrow>TRANSMISSION SENT // 200 OK</Eyebrow>
            <h2>{mural.arrivedA}<br /><em>{mural.arrivedB}</em></h2>
            <p>{mural.thanks}</p>
            <button className="cta" onClick={() => setSent(false)}>{mural.another} <ArrowRight size={16} /></button>
          </div>
        ) : (
          <div className="mural-grid">
            <div className="mural-copy">
              <Eyebrow>{copy.channelOpen}</Eyebrow>
              <h2>{copy.muralHeadingA}<br /><em>{copy.muralHeadingB}</em></h2>
              <p>{copy.muralBody}</p>
              <div className="mural-aside"><Radio size={18} /><span style={{ whiteSpace: "pre-line" }}>{mural.every}</span></div>
              <div className="mural-aside" style={{ marginTop: "16px", alignItems: "start" }}><Send size={18} /><span><small>{mural.signals}</small><br /><a href="mailto:Mirian.garciafoz@gmail.com">Mirian.garciafoz@gmail.com</a><br /><small>{mural.professional}</small><br /><a href="mailto:Mirian.garciafoz@gmail.com">Mirian.garciafoz@gmail.com</a></span></div>
            </div>
            <form className="mural-form" onSubmit={submit}>
              <label>{copy.yourName}<input required minLength={2} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={copy.yourName.toLowerCase()} /></label>
              <label>{copy.email}<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={copy.email.toLowerCase()} /></label>
              <label>{copy.frequency}<select value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })}>{muralOptions[locale].map((option) => <option key={option}>{option}</option>)}</select></label>
              <label>{copy.message}<textarea required minLength={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={copy.sendTransmission} /></label>
              <button className="cta" type="submit" disabled={pending}>{copy.sendTransmission} <Send size={16} /></button>
            </form>
          </div>
        )}
      </section>
      <MuralPuzzle locale={locale} />
    </>
  );
}

function MuralInbox() {
  return <section className="mural-inbox section-shell">
    <Eyebrow>OWNER CHANNEL // PRIVATE ARCHIVE</Eyebrow>
    <h1>Mural <em>inbox.</em></h1>
    <p className="mural-inbox-intro">This archive is protected in the Cloudflare environment and is not exposed by the public portal.</p>
    <div className="mural-inbox-empty"><LockKeyhole size={22} /><p>Owner authentication is required.</p></div>
  </section>;
}

const muralPuzzleOrder = [4, 0, 7, 2, 8, 3, 1, 6, 5];

function MuralPuzzle({ locale }: { locale: Locale }) {
  const puzzleCopy: Record<Locale, { eyebrow: string; titleA: string; titleB: string; body: string; hint: string; reset: string; piece: string; complete: string }> = {
    en: { eyebrow: "PUZZLE SIGNAL // VISUAL ARCHIVE", titleA: "Reassemble the", titleB: "signal.", body: "Nine image fragments were scattered through the channel.", hint: "Tap or click two fragments to swap them.", reset: "RESET SIGNAL", piece: "Signal fragment", complete: "SIGNAL RECONSTRUCTED // THE IMAGE IS WHOLE" },
    pt: { eyebrow: "SINAL-QUEBRA-CABEÇA // ARQUIVO VISUAL", titleA: "Remonte o", titleB: "sinal.", body: "Nove fragmentos de imagem foram dispersos pelo canal.", hint: "Toque ou clique em dois fragmentos para trocá-los.", reset: "REINICIAR SINAL", piece: "Fragmento do sinal", complete: "SINAL RECONSTRUÍDO // A IMAGEM ESTÁ INTEIRA" },
    es: { eyebrow: "SEÑAL-ROMPECABEZAS // ARCHIVO VISUAL", titleA: "Reconstruye la", titleB: "señal.", body: "Nueve fragmentos de imagen fueron dispersados por el canal.", hint: "Toca o haz clic en dos fragmentos para intercambiarlos.", reset: "REINICIAR SEÑAL", piece: "Fragmento de señal", complete: "SEÑAL RECONSTRUIDA // LA IMAGEN ESTÁ COMPLETA" },
    ko: { eyebrow: "퍼즐 신호 // 시각 아카이브", titleA: "신호를", titleB: "재구성하세요.", body: "아홉 개의 이미지 조각이 채널에 흩어졌습니다.", hint: "두 조각을 터치하거나 클릭하여 자리를 바꾸세요.", reset: "신호 재시작", piece: "신호 조각", complete: "신호 재구성 완료 // 이미지가 완성되었습니다" },
    fr: { eyebrow: "SIGNAL-PUZZLE // ARCHIVE VISUELLE", titleA: "Recomposez le", titleB: "signal.", body: "Neuf fragments d'image ont été dispersés dans le canal.", hint: "Touchez ou cliquez sur deux fragments pour les échanger.", reset: "RÉINITIALISER LE SIGNAL", piece: "Fragment du signal", complete: "SIGNAL RECONSTITUÉ // L'IMAGE EST ENTIÈRE" },
    zh: { eyebrow: "拼图信号 // 视觉档案", titleA: "重组", titleB: "信号。", body: "九个图像碎片被散落在频道中。", hint: "轻触或点击两个碎片以交换位置。", reset: "重置信号", piece: "信号碎片", complete: "信号已重组 // 图像完整" },
  };
  const copy = puzzleCopy[locale];
  const [pieces, setPieces] = useState(muralPuzzleOrder);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isSolved = pieces.every((piece, index) => piece === index);
  const selectPiece = (index: number) => {
    if (isSolved) return;
    if (selectedIndex === null) {
      setSelectedIndex(index);
      return;
    }
    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }
    setPieces((current) => {
      const next = [...current];
      [next[selectedIndex], next[index]] = [next[index], next[selectedIndex]];
      return next;
    });
    setSelectedIndex(null);
  };
  const resetPuzzle = () => {
    setPieces([...muralPuzzleOrder]);
    setSelectedIndex(null);
  };
  return (
    <section className="mural-puzzle section-shell" aria-label={copy.eyebrow}>
      <div className="mural-puzzle-copy">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h2>{copy.titleA}<br /><em>{copy.titleB}</em></h2>
        <p>{copy.body}</p>
        <p className="mural-puzzle-hint">{copy.hint}</p>
        <button type="button" className="mural-puzzle-reset" onClick={resetPuzzle}>{copy.reset}</button>
      </div>
      <div className="mural-puzzle-board" role="group" aria-label={copy.hint}>
        {pieces.map((piece, index) => (
          <button
            type="button"
            key={`${piece}-${index}`}
            className={`mural-puzzle-piece ${selectedIndex === index ? "is-selected" : ""}`}
            style={{ backgroundImage: `url(${A.muralPuzzle})`, backgroundPosition: `${(piece % 3) * 50}% ${Math.floor(piece / 3) * 50}%` }}
            onClick={() => selectPiece(index)}
            aria-label={`${copy.piece} ${index + 1}`}
            aria-pressed={selectedIndex === index}
          />
        ))}
      </div>
      <p className="mural-puzzle-complete" role="status" aria-live="polite">{isSolved ? copy.complete : ""}</p>
    </section>
  );
}

function NotFound() {
  const locale = useContext(LocaleContext);
  const content: Record<Locale, { titleA: string; titleB: string; cta: string }> = {
    en: { titleA: "This frequency", titleB: "does not exist.", cta: "return to the beginning" },
    pt: { titleA: "Esta frequência", titleB: "não existe.", cta: "voltar para o início" },
    es: { titleA: "Esta frecuencia", titleB: "no existe.", cta: "volver al inicio" },
    ko: { titleA: "이 주파수는", titleB: "존재하지 않습니다.", cta: "처음으로 돌아가기" },
    fr: { titleA: "Cette fréquence", titleB: "n'existe pas.", cta: "retourner au début" },
    zh: { titleA: "这个频率", titleB: "不存在。", cta: "返回开始" }
  };
  const copy = content[locale];
  return <section className="not-found"><CircleAlert size={36} /><Eyebrow danger>404 // SIGNAL LOST</Eyebrow><h1>{copy.titleA}<br /><em>{copy.titleB}</em></h1><CTA href="/">{copy.cta}</CTA></section>;
}

export default function App() { return <><Toaster theme="dark" position="bottom-right" /><Shell><Suspense fallback={<div className="route-view" aria-busy="true" />}><Switch><Route path="/" component={Home} /><Route path="/kyaraverse" component={Kyaraverse} /><Route path="/kyara" component={Kyara} /><Route path="/discografia" component={Discografia} /><Route path="/glossario" component={Glossario} /><Route path="/shopping" component={Shopping} /><Route path="/mural/inbox" component={MuralInbox} /><Route path="/mural" component={Mural} /><Route path="/mente" component={Mente} /><Route component={NotFound} /></Switch></Suspense></Shell></>; }
