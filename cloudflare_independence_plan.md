# Plano de Autonomia Cloudflare — KYARA NOVA

## Objetivo

Este documento define a migração do portal para uma operação sem dependência operacional da Manus. O **GitHub** será a fonte de código e configuração versionada; o **Cloudflare** hospedará frontend, domínio, mídias, API do Mural, dados, autenticação administrativa e entrega de e-mail. A publicação Manus permanece apenas como contingência até a validação final.

## Auditoria do estado atual

| Componente atual | Dependência encontrada | Destino independente |
|---|---|---|
| Frontend React/Vite | Já publicado no Cloudflare Pages, mas com ativos remotos `/manus-storage/*` | Cloudflare Pages com ativos próprios no R2 |
| Mídias aprovadas | Aproximadamente 50 referências em `client/src/App.tsx` e `MentePage.tsx` apontam a `/manus-storage/*` | Bucket R2 privado, servido por Pages Function em `/media/*` |
| Formulário do Mural | `trpc.mural.submit` no frontend, Express/tRPC no backend Manus | Pages Functions/Workers com endpoint próprio `/api/mural` |
| Persistência do Mural | Tabela MySQL `mural_messages` no banco atual | D1 com tabela equivalente e migração de registros existentes |
| Acesso administrativo | OAuth e cookie vinculados à Manus | Cloudflare Access, limitado ao e-mail administrativo da proprietária |
| E-mail transacional | Integração Resend dependente de segredos no ambiente Manus | Binding nativo Cloudflare Email Service, com domínio/remetente verificado |
| Controle de abuso | Mapa de memória do processo Express | Rate limiting no Worker, usando KV ou armazenamento consistente da Cloudflare |

## Arquitetura de destino

```text
GitHub (main)
  └── Cloudflare Pages: build Vite e domínio kyaranova.kyaraverse.com
        ├── Pages Functions: /api/mural e /media/*
        ├── D1: mensagens do Mural e dados administrativos mínimos
        ├── R2: imagens, vídeos e áudios aprovados
        ├── KV/Rate Limiting: proteção contra abuso do formulário
        ├── Cloudflare Access: acesso administrativo à caixa de entrada do Mural
        └── Cloudflare Email Service: entrega ao endereço K.Nova@kyaraverse.com
```

## Decisões técnicas registradas

As Pages Functions executam código de servidor na rede Cloudflare e suportam formulários, autenticação e middleware, sem servidor dedicado.[1] As Functions podem receber bindings de R2 e D1, disponíveis em `context.env`, e exigem novo deploy após a vinculação.[2] O D1 é o banco SQL serverless nativo da Cloudflare e pode ser acessado por binding a partir de Workers.[3] Para a entrega de e-mail, o Email Service fornece um binding nativo `send_email` e permite restringir remetentes e destinatários.[4]

O acesso administrativo do Mural não será exposto publicamente. Ele será protegido por Cloudflare Access, separado do formulário público. Nenhum segredo de produção será salvo no GitHub: bindings e chaves serão configurados no painel Cloudflare e documentados por nome, sem valor.

## Ordem de execução

1. Criar D1, R2 e os bindings do projeto Pages.
2. Copiar os ativos publicados para R2 e substituir todas as URLs `/manus-storage/*` por URLs independentes `/media/*`.
3. Implementar a API do Mural em Pages Functions, com validação, rate limiting, D1 e resposta localizada.
4. Migrar as mensagens atuais do Mural apenas após revisão do conjunto de dados e preservação das datas UTC.
5. Proteger a área administrativa com Cloudflare Access e configurar o binding de e-mail nativo.
6. Remover tRPC/Manus OAuth do frontend e validar a versão independente no domínio Cloudflare.
7. Verificar que nenhum request, asset, segredo ou rota de runtime aponta à Manus antes de desativar a contingência.

## Estado de acesso em 22 de agosto de 2026

O bucket R2 `kyaraverse` já existe na conta Cloudflare da proprietária. O conector de API foi confirmado como autenticado em modo de leitura, mas recusou a publicação de um Worker de migração com erro `10000 Authentication error`; a tentativa não criou nem alterou Worker, bucket ou DNS. O painel Cloudflare no navegador está autenticado e será a alternativa para configurar recursos enquanto a autorização de escrita do conector não estiver disponível.

