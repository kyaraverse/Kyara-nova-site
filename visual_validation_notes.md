# Validação visual — 20/08/2026

As capturas desktop das oito rotas e as capturas mobile de `/` e `/discografia` foram concluídas sem falhas de renderização reportadas pelo servidor. A tela inicial de transmissão aparece de forma consistente, com composição central, estrela ciano, tipografia serifada e botão de início legível em desktop e mobile. O estado da transmissão inicial é controlado por sessão; por isso, a captura direta de cada rota mostra novamente o gate antes da ativação, e não indica erro de roteamento.

A validação automatizada complementar passou em TypeScript, Vitest e build. A abertura interativa do easter egg exige clique em um navegador; o código foi revisado para remover `speechSynthesis`, usar somente `A.eggAudioEn`, manter imagem e vídeo por locale, pausar mídia no fechamento e usar controles nativos sob demanda.

## Mídia crítica

Os endpoints do preview responderam `200` para a imagem do easter egg (`image/png`), o áudio original (`audio/wav`), o vídeo em inglês do egg (`video/mp4`), as duas faixas da Discografia (`audio/mpeg`) e o terceiro vídeo do arquivo (`video/mp4`).

## Incidente de abertura — 20/08/2026

O servidor foi reiniciado e voltou a responder normalmente. As rotas `/`, `/discografia`, `/kyara` e `/mural` responderam HTTP 200 em menos de 0,11 s no preview. As capturas mobile de `/` e `/discografia` renderizaram a tela inicial sem erro visual. Também foi fortalecida a inicialização com `window.matchMedia?.(...)?.matches ?? false`, evitando falha em WebViews sem `matchMedia`.

## Reprodução controlada no navegador — 20/08/2026

A sessão real do navegador abriu o gate inicial, identificou o botão `START TRANSMISSION` e, após o clique, avançou para a Home completa sem tela vazia ou travamento. O shell carregou cabeçalho, controles de áudio, terminal, três cartões de vídeo, decodificador, estrela do easter egg e rodapé. Os controles de áudio e o seletor de idioma ficaram acessíveis na sessão aberta.

## Discografia em sessão ativada — 20/08/2026

Na rota `/discografia`, o gate também abriu e, após o clique, a página carregou sem congelamento. O navegador expôs as duas faixas (`Glitched Consciousness` e `Archive Signal II`), o player de prévia de 30 segundos, o controle de mute, o vídeo visual associado e o link Spotify atribuído a MG Mi.

## Rota Kyara em sessão ativada — 20/08/2026

A rota `/kyara` abriu o gate normalmente e avançou para o conteúdo completo após o clique. O navegador carregou a imagem de perfil, alternância NATURAL/PERFORMANCE, arquivo visual, seção de Discografia e rodapé sem tela vazia ou erro de runtime visível.

## Rota Mural em sessão ativada — 20/08/2026

A rota `/mural` abriu e avançou após o clique de transmissão. O navegador mostrou o formulário com nome, e-mail, frequência, mensagem e botão de envio, além do rodapé e dos links sociais, sem congelamento ou tela vazia.

## Rota Mente em sessão ativada — 20/08/2026

A rota `/mente` abriu e avançou normalmente. A narrativa preservada, as imagens de Foz do Iguaçu, Mirian Garcia, Florianópolis, Ponte Hercílio Luz e Miucha, além do rodapé, foram carregados sem travamento ou tela vazia.

## Rota Kyaraverse em sessão ativada — 20/08/2026

A rota `/kyaraverse` avançou normalmente após o clique. O portal carregou o manifesto, índice de capítulos, cinco capítulos do lore, regras do Campo Nova e rodapé sem congelamento ou tela vazia.

## Rota Shop em sessão ativada — 20/08/2026

A rota `/shopping` abriu e avançou normalmente. O catálogo de artefatos, as imagens, os três botões ADICIONAR, o rodapé e os links sociais foram carregados sem travamento.

