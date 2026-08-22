import { Cloud, Instagram, Radio } from "lucide-react";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow"><span className="eyebrow-mark">//</span>{children}</div>;
}

const image = {
  cataratas: "https://mural.kyaraverse.com/media/cataratas-iguacu_d3eb4d8c.webp",
  mirianMural: "https://mural.kyaraverse.com/media/mirian-mural_6f2eae90.webp",
  mirianFlorianopolis: "https://mural.kyaraverse.com/media/mirian-florianopolis_3294b2b4.webp",
  ponte: "https://mural.kyaraverse.com/media/ponte-hercilio-luz-autoral_e1379819.jpg",
  miucha: "https://mural.kyaraverse.com/media/miucha-studio_dbc2a966.webp",
};

export default function MentePage() {
  return (
    <div className="mente-page">
      <div className="mente-top">
        <Eyebrow>MENTE // A CRIADORA</Eyebrow>
        <h1>Antes do sinal,<br /><em>havia uma voz.</em></h1>
        <p>Antes da floresta, uma artista compondo entre o Paraná e Santa Catarina, tentando entender onde termina a ferramenta e começa uma nova forma de criação.</p>
      </div>
      <section className="mente-landmark mente-landmark-origin">
        <div className="mente-landmark-image"><img src={image.cataratas} alt="Cataratas do Iguaçu, em Foz do Iguaçu" loading="lazy" decoding="async" /></div>
        <div className="mente-landmark-copy"><Eyebrow>ORIGEM // FOZ DO IGUAÇU</Eyebrow><h2>Onde a água<br /><em>aprende a cair.</em></h2><p>Em Foz do Iguaçu, a força das correntezas une países e entrelaça culturas múltiplas.</p><span className="mente-credit">Imagem: Killerado BR / Wikimedia Commons · CC BY-SA 3.0</span></div>
      </section>
      <section className="essay essay-intro"><span className="essay-no">01</span><div><h2>Mirian Garcia</h2><p>Mirian Garcia é compositora, poetisa e criadora de universos artísticos. Nascida em Foz do Iguaçu (PR) e com trajetória construída em Santa Catarina, ela desenvolve projetos que atravessam música, poesia, audiovisual, branding e inteligência artificial — tratando a tecnologia não como substituta da arte, mas como expansão de sua linguagem.</p><p>Nos três anos em que cursou Ciências Sociais na UFSC, Mirian aproximou cultura, técnica e modos de existência, uma escuta que atravessa sua criação. No Kyaraverse, essa pesquisa se desenvolve na perspectiva crítica da pós-humanidade: em vez de imaginar a máquina como substituta do humano ou a emoção como dado, investiga como voz, corpo, memória e códigos participam, de forma relacional e situada, da produção de sentido; a arte surge como extensão sensível dessas relações e pergunta o que permanece humano quando a criação já não é produzida por um sujeito isolado.</p></div></section>
      <section className="mente-personal-archive"><div className="mente-personal-heading"><Eyebrow>ARQUIVO PESSOAL // MIRIAN GARCIA</Eyebrow><h2>Duas presenças<br /><em>antes do sinal.</em></h2><p>Entre memória, deslocamento e criação, a pessoa também faz parte do universo que constrói.</p></div><div className="mente-personal-grid"><figure><img src={image.mirianMural} alt="Mirian Garcia diante de um mural artístico" loading="lazy" decoding="async" /><figcaption>ARQUIVO 01 // A CIDADE COMO CADERNO</figcaption></figure><figure><img src={image.mirianFlorianopolis} alt="Mirian Garcia em Florianópolis" loading="lazy" decoding="async" /><figcaption>ARQUIVO 02 // CORPO EM TRÂNSITO</figcaption></figure></div></section>
      <section className="essay quote-essay"><blockquote>“Eu não pensava apenas em músicas isoladas. Pensava em conceitos, personagens, símbolos, narrativas — universos inteiros.”</blockquote><cite>— Mirian Garcia</cite></section>
      <section className="essay two-column-essay"><div><span className="essay-no">02</span><h2>Kyara não é apenas<br /><em>uma cantora virtual.</em></h2></div><div><p>KYARA NOVA é o centro de um universo narrativo em expansão: o Kyaraverse. Um espaço onde música, imagem, mitologia, tecnologia e filosofia se encontram.</p><p>Sua criação não parte da ideia de substituir a arte pela tecnologia, mas de ampliar o que a arte pode ser quando a imaginação humana encontra o infinito digital.</p></div></section>
      <section className="essay question-essay"><span className="eyebrow">A PERGUNTA NO CORAÇÃO DO KYARAVERSE</span><h2>Quando a arte começa a criar novas formas de existência, onde termina a ferramenta e começa a nova forma de artista?</h2></section>
      <section className="essay signature-essay"><p>Kyara Nova é a personagem.<br />NOVA é o despertar.<br />O Kyaraverse é o universo.<br /><em>E Mirian Garcia é a criadora humana que constrói a ponte entre esses mundos.</em></p></section>
      <section className="mente-landmark mente-landmark-bridge"><div className="mente-landmark-copy"><Eyebrow>TRAVESSIA // FLORIANÓPOLIS</Eyebrow><h2>Uma ponte entre<br /><em>mundos possíveis.</em></h2><p>Em Florianópolis, as águas calmas do mar desenham o movimento entre margens. Entre a ilha e o continente, a travessia se transforma em passagem entre a vida vivida e os universos que ainda estão por nascer.</p><span className="mente-credit">Ponte Hercílio Luz · Florianópolis, SC</span></div><div className="mente-landmark-image"><img src={image.ponte} alt="Ponte Hercílio Luz em Florianópolis" loading="eager" decoding="async" fetchPriority="low" /></div></section>
      <section className="miucha-studio-section"><div className="miucha-studio-copy"><Eyebrow>PRODUÇÃO // APOIO DE CAMPO</Eyebrow><h2>Miucha</h2><p>Apoio ao setor criativo e produção.</p><span className="mono-caption">PRESENÇA CONFIRMADA // ESTÚDIO 01</span></div><div className="miucha-studio-image"><img src={image.miucha} alt="Miucha em um estúdio musical" loading="lazy" decoding="async" /></div></section>
      <section className="mente-social-extension" aria-label="Canais oficiais de MG Mi"><Eyebrow>MG MI // CANAIS OFICIAIS</Eyebrow><div className="mente-social-links"><a href="https://open.spotify.com/artist/2Mdf6kCk9q7TZmogkYc28m?si=7vhyclPkRHabbdYC7lVx3g&utm_source=copy-link&sci=spotify%3Acard-config%3A1pHlnimJDFPlQNcxpdBs92" target="_blank" rel="noreferrer" aria-label="MG Mi no Spotify"><Radio size={17} /><span>Spotify</span></a><a href="https://www.instagram.com/just.mg.mi?igsi=MTljbnZsMDRoZnBjYQ==" target="_blank" rel="noreferrer" aria-label="MG Mi no Instagram"><Instagram size={17} /><span>Instagram</span></a><a href="https://soundcloud.com/mirian-kraiss-garcia?ref=clipboard&p=a&c=1&si=e890721f4b9d42999ec0aa987d882e4b&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" target="_blank" rel="noreferrer" aria-label="MG Mi no SoundCloud"><Cloud size={17} /><span>SoundCloud</span></a></div></section>
    </div>
  );
}