Também foi identificado um Worker existente, `kyara-mural`, associado à rota `mural.kyaraverse.com/*`. Ele já possui API própria de mensagens, CORS, limitação de frequência e binding de KV; essa infraestrutura será auditada e integrada ao portal, em vez de ser sobrescrita. O novo Worker `kyara-media-migrator` foi publicado separadamente com binding ao bucket R2 `kyaraverse`, sem alterar a rota existente do Mural.

Em seguida, o Worker `kyara-mural` foi ampliado preservando o namespace KV de mensagens existente e recebeu um binding ao bucket R2 `kyaraverse`. A migração única autenticada foi testada e transferiu com êxito os **54 ativos** efetivamente referenciados por `App.tsx` e `MentePage.tsx`, incluindo imagens, vídeos, áudios e a fotografia autoral. Os objetos foram gravados com cache público de um ano. A próxima alteração substitui no frontend as referências `/manus-storage/*` pelas URLs independentes do Worker em `https://mural.kyaraverse.com/media/*`.

## Validação do Worker após a migração

Em 22 de agosto de 2026, o endpoint `GET https://mural.kyaraverse.com/health` respondeu com `200` e status `ok` no navegador. Uma transmissão técnica identificada, sem conteúdo editorial ou dado pessoal real, foi aceita por `POST /message` com resposta `200` e `{ "success": true, "delivered": false }`. Esse resultado confirma o recebimento público pelo Worker e deixa explícito que a entrega de e-mail ainda não está configurada. Uma chamada direta por terminal recebeu um desafio de segurança da Cloudflare, enquanto a mesma operação no navegador autenticado no desafio foi aceita; isso deve ser considerado ao montar a validação automatizada externa.

O frontend local usa `https://mural.kyaraverse.com/media/` para os ativos e envia o formulário diretamente a `POST /message` via `fetch`, sem `trpc.mural.submit` no código do navegador. A rota `/mural/inbox` permanece apenas como casca informativa: a proteção privada com Cloudflare Access e a substituição da listagem pública atual ainda são pendências. Não há conclusão de autonomia total nesta etapa.

## Publicação Pages verificada

O Cloudflare Pages publicou com sucesso o commit GitHub `40d4591` em produção, acionado pelo branch `main`. A implantação está associada ao domínio `https://kyaranova.kyaraverse.com` e não utiliza Pages Functions. A página inicial do domínio personalizado foi aberta no navegador após esse deploy e as mídias visíveis carregaram de `https://mural.kyaraverse.com/media/*`, incluindo a estrela, imagens de KYARA e arquivos de arquivo. Essa verificação confirma a substituição no caminho inicial publicado; a auditoria completa de todas as rotas e solicitações ainda é necessária antes de remover a contingência Manus.

As rotas publicadas `/mural` e `/mente` também foram abertas no domínio personalizado. O formulário, o quebra-cabeça e os contatos do Mural renderizaram na versão Pages; a página Mente exibiu as fotografias e o conteúdo aprovados com URLs do Worker de mídia R2. A checagem visual foi feita em navegador; a próxima verificação deve registrar as solicitações de runtime e remover o redirecionamento de contingência somente depois de confirmada a ausência de chamadas a `/manus-storage/*`.

Nas páginas publicadas `/mente` e `/mural`, a lista de recursos carregados no navegador foi examinada para as assinaturas `/manus-storage`, `manus.space`, `/api/trpc` e `oauth`. Não houve correspondências nas duas rotas. A navegação e o formulário público permanecem operacionais no domínio Cloudflare. Essa evidência permite retirar o redirecionamento de contingência de mídia do código publicado, mas não encerra a migração: o backend histórico, a caixa de entrada administrativa, D1 e e-mail ainda precisam de substituição e validação.

## Fontes técnicas

[1] [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)

[2] [Cloudflare Pages Functions Bindings](https://developers.cloudflare.com/pages/functions/bindings/)

[3] [Cloudflare Workers — Connect to databases](https://developers.cloudflare.com/workers/databases/connecting-to-databases/)

[4] [Cloudflare Email Service — Workers API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/)