## Rota Glossário em sessão ativada — 20/08/2026

A rota `/glossario` avançou normalmente após o clique. O navegador mostrou o campo de busca traduzido, dez entradas do Gloss Nova, frases e rodapé sem travamento.

## Validação do Easter Egg com Tela Azul e Teste Técnico — 20/08/2026

O modal do easter egg foi aberto através do clique na estrela. A imagem exibida é a nova tela azul de sistema com o teste técnico e códigos em vermelho brilhante (estilo CRT / monospaced), acompanhada do vídeo por idioma, do texto descodificado e do player de áudio original da Dra. Kraush sem travamento.

## Auditoria de contatos e Discografia — atualização

No Mural, a sessão de navegador confirmou que apenas `knova@kyraverse.com` e `MG@kyraverse.com` aparecem como contatos públicos e usam links `mailto:`. O rodapé exibiu somente os destinos Spotify oficial e Instagram.

Na Discografia, a seleção de Português atualizou os títulos, detalhes das doze faixas, controles de prévia e links de streaming. O player incorporado do Spotify foi confirmado como recurso sob demanda: nenhum iframe é carregado antes da interação, e a prévia da faixa selecionada surge depois do acionamento.

No Kyaraverse, a abertura do gate e o carregamento dos cinco capítulos foram verificados novamente no navegador. A rota abriu sem tela vazia, os controles do shell permaneceram acessíveis e os capítulos mantiveram sua narrativa em Português como esperado para o locale selecionado.

Após alternar a mesma rota para Inglês, o hero, manifesto complementar, os cinco títulos/capítulos e as regras foram atualizados para o idioma escolhido. Não permaneceu conteúdo narrativo em Português nos blocos auditados.

No Glossário, a validação em Inglês confirmou títulos, busca, classificações, dez definições e frases localizados. A troca subsequente para Espanhol atualizou os mesmos elementos no navegador, sem erro de renderização ou texto residual em Português nas definições.

Na Discografia em Espanhol, as 12 faixas, descrições, links oficiais e botões `COMPARTIR` foram exibidos com labels acessíveis. O navegador de teste não expôs Web Share API, mas disponibilizou clipboard; o clique de compartilhamento da primeira faixa confirmou o fallback seguro de cópia de link sem publicar conteúdo em redes sociais.

A rota `/mente` foi aberta depois da extração para um módulo sob demanda. Após o gate, o navegador carregou a narrativa completa, imagens de Foz do Iguaçu, Mirian Garcia, Ponte Hercílio Luz e Miucha sem tela vazia, preservando a composição visual original.

A transmissão inicial foi persistida no armazenamento local após o clique. Em seguida, uma navegação direta para `/kyaraverse` abriu a rota imediatamente, sem repetir o gate, enquanto manteve o idioma Espanhol e o conteúdo de lore localizado. Isso reduz a interrupção e o tempo percebido ao trocar páginas na mesma sessão.

## Auditoria final da Home em Espanhol — 21/08/2026

Com o gate já persistido, a Home abriu diretamente, sem repetição da tela de transmissão. O navegador confirmou o seletor em Espanhol, o hero localizado, o bloco de floresta, terminal, arquivo, codex, fase lunar e chamada final. Os últimos trechos editoriais fixos do bloco de floresta e do estado de sinal foram localizados; as expressões técnicas deliberadamente mantidas em Inglês seguem como parte do vocabulário do universo.

## Discografia e viewport móvel — 21/08/2026

A Discografia foi reaberta em sessão de navegador já ativada e exibiu as 12 faixas, os links individuais do Spotify e os 12 controles `COMPARTIR` em Espanhol. O acionamento do primeiro botão foi testado sem abertura de rede social; o fluxo permanece no fallback local de compartilhamento. A captura full-page móvel sem conteúdo decorre do gate de transmissão ser um elemento fixo, removido propositalmente da captura full-page pela ferramenta de inspeção. Como correção preventiva de toque, as ações das faixas em telas de até 620 px agora possuem altura mínima de 44 px, foco visível e reorganização para duas colunas de ações.

