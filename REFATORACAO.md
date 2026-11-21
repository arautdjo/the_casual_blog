# Refatoração — guia de estudo

## Escopo (como contei "metade")

Contei as **48 funções/métodos da camada de lógica** (actions, lib, dto,
middleware, repositórios e utils) e refatorei **exatamente 24**.
Componentes React não entram na conta: o visual deles foi refeito pelo
redesign, mas a lógica interna foi preservada.

Procure por `// [REFATORADO]` no código: cada comentário explica o que mudou.

## As 24 refatoradas

| # | Função | Arquivo | Princípio aplicado |
|---|--------|---------|--------------------|
| 1 | `loginAction` | actions/login/login-action.ts | Remover repetição (`failure()`), constante nomeada |
| 2 | `createPostAction` | actions/post/create-post-action.ts | Guard clauses, calcular uma vez, valida só depois de autenticar |
| 3 | `updatePostAction` | actions/post/update-post-action.ts | Idem; removeu cópia inútil `{ ...validPostData }` |
| 4 | `deletePostAction` | actions/post/delete-post-action.ts | Guard clauses + `getErrorMessage` |
| 5 | `uploadImageAction` | actions/upload/upload-image-action.ts | `ok()/fail()`, sem número mágico, menos variáveis temporárias |
| 6 | `DrizzlePostRepository.findById` | repositories/post/drizzle-post-repository.ts | DRY (`findOrThrow`) |
| 7 | `DrizzlePostRepository.create` | idem | Nome claro (`duplicate`), sem `!!` |
| 8 | `DrizzlePostRepository.delete` | idem | DRY (`findOrThrow`) |
| 9 | `DrizzlePostRepository.update` | idem | Desestruturação + objeto `changes` reaproveitado |
| 10 | `JsonPostRepository.simulateWait` | repositories/post/json-post-repository.ts | Reusar `asyncDelay` em vez de duplicar |
| 11 | `JsonPostRepository.findById` | idem | **Bug**: buscava só em posts publicados |
| 12 | `JsonPostRepository.create` | idem | Validar antes do I/O, sem mutar (`[...posts, post]`) |
| 13 | `JsonPostRepository.delete` | idem | `find` + `filter` no lugar de `findIndex` + `splice` |
| 14 | `JsonPostRepository.update` | idem | **Bug**: lia `posts[-1]` antes de checar o índice |
| 15 | `verifyJwt` | lib/login/manage-login.ts | Token ausente não é erro; sem `console.log` ruidoso |
| 16 | `getLoginSession` | idem | Responsabilidade única (delega o guard ao `verifyJwt`) |
| 17 | `verifyLoginSession` | idem | Retorna `boolean`; **falha de segurança**: `undefined === undefined` |
| 18 | `middleware` | middleware.ts | Removeu `isAdminPage` redundante (o `matcher` já filtra) |
| 19 | `makePartialPublicPost` | dto/post/dto.ts | Parâmetro padrão `{}` + `??` no lugar de `post?.x \|\| ''` |
| 20 | `getZodErrorMessages` | utils/get-zod-error-messages.ts | Usar `error.issues` (já é lista plana) |
| 21 | `isUrlOrRelativePath` | utils/is-url-or-relative-path.ts | `URL.canParse` no lugar de try/catch de fluxo |
| 22 | `asyncDelay` | utils/async-delay.ts | API nativa `timers/promises` |
| 23 | `findPublicPostBySlugCached` | lib/post/queries/public.ts | Sem `slug` duplicado/sombreado; tag calculada uma vez |
| 24 | `verifyPassword` | lib/login/password-hashing.ts | Guard clause para hash vazio |

Helpers novos extraídos dessas refatorações (não entram na contagem):
`utils/get-error-message.ts` e `DrizzlePostRepository.findOrThrow`.

## As 24 que deixei como estavam (para você comparar)

`logoutAction`, `makePublicPostFromDb`, `createLoginSession`,
`deleteLoginSession`, `requireLoginSessionOrRedirect`, `signJwt`,
`hashPassword`, `findPostByIdAdmin`, `findAllPostAdmin`,
`findAllPublicPostsCached`, Drizzle: `findAllPublic`, `findBySlugPublic`,
`findAll`; JSON: `readFromDisk`, `writeToDisk`, `findAllPublic`, `findAll`,
`findBySlugPublic`; utils: `formatDatetime`, `formatDistanceToNow`,
`formatHour`, `logColor`, `makeRandomString`, `makeSlugFromText`.

Exercício sugerido: pegue os 3 métodos de busca do Drizzle e extraia o que
eles têm em comum, do mesmo jeito que fiz com `findOrThrow`.

## Design "Pop Playground"

- Paleta quente (creme + violeta, coral, amarelo, menta) com **modo escuro
  automático** (`prefers-color-scheme`). Tokens em `src/app/globals.css`.
- Estilo "adesivo": bordas marcadas, sombras deslocadas, cantos bem redondos.
- Fontes: Bricolage Grotesque (títulos) + Plus Jakarta Sans (texto).
- Animações (todas curtas): entrada suave dos cards, leve elevação no hover,
  logo que balança, loader de 3 bolinhas, diálogo que "pula" ao abrir.
  Tudo é desligado para quem ativa "reduzir movimento" no sistema.
- Acessibilidade: o `<h1>` duplicado (logo + destaque) foi corrigido; o logo
  agora é um link comum e o título do post é o único `<h1>` da página.

## Observações importantes

1. **Não consegui rodar `next build`/`dev` aqui**: o `node_modules` do zip foi
   instalado no Windows (binários nativos do Tailwind/lightningcss são
   `win32`). Validei com `tsc --noEmit` e `eslint` (ambos sem erros) e testei
   as funções puras. Rode `npm run dev` na sua máquina e me conte o que achar.
2. As fontes vêm do Google Fonts via `next/font` (baixadas no build).
3. O delay de 5 s do login (`LOGIN_DELAY_MS`) foi mantido porque você marcou
   "Vou manter", mas é bem perceptível para quem usa; considere reduzir.
4. Segurança (não alterei, só sinalizo): o upload confia em `file.type` e na
   extensão enviados pelo cliente, e `isUrlOrRelativePath` aceita
   `javascript:`. Vale restringir a uma lista de extensões/protocolos.
5. O `.env` do zip contém segredos; evite compartilhá-lo.
