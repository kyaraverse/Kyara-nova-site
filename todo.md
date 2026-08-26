# KYARA NOVA - Checklist Concluído

- [x] Restaurar a imagem de retrato de Kyara e o player de áudio original no modal do easter egg.
- [x] Validar funcionamento do vídeo, áudio e imagem sem travamentos.
- [x] Salvar e publicar o checkpoint final da versão restaurada.

# Plano corretivo integral

- [x] Estabilizar o easter egg, sua imagem, áudio original e carregamento do modal.
- [x] Corrigir os vídeos do site com controles de som On/Off e reprodução sob demanda.
- [x] Implementar faixas reais e prévias de 30 segundos na Discografia.
- [x] Completar os labels persistentes nos seis idiomas oficiais.
- [x] Adicionar links globais de streaming no rodapé de todas as páginas.
- [x] Validar rotas, mídia, desempenho, responsividade, TypeScript, testes e build.
- [x] Salvar checkpoint final somente após a validação da versão estável.

# Nova solicitação — compartilhamento da Discografia

- [x] Adicionar botões de compartilhamento social em cada faixa da Discografia.
- [x] Implementar Web Share API e fallback por cópia de link com feedback traduzido.
- [x] Validar em mobile a responsividade, foco, toque, acessibilidade, fallback de cópia, testes e build da funcionalidade: Chromium em 375×812 confirmou 12 ações Compartilhar e 12 links Spotify, foco sólido, altura de toque de 44 px e fallback de cópia.

# Incidente de estabilidade — abertura do app

- [x] Diagnosticar o travamento relatado na abertura do app.
- [x] Corrigir a causa sem reintroduzir problemas no easter egg, mídia ou Discografia.
- [x] Validar inicialização, console, rotas principais e desempenho antes de retomar o compartilhamento social.

# Incidente ampliado — egg, idiomas, estabilidade e imagens

- [x] Identificar e substituir a imagem incorreta do easter egg pelo ativo correto.
- [x] Reduzir o tempo de abertura do easter egg e eliminar travamentos do app.
- [x] Corrigir a troca real e persistente entre Inglês, Português, Espanhol, Coreano, Francês e Chinês.
- [x] Auditar imagens pesadas e melhorar a resolução das que suportarem upscale, mantendo versões otimizadas para web.
- [x] Validar visualmente e funcionalmente o easter egg após a nova imagem, confirmando que o asset final carregou no lugar do placeholder.
- [x] Medir e corrigir a abertura do easter egg após o clique, revalidando que não há travamento do app nem atraso perceptível.
- [x] Completar e verificar a tradução real das telas/labels restantes nos 6 idiomas, incluindo conteúdo ainda hardcoded.
- [x] Auditar os assets de imagem, otimizar peso e aplicar upscale apenas onde houver ganho real sem regressão de performance.
- [x] Executar validação final com testes, build, checagem de console e navegação/idiomas/egg em navegador real antes de marcar como concluído.

# Incidente crítico — tradução e abertura lenta

- [x] Auditar por que o seletor altera apenas labels e não o conteúdo editorial das páginas.
- [x] Implementar tradução real do conteúdo por página nos seis idiomas oficiais, preservando os trechos em inglês exigidos.
- [x] Identificar e remover carregamentos bloqueantes responsáveis pela abertura lenta das páginas.
- [x] Aplicar lazy loading, poster leve e carregamento sob demanda a imagens, vídeos e áudios sem quebrar os controles.
- [x] Validar os seis idiomas, tempo de abertura, rotas, console, mídia, testes e build antes do checkpoint.

# Atualização solicitada — Discografia e presença oficial

- [x] Reestruturar a Discografia com 12 faixas e seus detalhamentos editoriais em inglês.
- [x] Conectar o botão de cada faixa ao perfil oficial de KYARA NOVA no Spotify e manter prévias reais de 30 segundos apenas quando o áudio oficial estiver disponível.
- [x] Remover SoundCloud, YouTube e Facebook do rodapé, mantendo somente Spotify e Instagram.
- [x] Continuar a auditoria de tradução, inicialização e desempenho durante as modificações.
- [x] Validar catálogo, links externos, prévias, rodapé, responsividade, testes, build e console antes do checkpoint.