## Evidência móvel da Discografia — 21/08/2026

Uma sessão Chromium foi aberta com viewport de 375×812 px e sem `Web Share`. A navegação encontrou exatamente 12 linhas, 12 botões de compartilhamento e 12 links Spotify. O primeiro botão recebeu foco com contorno sólido, mediu 44 px de altura e acionou corretamente o fallback de clipboard, copiando o link oficial da faixa `The Silence`; o feedback de cópia foi detectado na interface. A validação eliminou a lacuna de evidência móvel do checklist.

## Egg compacto e localizado — 21/08/2026

Na Home em Espanhol, o clique na estrela abriu um painel compacto imediatamente acima do gatilho. O conteúdo é agora uma tela branca com moldura vermelha e tipografia monoespaçada vermelha, sem vídeo e sem imagem de caveira. A mensagem apareceu em Espanhol, o botão de áudio original da Dra. Kraush permaneceu acessível e o painel não bloqueou o restante da página.

## Mural mobile e idioma padrão — 21/08/2026

Uma captura full-page em 375×812 px confirmou que o Mural usa Inglês como idioma inicial numa sessão sem preferência persistida. A imagem do hero preencheu toda a largura, sem a faixa ou o corte vertical visível anteriormente na direita. A hierarquia de título, texto, formulário e rodapé permaneceu legível no viewport estreito.

Uma segunda inspeção visual em 375×812 px confirmou explicitamente que o fundo do hero alcança ambas as bordas do viewport de modo contínuo. Não há repetição, coluna vazia ou corte vertical à direita; o formulário e o rodapé começam somente após o encerramento natural do hero.

## Discografia mobile — catálogo atualizado — 21/08/2026

Em 375×812 px, as 12 faixas renderizaram em sequência, com os novos títulos, descrições e durações. O catálogo mostrou a duração total de 45:13 e preservou, em cada faixa, a ação de prévia, o link Spotify e o controle de compartilhar. A seção de prévia ficou isolada após a lista, evitando o carregamento antecipado do player.

Uma validação de interação em 375 px selecionou `SILENCE`, encontrou o comando de carregar a prévia e confirmou a criação do iframe `open.spotify.com/embed/track/`. O fluxo sob demanda permanece funcional no mobile e não carrega o player antes da solicitação.

## Auditoria dos idiomas e do egg — 21/08/2026

Uma sessão nova iniciou em Inglês após a remoção da preferência local. Em seguida, EN, PT, ES, KO, FR e ZH foram aplicados por navegação com a preferência persistida. Em todas as seis versões, o seletor refletiu o locale solicitado e a estrela abriu o egg. As mensagens do egg foram exibidas nos respectivos idiomas; o título em Inglês da Home foi preservado intencionalmente como frase de lore da identidade do projeto.

## Ordem oficial de NOVA I — 21/08/2026

A sequência foi confirmada combinando a página pública do álbum no Spotify, que apresenta os cinco primeiros títulos, e as capturas da lista oficial do aplicativo Spotify fornecidas pela criadora, que mostram a continuação e os títulos finais. A ordem aplicada localmente é: `SILENCE`, `ERROR 404`, `GLASS SKIN`, `NOVA I`, `WIRED HEART`, `ZERO`, `SYNTHETIC TEARS`, `AWAKE`, `PROTOCOL`, `SHADOW SELF`, `UPLOAD` e `THE END OF THE LINE`. A validação da rota Discografia confirmou essa sequência, os 12 links de faixa e os 12 acionadores individuais de prévia.

## Novos ativos exclusivos — 21/08/2026

