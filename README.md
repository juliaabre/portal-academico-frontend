# Portal Acadêmico

Aplicação frontend de demonstração para alunos e professores. A interface usa dados simulados organizados por domínio, preparados para substituir a implementação mock por chamadas HTTP posteriormente.

## Pré-requisitos

- Node.js 20.19+ ou 22.12+
- pnpm 12+

## Instalação

```bash
pnpm install
```

## Desenvolvimento

```bash
pnpm dev
```

O Vite disponibiliza a aplicação em `http://localhost:3000`.

## Build de produção

```bash
pnpm build
```

Para visualizar o build localmente:

```bash
pnpm preview
```

## Acessos de demonstração

- Aluna: `mariana.costa@portal.edu.br`
- Professor: `rafael.nogueira@portal.edu.br`
- Senha: `portal2026`

Também é possível entrar pelo acesso rápido de cada perfil na tela de login. A autenticação é somente demonstrativa; não protege recursos nem substitui autenticação no backend.

## Organização

- `src/pages`: login e seis telas acadêmicas.
- `src/components`: layout compartilhado e componentes visuais.
- `src/services/api/mock-api.ts`: composição dos dados consolidados para as páginas.
- `src/services/api`: serviços simulados separados para Academic, Performance, Communication, Content e Student; autenticação de demonstração isolada.
- `src/mocks`: dados fictícios para os cinco domínios acadêmicos.
- `src/types`: contratos TypeScript da interface.

Os dados são mantidos em memória durante a sessão e voltam aos valores iniciais ao recarregar a página. Nenhum backend ou integração externa é necessário.
