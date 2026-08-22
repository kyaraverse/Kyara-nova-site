# Status de exportação GitHub

## Verificação atual

Em 22 de agosto de 2026, a conta `kyaraverse` concluiu a autenticação no navegador e o repositório [`kyaraverse/Kyara-nova-site`](https://github.com/kyaraverse/Kyara-nova-site) tornou-se visível no GitHub.

O backup compactado da versão publicada foi registrado diretamente no branch `main` pelo commit [`d628d6a`](https://github.com/kyaraverse/Kyara-nova-site/commit/d628d6a47a228685530a349d7ecb65acdd577374). O arquivo salvo é `kyara-nova-site-84537957.zip`, criado a partir do checkpoint publicado `84537957`.

Em 22 de agosto de 2026, a cópia final otimizada também foi registrada diretamente no branch `main` pelo commit [`bf041ea`](https://github.com/kyaraverse/Kyara-nova-site/commit/bf041eafe0d1fc3c04b839f7a7a8c973b732db87). O arquivo `kyara-nova-site-2ba16534.zip` corresponde ao checkpoint publicado `2ba16534`.

O código-fonte completo e organizado foi enviado no commit [`f21c7b6`](https://github.com/kyaraverse/Kyara-nova-site/commit/f21c7b69e041ff5de6d84c4583e61af3af0058b1), preservando os diretórios `client/`, `server/`, `drizzle/` e `shared/`, além dos backups compactados históricos.

Por autorização expressa da proprietária, a visibilidade foi alterada para **pública**. A confirmação foi feita pela página acessível sem login e pela API do GitHub, que retornou `visibility: PUBLIC` e `isPrivate: false`.

O próximo passo é criar uma prévia no Cloudflare sem alterar o domínio ou a publicação Manus. Essa prévia inicial deve ser tratada como frontend até que os serviços de backend, autenticação, banco de dados, Mural e e-mail sejam migrados ou tenham uma origem de API compatível.

## Critério de conclusão

O código-fonte estruturado e os backups foram confirmados por verificação remota. O repositório público pode ser selecionado no Cloudflare para a criação da prévia, sem substituir a publicação Manus existente.

## Implantação Cloudflare

Em 22 de agosto de 2026, o projeto Cloudflare Pages `kyara-nova-site` foi confirmado como conectado à origem GitHub pública `kyaraverse/Kyara-nova-site`, no branch `main`. A implantação está disponível em [kyara-nova-site.pages.dev](https://kyara-nova-site.pages.dev).

O primeiro deploy retornava `404` porque o build gera o frontend em `dist/public`, enquanto a configuração do Pages apontava para `dist`. O commit [`9ca7aee`](https://github.com/kyaraverse/Kyara-nova-site/commit/9ca7aeef71cfba77fc81756a79ed9f5300fcec63) adicionou `wrangler.jsonc` com `pages_build_output_dir: "dist/public"`; a implantação posterior respondeu `200` na URL pública.

O commit [`e2e57f1`](https://github.com/kyaraverse/Kyara-nova-site/commit/e2e57f1ce9538b16307af0ab097c56f9ccb6e995) adicionou `client/public/_redirects` para encaminhar as referências já aprovadas em `/manus-storage/*` à origem Manus que as hospeda. A regra foi verificada com resposta `307`, e as imagens de abertura carregaram com largura e altura naturais de 1600 px na página Cloudflare.

Esta é uma **prévia estática do frontend**, mantida separada do domínio Manus. O Mural, a autenticação administrativa, o banco de dados, as rotas tRPC/Express e o encaminhamento de e-mail continuam hospedados no backend atual e não foram migrados para Pages nesta etapa.

## Domínio Cloudflare

O login no painel Cloudflare foi concluído pela conta administrativa em 22 de agosto de 2026. Como o domínio personalizado já estava cadastrado no projeto Pages, mas pendente por ausência de DNS, foi criado um único registro novo: `CNAME kyaranova.kyaraverse.com → kyara-nova-site.pages.dev`, com proxy Cloudflare ativado e TTL automático. Não havia registro anterior com esse nome e os registros raiz, `www` e `mural` foram preservados. A tabela DNS confirmou a criação do novo CNAME; a emissão/validação do certificado e a disponibilidade pública podem levar alguns minutos.

Na primeira verificação pelo navegador, uma borda Cloudflare de Frankfurt ainda retornou `522 Connection timed out`, embora uma verificação HTTP independente já tenha retornado `200`. Após a propagação inicial, o domínio respondeu `200` e carregou visualmente a página de abertura e a Home completa de KYARA NOVA. Foram conferidos o título do portal, o acionador de transmissão, navegação, seletor de idioma, controles de áudio e os ativos de abertura. Nenhum domínio existente foi alterado.