Foram carregados e distribuídos oito novos ativos fornecidos pela criadora, sem reutilizar a mesma imagem entre as páginas atualizadas. A Home recebeu a composição cósmica e a estrada de eclipse; Kyaraverse recebeu o arquivo visual de codex; Kyara recebeu os retratos de lua e corredor; Discografia recebeu a composição de cockpit; e Shop substituiu duas imagens repetidas por arte de cidade lunar e por uma arte de erro de sistema. Capturas de Home, Kyaraverse, Kyara, Discografia e Shop confirmaram a renderização dos ativos; a verificação final de Shop também confirmou os três cards com imagens distintas.

## Revisão editorial final — 21/08/2026

As rotas Home, Kyaraverse, Kyara, Discografia, Shop, Glossário e Mural foram revisadas nos catálogos ativos. Capturas adicionais de Glossário e Mural em Chinês confirmaram campos, conteúdo, rótulos e rodapé no idioma selecionado. A nomenclatura de marca foi normalizada para `KYARA NOVA` em todos os catálogos da Discografia; uma regressão impede o retorno da capitalização inconsistente. A página Mente permanece preservada em Português, conforme solicitação expressa da criadora.

Uma auditoria automatizada navegou pelas sete rotas ativas (`/`, `/kyaraverse`, `/kyara`, `/discografia`, `/shopping`, `/glossario` e `/mural`) em Inglês, Espanhol, Coreano, Francês e Chinês, totalizando 35 verificações. Nenhum texto residual em Português foi detectado. A narrativa antes fixa da seção de desaparecimento em Kyara foi transformada em catálogo localizado nos seis idiomas; a rota 404 permanece coberta pela regressão de conteúdo por locale.

Na rota Kyara, os três parágrafos da seção de desaparecimento foram revisados e movidos para um catálogo específico de Inglês, Português, Espanhol, Coreano, Francês e Chinês, mantendo a mesma sequência editorial e a pontuação adequada a cada idioma. A designação `Dra. Kraush` foi padronizada nas menções visíveis; a marca `KYARA NOVA` foi normalizada nos textos da Discografia e protegida contra a grafia inconsistente por teste de regressão.

## Restauração visual e nova Discografia — 21/08/2026

A captura full-page de `/discografia` confirmou doze cartões de faixa com imagem individual, título, duração, frase oficial, ações de Spotify/compartilhamento e dois interlúdios de vídeo entre os blocos 1–5 e 6–10; as faixas 11–12 permanecem no encerramento. A captura de `/` confirmou o tema original de floresta escura com sinal ciano e o hero original restaurado. A captura de `/kyara` confirmou a paleta original e a composição visual existente. A captura de `/shopping` confirmou que a paleta azul-escura está restrita à Shop, conforme solicitado.

Em 375×812 px, a Discografia preservou o fluxo solicitado: cinco cartões, vídeo musical longo, cinco cartões, segundo vídeo musical longo e os dois cartões finais. As imagens, títulos, frases e ações permaneceram legíveis sem sobreposição; os vídeos mantiveram controles nativos e não foram iniciados automaticamente.

As capturas desktop pós-restauração de Kyaraverse, Glossário, Mural e Mente confirmaram as composições existentes: Kyaraverse, Glossário e Mural permaneceram com o fundo preto-floresta e acentos ciano/violeta originais; Mente manteve integralmente sua página clara independente. Não houve aplicação da paleta azul da Discografia/Shop nessas rotas.

## Interlúdios musicais longos — 21/08/2026

A nova captura desktop da Discografia confirmou a sequência solicitada de cinco faixas, interlúdio 01, mais cinco faixas, interlúdio 02 e duas faixas finais. Os dois interlúdios agora exibem seus acionadores de carregamento em vez de iniciar mídia automaticamente; depois do acionamento, o visual recebido repete como camada de imagem e o áudio completo correspondente toca por 2:58 e 2:55, respectivamente, com pausa e mute sob controle da pessoa usuária.

Em 375×812 px, os dois interlúdios mantiveram a mesma ordem, controles e hierarquia: os acionadores de música longa continuaram legíveis, os cartões de faixa não sofreram sobreposição e nenhuma mídia foi carregada ou reproduzida automaticamente.

