# Front-end — IRONCORE (Gestão de Academia)

Interface web do sistema, feita com **Next.js (App Router)**, **React** e **Tailwind CSS**. Consome a API REST em Spring Boot que fica na raiz do repositório.

## Rodando

Pré-requisito: Node.js 20+ e a API do back-end em execução (porta 8081 por padrão).

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Configuração

Por padrão o front chama a API em `http://localhost:8081`. Para mudar, crie o arquivo `.env.local` (veja `.env.example`):

```
API_BASE_URL=http://localhost:8081
```

## Estrutura

- `app/` — páginas (alunos, instrutores, planos, pagamentos, treinos, exercícios e tipos de exercício)
- `app/actions/` — Server Actions que fazem as chamadas à API
- `components/` — componentes reutilizáveis (`BotaoExcluir`, `CampoInput`, `StatusBadge`)

## Scripts

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm start` | roda o build de produção |
| `npm run lint` | verifica o código com ESLint |