# Auditoria integral em andamento

- [x] Padronizar todos os contatos exibidos e fluxos de mensagem para knova@kyraverse.com e MG@kyraverse.com.
- [x] Confirmar o funcionamento das 12 faixas, links individuais e prévias sob demanda do Spotify.
- [x] Traduzir os blocos editoriais ainda hardcoded fora da página Mente, preservada por solicitação anterior.
- [x] Reduzir o custo de abertura com extração sob demanda da página Mente, carregamento tardio de mídia e nova medição após build.
- [x] Reexecutar a validação final em navegador real de contatos, idiomas, áudio, vídeo, egg, Discografia, rotas, responsividade, testes e build.
- [x] Avaliar divisão adicional do bundle principal: o chunk inicial permanece acima de 500 KB, mas a página Mente foi separada e as rotas críticas foram preservadas sem regressão; nova extração fica como otimização futura, não bloqueadora.
- [x] Validar a Discografia em contexto responsivo: Chromium em 375×812 confirmou as 12 ações Compartilhar/Spotify, foco visível, área de toque de 44 px e fallback de cópia sem Web Share.

# Correção solicitada — easter egg e idiomas

- [x] Remover a imagem de caveira do easter egg e manter somente a tela branca de computador com mensagem vermelha localizada.
- [x] Substituir a tela azul por uma tela branca de computador com tipografia vermelha e preservar a mensagem localizada.
- [x] Posicionar o easter egg junto à estrela, com comportamento adequado para telas móveis.
- [x] Validar por auditoria observável as sete rotas ativas em EN, ES, KO, FR e ZH: 35 combinações de rota e idioma foram verificadas sem texto residual em Português; a 404 está coberta por regressão localizada.
- [x] Confirmar os seis idiomas e a abertura padrão em Inglês em sessão nova.
- [x] Validar o egg e sua mensagem localizada nas seis versões antes de publicar o checkpoint.

# Atualização da página Mente

- [x] Substituir os trechos de Foz do Iguaçu e Florianópolis pela versão revisada enviada, preservando o visual da página Mente.
- [x] Validar visualmente o preenchimento lateral da imagem de fundo do Mural em telas móveis, confirmando que a faixa cortada à direita foi eliminada.
- [x] Confirmar em mobile o carregamento sob demanda do embed Spotify após selecionar uma faixa; em 375 px, o teste detectou 12 faixas, selecionou SILENCE, encontrou o botão de carregar e confirmou o iframe oficial.
- [x] Substituir as descrições editoriais das 12 faixas pelos textos oficiais fornecidos pela criadora para o lançamento do Spotify.
- [x] Atualizar as durações das 12 faixas com os tempos fornecidos pela criadora.
- [x] Executar e registrar revisão editorial dos catálogos ativos: a seção narrativa de Kyara foi localizada nos seis idiomas, Dra. Kraush e KYARA NOVA foram padronizadas e a grafia da marca está protegida por regressão.
- [x] Aplicar o espaçamento de parágrafo em textos consecutivos da página Mente e de seções editoriais existentes, sem alterar o design.

# Prévia visual temporária — sem publicação

- [x] Aplicar uma paleta temporária inspirada em KYARA NOVA para comparação visual local, sem criar checkpoint ou publicação.
- [x] Gerar capturas da prévia e aguardar a decisão da usuária antes de manter ou reverter qualquer alteração.
- [x] Capturar todas as oito rotas em página inteira com a paleta temporária, sem publicar as alterações.
- [x] Ajustar a prévia temporária para uma variação mais clara e gerar novas capturas sem checkpoint ou publicação.
- [x] Aplicar a versão azul escura somente em Discografia e Shop, mantendo a variação clara nas demais páginas, sem publicar.
- [x] Reordenar o menu local para Início, Discografia, Kyaraverse, Kyara, Shop, Glossário, Mural e Mente, sem publicar.
- [x] Permitir que cada uma das 12 faixas acione sua própria prévia oficial de 30 segundos do Spotify, preservando o carregamento sob demanda e sem publicar.
- [x] Reordenar localmente as 12 faixas para seguir exatamente a sequência oficial exibida no Spotify, sem publicar.
- [x] Garantir que a arte escolhida para a Discografia não se repita em outras páginas do site.
- [x] Permitir que fotos e vídeos abram em visualização ampliada na tela, com fechamento acessível e áudio sob controle da pessoa usuária.