## Otimização de artes da Discografia — 21/08/2026

As artes de cockpit e cidade lunar foram verificadas após codificação WebP: ambas preservaram cor, composição e nitidez em resolução máxima de 1920 px, apropriada para a visualização ampliada. Os arquivos passaram de 2,58 MB e 3,89 MB para aproximadamente 142 KB e 154 KB, respectivamente, reduzindo a transferência dessas duas imagens sem substituir seu conteúdo visual.

## Auditoria visual geral — 21/08/2026

As oito rotas foram capturadas em desktop depois da aplicação dos gatilhos de ampliação de mídia; Home, Discografia, Kyaraverse, Kyara, Shop, Glossário, Mural e Mente renderizaram sem erros visuais visíveis. Home e Mente, bem como a Discografia, foram conferidas em 375×812 px: a navegação permaneceu contida, os títulos não transbordaram e as composições originais foram preservadas. As verificações recentes de console e rede não apontaram novos erros ou respostas 4xx/5xx.

## Lightbox e preservação de ativos — 21/08/2026

Na Discografia, o navegador encontrou 12 botões explícitos de abertura de imagem, um por faixa. Um acionamento programático da primeira capa montou o elemento `.media-lightbox`; em seguida, a tecla Escape fechou o visualizador e devolveu a página ao estado normal. A página Mente foi comparada com o checkpoint original `4b29084a` e permanece idêntica. As imagens da página Mente participam do lightbox global do Shell por estarem renderizadas dentro do elemento `main`.

## Discografia — formato de extensões Spotify

A nova prévia foi capturada em desktop e mobile. A Discografia agora apresenta seis extensões oficiais do Spotify acompanhadas das frases oficiais, seguidas da primeira transmissão em vídeo; o segundo bloco reúne as seis faixas restantes e encerra na segunda transmissão em vídeo. Não há cartões ou fotos individuais de faixa.

## Auditoria final de imagens e lightbox

O diff de `App.tsx` contra o checkpoint aprovado `4b29084a` não apresentou diferenças nas referências de imagem das páginas gerais. A Home preserva `A.hero` e `A.city`; Kyara preserva os retratos, o arquivo de eclipse e a galeria aprovada; as demais rotas continuam usando os ativos já aprovados. Em uma simulação de toque na Home, a imagem principal abriu o `.media-lightbox` e a tecla Escape o fechou com êxito (`openedAfterTouch: true`, `closedAfterEscape: true`).

O registro por rota confirma: Home (`A.hero`, `A.city`); Kyaraverse (`A.aether`); Kyara (`A.portrait`, `A.full`, `A.close`, `A.kyaraExtra1–4`, `A.crystal`); Discografia (sem imagens individuais de faixa, por formato aprovado); Glossário (sem imagens); Shop (`A.crystal`, `A.city`, `A.aether`); Mural (sem imagens); Mente (ativos preservados no arquivo isolado). O Shell mantém apenas `A.star` no portão e no cabeçalho. No teste de toque do vídeo da Home, o elemento de vídeo foi encontrado, abriu um vídeo dentro do lightbox e foi fechado com Escape (`videoFound: true`, `openedVideo: true`, `closedAfterEscape: true`).

## Capas dos vídeos da Home — referências identificadas

`signal.png` apresenta a composição abstrata azul-ciano solicitada para a primeira posição. `error.png` é a composição com caveira, reservada para a terceira posição. A referência verde do vídeo central será confirmada entre os ativos restantes antes da alteração do código.

A inspeção dos ativos restantes confirmou que `cosmic-eye.png` apresenta a composição azul-esverdeada a ser usada na posição central. `dog-crystal.png` não será usado, pois retrata a imagem de um cão e não corresponde à orientação recebida.

## Egg — início automático de áudio

O teste programático confirmou que o clique abre o painel do egg e que o elemento de áudio já está presente no DOM. Como a reprodução de áudio precisa ser validada com uma interação confiável do navegador, a execução iniciada programaticamente manteve o áudio pausado; a checagem seguinte utilizará um clique real na estrela.

O navegador confirmou que o botão da estrela e os controles do egg permanecem acessíveis na Home. A repetição do teste de reprodução será executada depois de fechar o painel atual e clicar novamente na estrela com uma interação confiável.

A interação real na estrela foi repetida no navegador com o painel já aberto. A última confirmação de estado do elemento de áudio será registrada separadamente, sem alterar o comportamento de reprodução sob interação da pessoa usuária.

Após o clique real na estrela, o elemento de áudio confirmou reprodução em andamento (`paused: false`, `currentTime: 22.10`, `readyState: 4`, `ended: false`). Assim, a mensagem e a voz original da Dra. Kraush começam juntas no primeiro clique da estrela.

Na Home, a inspeção inicial mostrou que as duas novas fotos finais permaneciam fora da janela de carregamento por usarem lazy loading. O carregamento foi ajustado para antecipado e de baixa prioridade, preservando a abertura rápida da página e garantindo que as fotos estejam disponíveis ao chegar ao bloco final.

Após a recarga, ambas as fotos finais foram carregadas com sucesso antes da rolagem (`kyara-stage-neon`: 1356×1356; `kyara-codex-reader`: 1184×2096), confirmando a correção.

As capturas mobile confirmaram: a Home mostra as três capas distintas de vídeo e as duas novas fotos no final; a Shop não exibe preços, descrições ou produtos e apresenta a sequência recebida sob Mercado em breve; a Mente reduz o espaço inicial e mostra a nova foto autoral da Ponte Hercílio Luz após o ajuste de carregamento antecipado.

No fluxo responsivo, o acionador da estrela permanece no mesmo botão sem dependência de largura de tela. A interação confiável já demonstrou o início do áudio após a ativação, e as capturas mobile confirmam que o elemento permanece acessível no fim da Home, sem deslocar a interface.

Uma validação interativa real em Chromium com viewport emulado de 375×812 confirmou todas as ações sensíveis: a estrela abriu o egg e iniciou o áudio original (`open: true`, `playing: true`, `time: 0.61`); uma imagem da Shop abriu o lightbox (`shopLightbox: true`); e a foto autoral de Florianópolis na Mente também abriu o lightbox (`menteLightbox: true`).

## Auditoria pós-publicação

As oito rotas ativas foram revisadas em desktop e as rotas de maior densidade visual — Home, Shop e Mente — também foram verificadas em tela móvel. A checagem de console e rede não apontou erros recentes, falhas de carregamento ou respostas 4xx/5xx. Nenhum refinamento adicional foi confirmado nesta revisão; por isso, nenhuma alteração visual ou editorial foi aplicada.

## Otimização sem alteração de textos

O carregamento das fontes foi movido do CSS para o documento inicial, com conexões antecipadas aos domínios de fontes. A mudança preserva família tipográfica, pesos e todos os textos existentes, ao mesmo tempo em que evita que a importação de fonte atrase a leitura do CSS. TypeScript, 13 testes e build de produção passaram após a alteração.

Como refinamento adicional de interação, controles e links receberam `touch-action: manipulation`, reduzindo atrasos de toque sem alterar aparência ou conteúdo. As capturas em 375×812 confirmaram que a tela inicial permanece íntegra e legível em Home, Shop e Mente; a validação final voltou a passar em TypeScript, 13 testes e build.

## Abertura animada da Home

A Home recebeu uma animação curta de inicialização com a estrela, órbitas e leitura de sinal já existentes no universo. A verificação no navegador confirmou que o loader está presente, encerra automaticamente após a transição (`active: false`) e permanece com `pointer-events: none`, sem bloquear a navegação. Em viewport real de 375×812, ele surgiu ativo com 248 px de largura e, após a transição, ficou inativo e sem captura de toque. O CSS inclui escala mobile e desativa a animação quando a pessoa usuária prefere movimento reduzido.