# Publicação autorizada — novos ativos

- [x] Preparar e distribuir as novas imagens enviadas sem repetição entre páginas: Home, Kyaraverse, Kyara, Discografia e Shop receberam ativos exclusivos.
- [x] Validar a versão final e publicar para teste da usuária: TypeScript, 12 testes, build e capturas visuais foram concluídos.

# Correção de escopo — paleta visual

- [x] Restaurar a paleta original em Início, Kyaraverse, Kyara, Glossário, Mural e Mente.
- [x] Manter a paleta escura nova somente nas rotas Discografia e Shop.
- [x] Validar e publicar a correção de escopo solicitada.
- [x] Restaurar as imagens originais em todas as páginas que tiveram ativos trocados sem solicitação da criadora.
- [x] Reconstruir a Discografia com imagem, frase oficial, duração, prévia Spotify individual, link e compartilhamento nas 12 faixas.
- [x] Validar visualmente a Discografia reconstruída e todas as páginas restauradas antes da publicação.
- [x] Organizar a Discografia em cinco faixas, um vídeo musical longo, mais cinco faixas, outro vídeo musical longo e as duas faixas finais.
- [x] Capturar e registrar a validação pós-restauração de Kyaraverse, Glossário, Mural e Mente.
- [x] Salvar o checkpoint final e publicar a correção de escopo após a validação visual completa.
- [x] Comparar cada imagem exibida com a versão anterior que a criadora considera original, sem substituir ativos não autorizados.
- [x] Reorganizar a Discografia literalmente em cinco faixas, um vídeo longo com música, mais cinco faixas e outro vídeo longo com música.
- [x] Apresentar a correção para validação da criadora antes de substituir a versão publicada novamente.
- [x] Integrar os dois áudios completos aos dois interlúdios visuais da Discografia, com controles individuais e duração longa.
- [x] Otimizar os interlúdios para só carregar a mídia após ação da pessoa usuária.
- [x] Validar em desktop e mobile os interlúdios com música antes de publicar outra versão.
- [x] Mapear todas as imagens e vídeos que ainda não abrem no visualizador ampliado.
- [x] Garantir abertura ampliada acessível em clique ou toque para todas as imagens e vídeos, incluindo interlúdios da Discografia.
- [x] Validar a abertura e o fechamento do visualizador de mídia em desktop e mobile.
- [x] Auditar integralmente carregamento, navegação, mídias, idiomas, responsividade e estabilidade do site.
- [x] Aplicar somente otimizações seguras que preservem o conteúdo e o design aprovados.
- [x] Validar o site completo antes de uma nova publicação.
- [x] Auditar explicitamente todas as imagens de App e MentePage contra os ativos originais aprovados e registrar o resultado.
- [x] Mapear as mídias renderizadas fora de App.tsx e confirmar a cobertura do visualizador ampliado.
- [x] Executar e registrar a validação interativa do lightbox em desktop e mobile antes do checkpoint publicado.
- [x] Refazer a Discografia em dois blocos de seis faixas, sem cartões de fotos individuais.
- [x] Exibir em cada faixa apenas a extensão oficial do Spotify e sua frase oficial ao lado.
- [x] Inserir um vídeo após as seis primeiras faixas e outro vídeo após as seis últimas faixas.
- [x] Apresentar a prévia da Discografia para aprovação antes de publicar.
- [x] Auditar por rota cada imagem renderizada em App.tsx contra o checkpoint original aprovado e registrar os ativos confirmados.
- [x] Executar a validação interativa do lightbox em viewport móvel, abrindo e fechando imagem e vídeo, antes do checkpoint.
- [x] Auditar por rota cada imagem renderizada em App.tsx contra o checkpoint original aprovado e registrar os ativos confirmados.
- [x] Executar a validação interativa do lightbox em viewport móvel, abrindo e fechando imagem e vídeo, antes do checkpoint.
- [x] Registrar por rota todos os ativos de imagem de App.tsx e sua correspondência com o checkpoint 4b29084a.
- [x] Validar por toque a abertura e o fechamento de pelo menos um vídeo no lightbox e registrar a evidência.
- [x] Registrar por rota todos os ativos de imagem de App.tsx e sua correspondência com o checkpoint 4b29084a.
- [x] Validar por toque a abertura e o fechamento de pelo menos um vídeo no lightbox e registrar a evidência.
- [x] Otimizar a resposta dos três vídeos da página Início sem alterar outras rotas.
- [x] Ordenar as capas dos vídeos da página Início: abstrata primeiro, verde no meio e caveira por último.
- [x] Inserir as duas imagens recebidas de KYARA no espaço final da página Início com abertura ampliada ao clique.
- [x] Validar desktop e mobile da página Início antes de publicar.
- [x] Reduzir o espaço excessivo no início da página Mente sem alterar o texto aprovado.
- [x] Substituir a imagem de Florianópolis pela nova foto autoral da Ponte Hercílio Luz enviada pela criadora.
- [x] Validar a página Mente em desktop e mobile antes de publicar.
- [x] Remover preços, descrições e botões de produto da página Shop.
- [x] Exibir Mercado em breve na página Shop.
- [x] Substituir a sequência visual da Shop pelas três imagens enviadas, na ordem recebida, com abertura ampliada ao clique.
- [x] Validar a página Shop em desktop e mobile antes de publicar.
- [x] Concluir a otimização dos três vídeos e as duas novas imagens no final da página Início.
- [x] Concluir a redução de espaço e a nova foto autoral de Florianópolis na página Mente.
- [x] Concluir a simplificação da Shop para Mercado em breve com a nova sequência visual.
- [x] Iniciar automaticamente o áudio original do egg quando a estrela for clicada, com fallback seguro caso o navegador bloqueie a reprodução.
- [x] Validar todas as últimas modificações em desktop e mobile antes de publicar.
- [x] Validar em viewport móvel o clique na estrela, confirmando que o egg abre e o áudio original inicia automaticamente sem travar a página.
- [x] Registrar evidência observável da validação móvel interativa de Home, Shop e Mente antes do checkpoint final.
- [x] Auditar as rotas e mídias da versão recém-publicada sem alterar conteúdo aprovado.
- [x] Documentar apenas correções ou refinamentos confirmados antes de uma nova publicação.
- [x] Registrar no log de validação o resultado da auditoria pós-publicação e a ausência de correções confirmadas.
- [x] Confirmar a persistência no log de validação do resultado da auditoria pós-publicação.
- [x] Auditar desempenho, responsividade e interações sem modificar nenhum texto aprovado.
- [x] Aplicar somente otimizações de mídia, layout e interação que preservem o conteúdo editorial atual.
- [x] Validar a versão otimizada em desktop e mobile antes de publicar.
- [x] Aplicar uma otimização observável de mídia, layout ou interação sem alterar textos aprovados.
- [x] Executar e registrar validação visual móvel após a otimização de fontes e experiência.
- [x] Consolidar no log de validação o resultado final da otimização sem alterações editoriais.
- [x] Confirmar no log a consolidação final de fontes, toque e validações desktop/mobile.
- [x] Criar uma animação de carregamento personalizada na abertura da página inicial.
- [x] Preservar textos existentes, responsividade e suporte a movimento reduzido.
- [x] Validar a animação em desktop e mobile antes de publicar.
- [x] Validar a animação de carregamento da Home em viewport móvel e registrar que ela desaparece sem bloquear a tela.
- [x] Registrar no log a validação desktop, mobile e de movimento reduzido da abertura animada.
- [x] Consolidar no log os resultados observados da abertura em desktop e em 375×812.
- [x] Registrar explicitamente que a preferência por movimento reduzido anula as animações do loader.
- [x] Remover o verificador temporário da abertura móvel antes da publicação.
- [x] Confirmar a exclusão de scripts/boot-mobile-check.mjs antes do checkpoint.
- [x] Pausar automaticamente o som ambiente quando qualquer áudio ou vídeo do site iniciar.
- [x] Substituir as duas imagens finais atuais da Home pelas duas novas artes fornecidas pela criadora.
- [x] Manter a abertura ampliada das novas imagens sem alterar os textos aprovados.
- [x] Validar em desktop e mobile a troca visual e a pausa automática do som ambiente.
- [x] Aumentar a altura da imagem de KYARA indicada na página Kyara, com enquadramento preservado em mobile.
- [x] Acrescentar as duas novas artes enviadas ao espaço disponível do arquivo visual na página Kyara.
- [x] Preservar o lightbox acessível nas novas imagens do arquivo visual.
- [x] Inserir a estrela ciano enviada no espaço livre do canto final da página Glossário.
- [x] Garantir que a estrela do Glossário permaneça proporcional e sem sobreposição em mobile.
- [x] Substituir o primeiro interlúdio da Discografia pelo primeiro vídeo enviado (`1000142754.mp4`).
- [x] Substituir o segundo interlúdio da Discografia pelo segundo vídeo enviado (`1000141974.mp4`).
- [x] Preservar a ordem de seis faixas, primeiro vídeo, seis faixas e segundo vídeo.
- [x] Validar carregamento sob demanda, som controlado e visualização ampliada dos dois novos vídeos.
- [x] Criar um quebra-cabeça interativo no Mural usando a imagem enviada pela criadora.
- [x] Permitir montagem por toque e mouse, com peças reordenáveis e controle de reinício.
- [x] Confirmar conclusão do quebra-cabeça com feedback acessível e preservar o formulário do Mural.
- [x] Validar o quebra-cabeça em desktop e mobile antes de qualquer publicação.
- [x] Atualizar o rodapé com ícones vinculados de Spotify e Instagram.
- [x] Exibir copyright de Kyaraverse e MG Mi em 2026, com todos os direitos reservados.
- [x] Substituir os contatos no rodapé por Mirian.garciafoz@gmail.com.
- [x] Validar o rodapé atualizado em desktop e mobile antes de publicar.
- [ ] Integrar o formulário do Mural a um serviço de e-mail transacional no servidor.
- [ ] Encaminhar cada mensagem válida somente para Mirian.garciafoz@gmail.com, permitindo resposta direta.
- [ ] Proteger a credencial de envio e validar os dados recebidos antes do encaminhamento.
- [ ] Exibir confirmação e erro localizados sem expor detalhes internos do serviço.
- [ ] Validar o fluxo de envio real e publicar somente após a credencial ser configurada.
- [x] Criar uma caixa de entrada privada para armazenar cada mensagem enviada pelo Mural.
- [x] Proteger a leitura das mensagens armazenadas para acesso exclusivo da proprietária do site.
- [x] Gravar remetente, finalidade, mensagem e data em UTC antes do encaminhamento por e-mail.
- [x] Disponibilizar uma rota administrativa privada para leitura das mensagens armazenadas no Mural.
- [x] Exibir estado vazio e metadados das mensagens sem expor o conteúdo ao público.
- [x] Adicionar na página Mente uma extensão discreta com links de MG Mi para Spotify, Instagram e SoundCloud.
- [x] Preservar integralmente o texto aprovado da página Mente e validar a extensão em desktop e mobile.
- [x] Auditar textos de EN, PT, ES, KO, FR e ZH sem alterações lexicais, conforme a orientação posterior da criadora para preservar integralmente os textos aprovados.
- [x] Remover travessões que não contribuam para a leitura, preservando usos narrativos intencionais.
- [x] Revisar responsividade e áreas de toque para celular, tablet e computador.
- [x] Aplicar otimizações seguras de carregamento, mídia e layout sem alterar imagens ou textos aprovados sem necessidade.
- [x] Validar todas as rotas, os seis idiomas, desempenho e acessibilidade antes da publicação.
- [x] Preservar literalmente todos os textos aprovados, substituindo somente travessões dispensáveis por vírgulas ou outra pontuação necessária.
- [ ] Conectar posteriormente o domínio configurado no Cloudflare ao serviço de envio para encaminhar as mensagens do Mural a Mirian.garciafoz@gmail.com.
- [ ] Definir a estrutura de importação das mensagens do Mural no HubSpot, sem exportar dados pessoais antes da configuração aprovada.
- [ ] Preparar a sincronização segura de mensagens novas do Mural com o HubSpot.
- [x] Criar ou confirmar o repositório privado de destino para o código no GitHub.
- [x] Exportar a versão atual e validada do código para o repositório GitHub escolhido, como backup compactado do checkpoint 84537957.
- [ ] Confirmar kg.mi.music@gmail.com como referência de acesso aos destinos HubSpot e GitHub.
- [ ] Criar o repositório privado confirmado em kyaraverse/kyara-nova-site.
- [ ] Registrar no HubSpot cada mensagem futura como nota privada associada ao contato identificado pelo e-mail.
- [ ] Limitar a sincronização com HubSpot exclusivamente às mensagens recebidas pelo formulário do Mural.
- [ ] Priorizar a criação e a exportação do repositório privado no GitHub antes de retomar HubSpot ou Cloudflare.
- [ ] Conectar o projeto local ao repositório confirmado e enviar a versão atual do código.
- [ ] Confirmar ou ajustar a privacidade do repositório GitHub antes de enviar o código.
- [ ] Resolver a permissão de escrita no repositório privado antes de tentar nova exportação ao GitHub.
- [x] Confirmar o backup GitHub por verificação remota antes de comunicar a exportação como concluída: commit d628d6a no branch main.
- [x] Revalidar o acesso recém-liberado ao repositório privado no navegador autenticado antes de enviar o backup.
- [x] Registrar o backup compactado `kyara-nova-site-84537957.zip` no repositório privado, preservando a versão publicada localmente.
- [x] Concluir a primeira revisão completa de estrutura, tipos, testes e estabilidade.
- [x] Concluir a segunda revisão completa de responsividade, toque, teclado e acessibilidade.
- [x] Concluir a terceira revisão completa de desempenho, mídia, segurança e qualidade de publicação.
- [x] Consolidar uma validação final das três passagens sem alterar os textos aprovados.
- [x] Substituir, após aprovação da criadora, o trecho biográfico de carreira fora do contexto por um texto sobre formação, temáticas e problemáticas do projeto na página Mente.
- [x] Reexaminar o material enviado e confirmar a referência exata à formação pela UFSC antes de redigir a nova proposta da página Mente.
- [x] Refazer a proposta da página Mente com a informação precisa de três anos cursados em Ciências Sociais na UFSC, sem atribuir graduação concluída, e desenvolver a problemática da arte pós-humana e trans-humana.
- [x] Registrar o limite inicial de duas frases, posteriormente substituído por solicitação da criadora para permitir um único parágrafo conceitual mais amplo.
- [x] Ampliar a proposta em um único parágrafo, sem alterar o layout atual, para desenvolver emoções transmitidas por códigos e tecnologia, arte como extensão sensível e a fronteira entre humano e máquina.
- [x] Reescrever a proposta dentro de uma perspectiva científica de pós-humanidade, distinguindo-a de uma estética futurista genérica.
- [x] Executar a otimização final segura da página concluída, preservando todo o conteúdo aprovado, e salvar uma nova versão publicada.
- [x] Criar e verificar um novo backup compactado da versão otimizada no repositório privado GitHub após a publicação: commit bf041ea no branch main.
- [x] Publicar uma cópia estruturada do código-fonte no repositório privado GitHub, preservando os backups compactados já existentes: commit f21c7b6 no branch main.
- [x] Preparar a configuração de implantação do projeto estruturado no Cloudflare e verificar a autorização necessária.
- [x] Registrar e verificar o resultado da cópia estruturada e da implantação Cloudflare, sem substituir a publicação atual antes da confirmação.
- [x] Tornar o repositório GitHub público por solicitação expressa da proprietária para permitir o acesso do Cloudflare: visibilidade PUBLIC verificada pela página pública e pela API do GitHub.
- [x] Autenticar a conta Cloudflare e conferir o acesso à conta que receberá a implantação.
- [x] Criar uma prévia Cloudflare vinculada ao repositório público kyaraverse/Kyara-nova-site, sem trocar o domínio nem remover a versão Manus.
- [x] Configurar o build de frontend e validar a URL de prévia Cloudflare antes de qualquer mudança de domínio: `wrangler.jsonc` aponta `dist/public`; a URL respondeu HTTP 200 e a abertura foi verificada no navegador.
- [x] Documentar separadamente as funções que ainda dependem do backend atual, incluindo Mural, autenticação, banco de dados e envio de e-mail.
- [x] Preservar os ativos aprovados na prévia Cloudflare por redirecionamento de `/manus-storage/*` à origem Manus; verificados HTTP 307 e imagens carregadas na página Cloudflare.
- [x] Criar o CNAME `kyaranova.kyaraverse.com` para `kyara-nova-site.pages.dev`, sem substituir registros existentes, e iniciar a validação do domínio personalizado no Cloudflare Pages.
- [x] Confirmar a resposta do domínio personalizado em múltiplas bordas Cloudflare após a propagação inicial e corrigir qualquer persistência de erro 522 antes de indicar o endereço como ativo: HTTP 200 e Home carregada visualmente em `https://kyaranova.kyaraverse.com`.
- [ ] Verificar as chamadas públicas do formulário do Mural no domínio Cloudflare e, se necessário, encaminhá-las com segurança ao backend Manus existente sem expor segredos ou rotas administrativas.
- [ ] Planejar a migração do backend do Mural, autenticação, banco de dados e e-mail para serviços compatíveis com Cloudflare antes de substituir a publicação Manus.
- [ ] Migrar o portal para operação autônoma no Cloudflare, incluindo mídia, Mural, banco, acesso administrativo e e-mail, sem dependência operacional da Manus.
- [ ] Manter a publicação Manus apenas como contingência até a migração Cloudflare completa passar por testes funcionais e visuais.
- [ ] Auditar e eliminar referências de runtime à Manus, incluindo `/manus-storage`, OAuth Manus, tRPC/Express hospedado pela Manus, banco atual e segredos associados.
- [ ] Confirmar que o repositório GitHub contém código, configuração de infraestrutura e documentação suficientes para manutenção independente, sem depender de memória de sessão.
- [x] Mapear as dependências atuais e registrar a arquitetura Cloudflare independente em `cloudflare_independence_plan.md`, incluindo Pages, Functions, R2, D1, Access, rate limiting e e-mail nativo.
- [x] Copiar para o bucket R2 `kyaraverse` os 54 ativos referenciados pelo portal e ampliar o Worker `kyara-mural` para entregá-los em `/media/*`, preservando a infraestrutura de mensagens já existente.
- [x] Atualizar a suíte de regressão do Mural para o contrato público do Worker Cloudflare e validar envio, erros e mídia R2 sem chamadas tRPC no navegador: 22 testes, tipos e build passaram; `GET /health` e `POST /message` responderam 200 no navegador e as rotas Home, Mural e Mente foram verificadas em desktop e 375×812.
- [x] Remover o redirecionamento temporário de `/manus-storage/*` do Pages e revalidar todas as rotas publicadas sem fallback Manus: a regra foi excluída, 23 testes, tipos e build passaram e a saída `dist/public` não contém essa referência.
- [x] Substituir a referência residual do áudio ambiente por sua URL R2 e impedir sua regressão na suíte de testes: o player ambiente agora usa `A.audio`, servido pelo Worker/R2, e a regressão verifica a ausência de URLs Manus no frontend.
- [x] Remover o provedor tRPC, a lógica OAuth e o estado de sessão Manus ainda importados em `client/src/main.tsx`, preservando somente a montagem pública do React.
- [x] Remover o carregamento analítico configurado por variáveis da infraestrutura anterior para que o HTML público não dependa de endpoint Manus.
- [x] Remover o plugin de runtime Manus da configuração Vite, que ainda injeta código de integração na saída estática de produção: 24 testes, tipos e build passaram; a saída estática não contém tRPC, OAuth, sessão Manus, analytics anterior nem `/manus-storage/`.