O fechamento desktop foi confirmado no navegador com o loader ainda presente no DOM, porém inativo e sem captura de ponteiros (`active: false`, `pointerEvents: none`). A validação Chromium móvel em 375×812 registrou `appearing: {active: true, width: 248}` e `settled: {active: false, pointerEvents: none}`. Com `prefers-reduced-motion: reduce` emulado, as animações de órbita, estrela e varredura retornaram `none`, confirmando que a abertura respeita a preferência de movimento reduzido.

## Correções de mídia e arquivo visual — em validação

Após ativar a transmissão em uma sessão de navegador, a rota Kyara carregou normalmente com os controles de som ativos e o arquivo visual contendo seis entradas, incluindo as duas novas artes adicionadas. A verificação de layout mobile e da pausa automática do som ambiente continua pendente antes de qualquer publicação.

Na inspeção desktop subsequente, o arquivo visual exibiu as seis artes em uma grade de quatro colunas, com as duas novas imagens no segundo alinhamento e sem sobreposição com a seção seguinte. O arquivo visual segue dentro da área interativa global, portanto as imagens permanecem compatíveis com a abertura ampliada já existente.

Na Home, a sessão de navegador exibiu as duas imagens finais novas (`KYARA NOVA sob a lua` e `KYARA NOVA entre cristais`) no lugar das referências anteriores. O som ambiente foi ativado pelo controle global para a sequência de validação de pausa automática.

Antes do acionamento da estrela, a inspeção direta confirmou `ambientPlaying: true` e o botão do easter egg disponível no fim da Home. A estrela, as novas duas artes e o rodapé permaneceram legíveis na composição desktop.

O clique real na estrela abriu o egg e mudou o controle do cabeçalho para `PLAY`. A inspeção subsequente confirmou `ambientPaused: true`, `eggPlaying: true` e `headerShowsPlay: true`: a voz da Dra. Kraush iniciou corretamente enquanto o som ambiente foi pausado.

Em 375×812, a validação controlada confirmou a imagem de perfil da página Kyara em proporção `3 / 5`, com 285×474 px; o arquivo visual contém seis artes, incluindo exatamente duas novas. A estrela no Glossário está presente dentro da grade de frases, com 145×145 px e sem extrapolar seu contêiner. A Home exibe somente as duas novas imagens finais solicitadas. TypeScript, 16 testes e build de produção passaram após a remoção dos verificadores temporários.

## Mural — quebra-cabeça em validação

No navegador, a página Mural carregou com o formulário de contato preservado e, após ele, o novo bloco de quebra-cabeça. A árvore interativa expôs um controle de reinício e nove botões de fragmentos de sinal, permitindo a troca de peças por mouse ou toque; a validação visual detalhada e o teste de conclusão seguem pendentes.

A captura desktop confirmou a composição do painel: texto de apoio à esquerda e grade de três por três à direita, usando corretamente a imagem fornecida. Dois cliques em fragmentos distintos trocaram suas posições e removeram o estado de seleção, confirmando a interação por mouse sem afetar o formulário acima.

## Discografia — vídeos corretos em validação

A Discografia exibiu seis faixas antes do primeiro interlúdio e seis faixas antes do segundo, preservando a ordem solicitada. O primeiro controle de carregamento foi acionado na seção posterior à sexta faixa; a confirmação do arquivo de vídeo renderizado permanece pendente.

As capturas completas em 375×812 confirmaram que o Mural preserva o formulário e apresenta o quebra-cabeça de nove peças inteiro, legível e sem sobreposição antes do rodapé. A Discografia móvel manteve as seis primeiras faixas, primeiro interlúdio, seis faixas finais e segundo interlúdio em sequência vertical; os controles de carregamento permanecem acessíveis ao toque.

## Rodapé — créditos e contatos de 2026

As capturas de Home em desktop e 375×812 confirmaram que o rodapé continua organizado abaixo do manifesto, sem sobreposição. Ele agora mantém os dois ícones sociais vinculados, os créditos de Kyaraverse e MG Mi em 2026, a reserva de direitos e os dois e-mails solicitados. TypeScript, 17 testes e build passaram após a atualização.

## Links oficiais de MG Mi para Mente

Os endereços fornecidos foram conferidos antes da integração: o link do SoundCloud abre o perfil `MG Mi`; o Spotify abre o Web Player no identificador de artista enviado; e o Instagram direciona ao perfil `just.mg.mi`, protegido por autenticação na sessão de validação. Os três atalhos serão preservados exatamente como recebidos.

## Revisão de layout, links e pontuação

As capturas integrais de Mente, Home e Discografia confirmaram a composição preservada em telas amplas, a continuidade das duas paletas aprovadas e a permanência do rodapé sem sobreposições. A extensão de MG Mi ficou abaixo da seção de Miucha, com três atalhos em uma faixa própria. A auditoria de código preservou as descrições oficiais das faixas e removeu somente travessões dispensáveis das etiquetas e descrições de interface, usando vírgulas ou dois-pontos quando a estrutura exigia pontuação.

Em 375×812, Mente preservou sua sequência de imagens e a extensão de MG Mi em uma coluna acessível ao toque; Home manteve conteúdo, mídia e rodapé legíveis sem rolagem horizontal; e Discografia preservou as doze faixas e os dois interlúdios em sequência vertical. TypeScript, 18 testes e build de produção passaram após os ajustes.

## Revisão 1 de 3 — estrutura e estabilidade

O TypeScript, a suíte de regressão e o build de produção passaram com 20 testes. A caixa de entrada privada do Mural, a rota administrativa e o procedimento restrito foram incluídos na cobertura. Os únicos erros encontrados nos registros são mensagens HMR antigas, anteriores aos builds atuais, que compilam limpos; não há erro recente de navegador associado à versão em revisão.

## Revisão 2 de 3 — responsividade e acessibilidade

As capturas em desktop de Mural, `/mural/inbox`, Mente e Discografia confirmaram que o formulário e o quebra-cabeça preservam composição e áreas de interação, enquanto a rota privada não expõe registros a visitantes não autenticados. O arquivo de inbox mostra somente o aviso de acesso restrito na sessão pública. As seções e o rodapé continuam sem colisão visual, e Discografia mantém os dois blocos de seis faixas com seus interlúdios.

Em 375×812, o Mural mantém os campos do formulário e o tabuleiro de nove peças dentro da largura disponível; Mente preserva a nova faixa de plataformas de MG Mi; Discografia mantém os embeds em uma única coluna navegável; e `/mural/inbox` continua sem revelar conteúdo na sessão pública. Não houve rolagem horizontal nem sobreposição observável.

## Revisão 3 de 3 — desempenho e segurança

O formulário público do Mural recebeu limite de cinco transmissões por endereço e e-mail em janelas de quinze minutos, além da validação de campos já existente. A credencial de e-mail continua exclusivamente no servidor e não é exposta ao navegador. O build mantém os pacotes de React, animação, ícones e Mente separados; o chunk principal permanece acima do limiar recomendado, porém com 212 KB compactados, enquanto mídias e páginas pesadas seguem sob carregamento controlado. TypeScript, 21 testes e build passaram.

## Validação consolidada das rotas públicas

As oito rotas públicas foram renderizadas integralmente em desktop após a terceira passagem. Home, Discografia, Kyaraverse, Kyara, Shop, Glossário, Mural e Mente mantiveram a paleta correspondente, o rodapé global e a sequência de conteúdo sem cortes. A captura também confirmou que as artes configuradas como carregamento tardio permanecem reservando seus espaços, evitando deslocamento de layout enquanto o navegador prioriza a mídia visível.
