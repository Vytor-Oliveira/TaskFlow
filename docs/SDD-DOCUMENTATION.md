# 📋 TaskFlow — Documentação SDD com Spec-Kit

> **Projeto:** TaskFlow — Sistema de Gestão de Tarefas para Equipes  
> **Framework:** Spec-Kit v0.9.1 (Spec-Driven Development)  
> **IA Parceira:** Claude Sonnet 4.6 (Anthropic)  
> **Data:** Junho de 2026  

---

## 📖 Índice

1. [O que é Spec-Driven Development?](#1-o-que-é-spec-driven-development)
2. [Instalação do Spec-Kit](#2-instalação-do-spec-kit)
3. [Visão Geral do Projeto TaskFlow](#3-visão-geral-do-projeto-taskflow)
4. [speckit-constitution — Princípios do Projeto](#4-speckit-constitution--princípios-do-projeto)
5. [speckit-specify — Especificação Funcional](#5-speckit-specify--especificação-funcional)
6. [speckit-plan — Plano Técnico de Implementação](#6-speckit-plan--plano-técnico-de-implementação)
7. [speckit-tasks — Breakdown de Tarefas](#7-speckit-tasks--breakdown-de-tarefas)
8. [speckit-taskstoissues — Conversão para GitHub Issues](#8-speckit-taskstoissues--conversão-para-github-issues)
9. [speckit-implement — Implementação](#9-speckit-implement--implementação)
10. [Estrutura de Diretórios Final](#10-estrutura-de-diretórios-final)
11. [Resumo do Fluxo SDD](#11-resumo-do-fluxo-sdd)

---

## 1. O que é Spec-Driven Development?

**Spec-Driven Development (SDD)** inverte o script do desenvolvimento tradicional. Enquanto a abordagem convencional começa com código e trata especificações como documentos descartáveis, o SDD eleva as especificações a **artefatos executáveis** que guiam diretamente a implementação por IAs de codificação.

### Filosofia Central

| Princípio | Descrição |
|-----------|-----------|
| **Intent-driven** | Especificações definem o *o quê* antes do *como* |
| **Multi-step refinement** | Refinamento iterativo em vez de geração one-shot |
| **AI-native** | Pesado uso de agentes de IA para interpretar e implementar specs |
| **Spec as source of truth** | A especificação, não o código, é o artefato primário |

### Fluxo do Processo

```
Constitution → Specify → (Clarify) → Plan → Tasks → TasksToIssues → Implement
```

---

## 2. Instalação do Spec-Kit

### Pré-requisitos

- Python 3.11+
- [uv](https://docs.astral.sh/uv/) (gerenciador de pacotes recomendado)
- Git
- Claude Code, Copilot, ou outra IA de codificação suportada

### Passo 1 — Instalar o `uv`

```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### Passo 2 — Instalar o Specify CLI

```bash
# Instalar a versão mais recente (v0.9.1 em Jun/2026)
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.9.1

# Verificar instalação
specify --version

# Listar integrações disponíveis
specify integration list
```

**Saída esperada:**

```
specify-cli v0.9.1
Integrations available: copilot, claude, gemini, codex, opencode, cursor, ...
```

### Passo 3 — Inicializar o projeto com Claude como IA

```bash
# Criar o projeto TaskFlow usando Claude Code como agente
specify init taskflow --integration claude

# Entrar na pasta do projeto
cd taskflow
```

**Saída do `specify init`:**

```
✅ Initializing project: taskflow
✅ Integration: claude
✅ Creating .specify/ directory structure...
✅ Installing slash commands to .claude/commands/
✅ Commands available:
   /speckit.constitution
   /speckit.specify
   /speckit.plan
   /speckit.tasks
   /speckit.taskstoissues
   /speckit.implement
   /speckit.clarify
   /speckit.analyze
   /speckit.checklist
✅ Project initialized successfully!
```

### Inicializar o Agente Claude

```bash
# Na pasta taskflow, abrir o Claude Code
claude

# Verificar comandos disponíveis digitando /
# Você verá: /speckit.constitution, /speckit.specify, etc.
```

---

## 3. Visão Geral do Projeto TaskFlow

**TaskFlow** é uma plataforma de gestão de tarefas para equipes de desenvolvimento de software, inspirada no Jira e no Linear, mas focada em simplicidade e velocidade.

**Problema que resolve:** Equipes pequenas precisam de uma ferramenta de rastreamento de tarefas que seja simples de configurar, sem a complexidade do Jira Enterprise, mas com funcionalidades suficientes para times ágeis.

---

## 4. `speckit-constitution` — Princípios do Projeto

### Comando utilizado

```
/speckit.constitution Criar princípios de projeto focados em:
- Qualidade de código: TypeScript estrito, cobertura de testes mínima de 80%
- Experiência do usuário: Interface responsiva, acessível (WCAG 2.1 AA), feedback visual imediato
- Performance: Carregamento inicial < 2s, atualizações em tempo real < 100ms
- Segurança: Autenticação JWT, sanitização de inputs, proteção CSRF
- Manutenibilidade: Código documentado, commits semânticos, changelog atualizado
```

### Arquivo gerado: `.specify/memory/constitution.md`

```markdown
# TaskFlow — Constituição do Projeto

## 🎯 Visão do Produto
TaskFlow é uma ferramenta de gestão de tarefas que prioriza simplicidade,
colaboração em tempo real e produtividade de equipes de desenvolvimento.

## 📐 Princípios de Qualidade de Código

### TypeScript First
- Todo código deve ser TypeScript com modo `strict: true`
- Proibido uso de `any` sem justificativa documentada em comentário
- Interfaces e tipos explícitos para todas as estruturas de dados

### Cobertura de Testes
- Mínimo 80% de cobertura de código (unitários + integração)
- Testes unitários para toda lógica de negócio
- Testes E2E para fluxos críticos (criação de tarefa, drag-and-drop, comentários)
- TDD obrigatório para services e utilities

### Padrões de Código
- ESLint + Prettier com configuração compartilhada
- Commits seguindo Conventional Commits (feat:, fix:, docs:, etc.)
- Code review obrigatório com mínimo 1 aprovação
- CHANGELOG.md atualizado a cada release

## 🎨 Princípios de UX

### Acessibilidade
- Conformidade WCAG 2.1 nível AA
- Navegação completa por teclado
- Compatibilidade com leitores de tela (ARIA labels)
- Contraste mínimo 4.5:1 para texto normal

### Feedback Visual
- Feedback imediato para toda ação do usuário (< 100ms)
- Estados de loading claros (skeletons, spinners)
- Mensagens de erro descritivas e acionáveis
- Animações suaves (duration 200-300ms, easing ease-out)

### Responsividade
- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Funcionalidade completa em telas de 320px a 2560px

## ⚡ Princípios de Performance

### Métricas Alvo
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- Atualizações WebSocket: latência < 100ms

### Estratégias
- Lazy loading para componentes pesados
- Virtualization para listas com > 100 itens
- Cache de dados com TanStack Query (stale-time 30s)
- Code splitting por rota

## 🔐 Princípios de Segurança

### Autenticação & Autorização
- JWT com refresh tokens (access: 15min, refresh: 7 dias)
- RBAC: roles Owner, Admin, Member, Viewer
- Verificação de permissão em cada endpoint da API

### Proteção de Dados
- Sanitização de todos os inputs (DOMPurify para HTML)
- Proteção CSRF com tokens duplos
- Rate limiting: 100 req/min por IP, 1000 req/min por usuário autenticado
- Logs de auditoria para ações sensíveis

## 🏗️ Princípios de Arquitetura

### Separação de Responsabilidades
- Frontend: React + TypeScript (puro UI e estado local)
- Backend: Node.js + Express (lógica de negócio e APIs)
- Database: PostgreSQL (dados persistentes)
- Cache: Redis (sessões, rate limiting, pub/sub para WebSocket)

### Decisões Técnicas Imutáveis
- Sem ORM: usar queries SQL diretas com `pg` (previsibilidade)
- API REST + WebSocket (sem GraphQL para manter simplicidade)
- Monorepo com workspaces npm (frontend/ e backend/)
- Docker Compose para ambiente de desenvolvimento

## 📋 Processo de Desenvolvimento

### Workflow de Features
1. Especificação aprovada antes de qualquer código
2. Branch da feature a partir de `main`
3. TDD: testes escritos antes da implementação
4. Code review com checklist de qualidade
5. Merge apenas com CI/CD verde (testes + lint + build)

### Definição de Pronto (DoD)
- [ ] Funcionalidade implementada conforme spec
- [ ] Testes unitários e integração cobrindo ≥ 80%
- [ ] Testes E2E para fluxos críticos
- [ ] Documentação de API atualizada
- [ ] CHANGELOG.md atualizado
- [ ] Code review aprovado
- [ ] CI/CD verde

---
*Constituição criada via `/speckit.constitution` — TaskFlow v1.0*
*Gerada com Claude Sonnet 4.6 como IA parceira*
```

---

## 5. `speckit-specify` — Especificação Funcional

### Comando utilizado

```
/speckit.specify Construir o TaskFlow, uma plataforma de gestão de tarefas para equipes
de desenvolvimento. O sistema deve permitir que equipes organizem trabalho em projetos,
criem e gerenciem tarefas em boards Kanban, colaborem através de comentários em tempo real
e rastreiem progresso com dashboards.

Funcionalidades principais:
- Usuários podem criar projetos e convidar membros com diferentes permissões (Owner, Admin, Member, Viewer)
- Dentro de cada projeto existe um Board Kanban com colunas: Backlog, To Do, In Progress, In Review, Done
- Tarefas têm: título, descrição (markdown), prioridade (P0-P3), assignee, estimativa de pontos, prazo, etiquetas
- Drag-and-drop para mover tarefas entre colunas e reordenar dentro de colunas
- Comentários em tarefas com suporte a markdown e @menções a membros
- Atualizações em tempo real quando outros membros fazem mudanças no board
- Dashboard por projeto com métricas: burndown, velocidade da sprint, distribuição por prioridade
- Filtros e busca: por assignee, prioridade, etiqueta, prazo, texto
- Notificações: menções, atribuições, vencimento de prazo
```

### Branch criada: `001-taskflow-core`

### Arquivo gerado: `specs/001-taskflow-core/spec.md`

```markdown
# Especificação: TaskFlow Core

**Feature ID:** 001-taskflow-core  
**Criado em:** 2026-06-24  
**Status:** Em Revisão  
**Branch:** 001-taskflow-core  

---

## 📌 Resumo Executivo

O TaskFlow Core estabelece a fundação da plataforma de gestão de tarefas:
sistema de autenticação, gerenciamento de projetos com controle de acesso
baseado em roles, boards Kanban com colaboração em tempo real, e dashboards
de progresso.

---

## 👥 Personas de Usuário

### P1 — Tech Lead (Lucas)
- **Perfil:** Desenvolvedor sênior, gerencia equipe de 8 pessoas
- **Necessidades:** Visibilidade do progresso do time, distribuição de tarefas, identificar bloqueios
- **Frustrações:** Excesso de reuniões de status, falta de contexto nas tarefas

### P2 — Desenvolvedor (Ana)
- **Perfil:** Desenvolvedora mid-level, foco em entregar tarefas
- **Necessidades:** Saber o que fazer agora, contexto claro nas tarefas, histórico de discussões
- **Frustrações:** Tarefas mal descritas, interrupções constantes para alinhamento

### P3 — Product Manager (Rafael)
- **Perfil:** PM responsável por priorização e roadmap
- **Necessidades:** Rastrear progresso geral, garantir alinhamento com metas, comunicar status
- **Frustrações:** Relatórios manuais, falta de dados de velocidade do time

---

## 📖 Histórias de Usuário

### US-01: Autenticação e Perfil de Usuário

**Como** visitante  
**Quero** criar uma conta e fazer login no TaskFlow  
**Para que** eu possa acessar meus projetos e tarefas

#### Critérios de Aceitação

- [ ] **AC-01.1** — Registro com email, nome e senha (mín. 8 chars, 1 maiúscula, 1 número)
- [ ] **AC-01.2** — Login com email e senha, retorna JWT com access token (15min) e refresh token (7 dias)
- [ ] **AC-01.3** — Logout invalida o refresh token no servidor
- [ ] **AC-01.4** — Recuperação de senha via link por email (expira em 1 hora)
- [ ] **AC-01.5** — Perfil editável: nome, foto de avatar, timezone, preferências de notificação
- [ ] **AC-01.6** — Token expirado redireciona para login, preservando a URL de origem

#### Fluxos de Erro

- Email já cadastrado: mensagem "Este email já está em uso. Faça login ou recupere sua senha."
- Credenciais inválidas: mensagem genérica "Email ou senha incorretos" (segurança)
- Token expirado durante sessão ativa: refresh automático transparente

---

### US-02: Gerenciamento de Projetos

**Como** usuário autenticado  
**Quero** criar e gerenciar projetos  
**Para que** eu possa organizar o trabalho do meu time

#### Critérios de Aceitação

- [ ] **AC-02.1** — Criar projeto com nome (máx 100 chars), descrição (máx 500 chars) e cor de identificação
- [ ] **AC-02.2** — Convidar membros por email com role específica (Owner/Admin/Member/Viewer)
- [ ] **AC-02.3** — Matriz de permissões por role:
  
  | Ação | Owner | Admin | Member | Viewer |
  |------|-------|-------|--------|--------|
  | Gerenciar projeto | ✅ | ✅ | ❌ | ❌ |
  | Convidar membros | ✅ | ✅ | ❌ | ❌ |
  | Criar/editar tarefas | ✅ | ✅ | ✅ | ❌ |
  | Mover tarefas | ✅ | ✅ | ✅ | ❌ |
  | Comentar | ✅ | ✅ | ✅ | ❌ |
  | Visualizar | ✅ | ✅ | ✅ | ✅ |
  | Excluir projeto | ✅ | ❌ | ❌ | ❌ |

- [ ] **AC-02.4** — Listagem de projetos do usuário com nome, cor, contagem de tarefas abertas e membros
- [ ] **AC-02.5** — Arquivar projeto (oculta da lista, mantém dados)
- [ ] **AC-02.6** — Excluir projeto requer confirmação e remove todos os dados associados

---

### US-03: Board Kanban

**Como** membro de um projeto  
**Quero** visualizar e gerenciar tarefas em um board Kanban  
**Para que** eu possa ter visibilidade e controle do fluxo de trabalho

#### Critérios de Aceitação

- [ ] **AC-03.1** — Board com 5 colunas padrão: Backlog, To Do, In Progress, In Review, Done
- [ ] **AC-03.2** — Drag-and-drop de tarefas entre colunas e para reordenar dentro da mesma coluna
- [ ] **AC-03.3** — Cards de tarefa exibem: título, prioridade (cor), assignee (avatar), estimativa, prazo (vermelho se vencido), etiquetas
- [ ] **AC-03.4** — Atualizações em tempo real via WebSocket: mudança de coluna, nova tarefa, edição, novo comentário
- [ ] **AC-03.5** — Filtros aplicáveis simultaneamente: assignee, prioridade (P0/P1/P2/P3), etiqueta, com/sem prazo, texto livre
- [ ] **AC-03.6** — Contador de tarefas visível em cada coluna
- [ ] **AC-03.7** — Limite de WIP configurável por coluna (aviso visual ao ultrapassar, sem bloqueio)
- [ ] **AC-03.8** — Colapsar/expandir colunas individualmente

---

### US-04: Gestão de Tarefas

**Como** membro com permissão de edição  
**Quero** criar e editar tarefas com detalhes suficientes  
**Para que** o time tenha contexto claro para executar o trabalho

#### Critérios de Aceitação

- [ ] **AC-04.1** — Criar tarefa com: título (obrigatório, máx 200 chars), descrição em Markdown, prioridade (padrão P2), assignee, estimativa em story points (0.5, 1, 2, 3, 5, 8, 13), prazo, etiquetas
- [ ] **AC-04.2** — Edição inline do título diretamente no card
- [ ] **AC-04.3** — Modal de detalhe da tarefa com todos os campos editáveis
- [ ] **AC-04.4** — Histórico de atividade automático: mudanças de coluna, assignee, prioridade, prazo registradas com timestamp e usuário
- [ ] **AC-04.5** — Etiquetas: criadas por Admins+, reutilizadas no projeto, cor personalizável
- [ ] **AC-04.6** — Duplicar tarefa (copia título, descrição, prioridade, etiquetas; limpa assignee e prazo)
- [ ] **AC-04.7** — Arquivar tarefa (remove do board, recuperável por filtro "Arquivadas")
- [ ] **AC-04.8** — ID único por tarefa por projeto (ex: TF-042) exibido no card e na URL

---

### US-05: Comentários e Colaboração

**Como** membro do projeto  
**Quero** comentar nas tarefas e mencionar colegas  
**Para que** as discussões fiquem centralizadas e o contexto não se perca

#### Critérios de Aceitação

- [ ] **AC-05.1** — Comentários em Markdown com preview ao vivo
- [ ] **AC-05.2** — @menções a membros do projeto com autocomplete ao digitar "@"
- [ ] **AC-05.3** — Editar comentário próprio (histórico de edição visível ao hover)
- [ ] **AC-05.4** — Excluir comentário próprio (moderadores podem excluir qualquer um)
- [ ] **AC-05.5** — Reações emoji nos comentários (mínimo: 👍 ❤️ 🎉 😄 😕)
- [ ] **AC-05.6** — Novos comentários aparecem em tempo real para todos que têm a tarefa aberta
- [ ] **AC-05.7** — Notificação por email para membros mencionados (configurável nas preferências)

---

### US-06: Dashboard e Métricas

**Como** Tech Lead ou PM  
**Quero** visualizar métricas do projeto em um dashboard  
**Para que** eu possa acompanhar progresso e identificar gargalos

#### Critérios de Aceitação

- [ ] **AC-06.1** — Gráfico de burndown da sprint atual (pontos restantes vs. tempo)
- [ ] **AC-06.2** — Velocidade das últimas 4 sprints (pontos entregues por sprint)
- [ ] **AC-06.3** — Distribuição de tarefas por prioridade (gráfico de pizza)
- [ ] **AC-06.4** — Distribuição de tarefas por assignee (gráfico de barras)
- [ ] **AC-06.5** — Tarefas próximas do prazo (próximos 7 dias, agrupadas por dia)
- [ ] **AC-06.6** — Lead time médio (tempo do Backlog até Done, últimas 30 tarefas)
- [ ] **AC-06.7** — Export dos dados em CSV (nome, status, assignee, prazo, pontos)

---

## ✅ Review & Acceptance Checklist

- [x] Todas as personas de usuário identificadas e documentadas
- [x] Todas as histórias de usuário têm critérios de aceitação testáveis
- [x] Fluxos de erro documentados para US-01
- [x] Matriz de permissões completa (US-02)
- [x] Requisitos de tempo real especificados (US-03, US-05)
- [ ] Requisitos de acessibilidade detalhados por componente (pendente clarificação)
- [x] Métricas de performance alvo definidas na Constituição
- [x] IDs únicos para rastreabilidade (AC-04.8)

---

*Especificação gerada via `/speckit.specify` — Branch: 001-taskflow-core*
*Claude Sonnet 4.6 como agente IA*
```

---

## 6. `speckit-plan` — Plano Técnico de Implementação

### Comando utilizado

```
/speckit.plan O TaskFlow usa Node.js 20 LTS com Express no backend,
React 18 + TypeScript no frontend, PostgreSQL 16 como banco de dados,
Redis 7 para cache e sessões, e Socket.IO para atualizações em tempo real.
Monorepo com npm workspaces. Docker Compose para desenvolvimento local.
Testes com Jest (unitários), Supertest (integração API), e Playwright (E2E).
Deploy no Railway (backend) e Vercel (frontend).
```

### Arquivos gerados em `specs/001-taskflow-core/`

---

### `plan.md` — Plano Principal

```markdown
# Plano de Implementação — TaskFlow Core

## Stack Técnica

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| Frontend | React + TypeScript | 18.3 / 5.4 | Ecossistema maduro, suporte a Concurrent Features |
| Estilização | Tailwind CSS | 3.4 | Produtividade, consistência, purge automático |
| Estado | TanStack Query | 5.x | Cache inteligente, sync com servidor |
| Drag-and-drop | @dnd-kit/core | 6.x | Acessível, performático, TypeScript nativo |
| Markdown | react-markdown + remark | latest | Extensível, sanitização built-in |
| Backend | Node.js + Express | 20 LTS / 4.x | Estabilidade, ecossistema |
| Auth | jsonwebtoken + bcrypt | latest | Padrão da indústria |
| Database | PostgreSQL | 16 | ACID, JSON nativo, arrays |
| ORM | Nenhum (pg nativo) | 8.x | Previsibilidade, performance, sem magic |
| Cache/PubSub | Redis | 7 | Sessões, rate limiting, WebSocket sync |
| Real-time | Socket.IO | 4.x | Fallback automático, rooms por projeto |
| Testes E2E | Playwright | latest | Cross-browser, auto-wait |
| CI/CD | GitHub Actions | - | Integração nativa |
| Deploy BE | Railway | - | PostgreSQL + Redis incluídos |
| Deploy FE | Vercel | - | Edge network, preview deploys |

## Estrutura do Monorepo

```
taskflow/
├── packages/
│   ├── frontend/          # React app
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── auth/
│   │   │   │   ├── board/
│   │   │   │   ├── task/
│   │   │   │   ├── dashboard/
│   │   │   │   └── shared/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   ├── services/  # API clients
│   │   │   ├── stores/    # Zustand stores (UI state)
│   │   │   └── types/
│   │   ├── tests/
│   │   │   ├── unit/
│   │   │   └── e2e/       # Playwright
│   │   └── package.json
│   └── backend/           # Express API
│       ├── src/
│       │   ├── config/
│       │   ├── controllers/
│       │   ├── middleware/
│       │   ├── models/    # SQL queries
│       │   ├── routes/
│       │   ├── services/
│       │   ├── sockets/   # Socket.IO handlers
│       │   └── utils/
│       ├── tests/
│       │   ├── unit/
│       │   └── integration/
│       ├── migrations/
│       └── package.json
├── docker-compose.yml
├── .github/workflows/
└── package.json           # Workspace root
```

## Fases de Implementação

### Fase 1 — Foundation (US-01)
Autenticação completa (registro, login, logout, refresh, recuperação de senha)

### Fase 2 — Projects (US-02)
CRUD de projetos com controle de acesso RBAC

### Fase 3 — Kanban Board (US-03)
Board visual com drag-and-drop e sincronização em tempo real

### Fase 4 — Tasks (US-04)
Gestão completa de tarefas com todos os campos e histórico

### Fase 5 — Collaboration (US-05)
Comentários, menções, reações e notificações

### Fase 6 — Dashboard (US-06)
Métricas, gráficos e exportação de dados
```

---

### `data-model.md` — Modelo de Dados

```sql
-- Modelo de Dados PostgreSQL — TaskFlow

-- Usuários
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       VARCHAR(255) UNIQUE NOT NULL,
  name        VARCHAR(100) NOT NULL,
  avatar_url  TEXT,
  password_hash TEXT NOT NULL,
  timezone    VARCHAR(50) DEFAULT 'UTC',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tokens de refresh
CREATE TABLE refresh_tokens (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projetos
CREATE TABLE projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL,
  description TEXT,
  color       VARCHAR(7) DEFAULT '#6366f1',
  archived_at TIMESTAMPTZ,
  created_by  UUID NOT NULL REFERENCES users(id),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Membros do projeto
CREATE TYPE project_role AS ENUM ('owner', 'admin', 'member', 'viewer');
CREATE TABLE project_members (
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role       project_role NOT NULL DEFAULT 'member',
  joined_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (project_id, user_id)
);

-- Colunas do Kanban
CREATE TABLE columns (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name       VARCHAR(100) NOT NULL,
  position   INTEGER NOT NULL,
  wip_limit  INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Etiquetas
CREATE TABLE labels (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name       VARCHAR(50) NOT NULL,
  color      VARCHAR(7) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tarefas
CREATE TYPE priority AS ENUM ('p0', 'p1', 'p2', 'p3');
CREATE TABLE tasks (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  column_id    UUID NOT NULL REFERENCES columns(id),
  task_number  INTEGER NOT NULL,  -- TF-042 = sequence per project
  title        VARCHAR(200) NOT NULL,
  description  TEXT,
  priority     priority DEFAULT 'p2',
  assignee_id  UUID REFERENCES users(id) ON DELETE SET NULL,
  points       DECIMAL(4,1),
  due_date     DATE,
  position     INTEGER NOT NULL,  -- ordem dentro da coluna
  archived_at  TIMESTAMPTZ,
  created_by   UUID NOT NULL REFERENCES users(id),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (project_id, task_number)
);

CREATE INDEX tasks_project_id_idx ON tasks(project_id);
CREATE INDEX tasks_column_id_idx ON tasks(column_id);
CREATE INDEX tasks_assignee_id_idx ON tasks(assignee_id);

-- Etiquetas por tarefa
CREATE TABLE task_labels (
  task_id  UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  label_id UUID NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, label_id)
);

-- Comentários
CREATE TABLE comments (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id    UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  author_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content    TEXT NOT NULL,
  edited_at  TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reações em comentários
CREATE TABLE comment_reactions (
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  emoji      VARCHAR(10) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (comment_id, user_id, emoji)
);

-- Histórico de atividade
CREATE TABLE activity_log (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id    UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES users(id),
  action     VARCHAR(50) NOT NULL,  -- 'moved', 'assigned', 'priority_changed', etc.
  old_value  JSONB,
  new_value  JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### `contracts/api-spec.json` (resumo)

```json
{
  "openapi": "3.1.0",
  "info": { "title": "TaskFlow API", "version": "1.0.0" },
  "paths": {
    "/api/auth/register": { "post": {} },
    "/api/auth/login": { "post": {} },
    "/api/auth/logout": { "post": {} },
    "/api/auth/refresh": { "post": {} },
    "/api/projects": { "get": {}, "post": {} },
    "/api/projects/{id}": { "get": {}, "patch": {}, "delete": {} },
    "/api/projects/{id}/members": { "get": {}, "post": {} },
    "/api/projects/{id}/tasks": { "get": {}, "post": {} },
    "/api/tasks/{id}": { "get": {}, "patch": {}, "delete": {} },
    "/api/tasks/{id}/move": { "patch": {} },
    "/api/tasks/{id}/comments": { "get": {}, "post": {} },
    "/api/comments/{id}": { "patch": {}, "delete": {} },
    "/api/projects/{id}/dashboard": { "get": {} }
  }
}
```

---

## 7. `speckit-tasks` — Breakdown de Tarefas

### Comando utilizado

```
/speckit.tasks
```

### Arquivo gerado: `specs/001-taskflow-core/tasks.md`

```markdown
# Tarefas de Implementação — TaskFlow Core

> **Legenda:** `[P]` = Pode ser executada em paralelo com outras marcadas `[P]`

---

## Fase 0 — Setup de Projeto (Pré-requisito para tudo)

- [ ] **T-001** — Configurar monorepo npm workspaces com root `package.json`
- [ ] **T-002** `[P]` — Configurar `packages/backend/`: TypeScript, ESLint, Jest, estrutura de pastas
- [ ] **T-003** `[P]` — Configurar `packages/frontend/`: Vite, React, TypeScript, Tailwind, ESLint, Playwright
- [ ] **T-004** — Criar `docker-compose.yml` com PostgreSQL 16 e Redis 7
- [ ] **T-005** — Criar scripts de migração de banco (pasta `backend/migrations/`)
- [ ] **T-006** `[P]` — Configurar GitHub Actions CI: lint + test + build em PRs

**Checkpoint:** `docker-compose up` sobe PostgreSQL e Redis; `npm run dev` no root inicia ambos os packages

---

## Fase 1 — Autenticação (US-01)

### Backend

- [ ] **T-101** — Criar migration para tabelas `users` e `refresh_tokens`
- [ ] **T-102** — Escrever testes unitários para `AuthService` (TDD)
  - Arquivo: `backend/tests/unit/auth.service.test.ts`
- [ ] **T-103** — Implementar `AuthService`: `register()`, `login()`, `logout()`, `refreshToken()`, `forgotPassword()`, `resetPassword()`
  - Arquivo: `backend/src/services/auth.service.ts`
- [ ] **T-104** — Implementar middleware de autenticação JWT
  - Arquivo: `backend/src/middleware/auth.middleware.ts`
- [ ] **T-105** — Implementar rotas e controller de auth
  - Arquivo: `backend/src/routes/auth.routes.ts`, `backend/src/controllers/auth.controller.ts`
- [ ] **T-106** — Escrever testes de integração para endpoints de auth
  - Arquivo: `backend/tests/integration/auth.routes.test.ts`

### Frontend

- [ ] **T-107** `[P]` — Criar páginas: `LoginPage`, `RegisterPage`, `ForgotPasswordPage`, `ResetPasswordPage`
  - Pasta: `frontend/src/pages/auth/`
- [ ] **T-108** `[P]` — Implementar `AuthService` do frontend (axios wrapper para `/api/auth/*`)
  - Arquivo: `frontend/src/services/auth.service.ts`
- [ ] **T-109** — Implementar lógica de JWT: armazenamento seguro, interceptor de refresh automático
  - Arquivo: `frontend/src/utils/auth.utils.ts`
- [ ] **T-110** — Criar `ProtectedRoute` HOC para rotas autenticadas
  - Arquivo: `frontend/src/components/auth/ProtectedRoute.tsx`

### E2E

- [ ] **T-111** — Testes E2E: fluxo completo de registro, login, logout, recuperação de senha
  - Arquivo: `frontend/tests/e2e/auth.spec.ts`

**Checkpoint:** Usuário consegue se registrar, fazer login, e acessar página protegida

---

## Fase 2 — Projetos (US-02)

### Backend

- [ ] **T-201** — Migration para tabelas `projects`, `project_members`, `columns` (colunas padrão), `labels`
- [ ] **T-202** — Testes unitários para `ProjectService` e `PermissionService`
- [ ] **T-203** — Implementar `ProjectService`: CRUD + gerenciamento de membros
  - Arquivo: `backend/src/services/project.service.ts`
- [ ] **T-204** — Implementar `PermissionService` com verificação de roles
  - Arquivo: `backend/src/services/permission.service.ts`
- [ ] **T-205** — Rotas e controller de projetos (com middleware de permissão)
  - Arquivos: `backend/src/routes/project.routes.ts`, `backend/src/controllers/project.controller.ts`
- [ ] **T-206** — Testes de integração para endpoints de projetos

### Frontend

- [ ] **T-207** `[P]` — Página de listagem de projetos com cards (nome, cor, membros, tarefas abertas)
  - Arquivo: `frontend/src/pages/ProjectsPage.tsx`
- [ ] **T-208** `[P]` — Modal de criação/edição de projeto com color picker
  - Arquivo: `frontend/src/components/project/ProjectModal.tsx`
- [ ] **T-209** `[P]` — Página de configurações do projeto (membros, roles, convites)
  - Arquivo: `frontend/src/pages/ProjectSettingsPage.tsx`
- [ ] **T-210** — Hook `useProject()` com TanStack Query para dados do projeto
  - Arquivo: `frontend/src/hooks/useProject.ts`

**Checkpoint:** Usuário cria projeto, convida membro, membro acessa com permissão correta

---

## Fase 3 — Board Kanban (US-03)

### Backend

- [ ] **T-301** — Migration para tabela `tasks` com índices
- [ ] **T-302** — Testes unitários para `BoardService`
- [ ] **T-303** — Implementar `BoardService`: mover tarefa entre colunas, reordenar
  - Arquivo: `backend/src/services/board.service.ts`
- [ ] **T-304** — Endpoint `PATCH /api/tasks/:id/move` (atômico: coluna + posição)
- [ ] **T-305** — Configurar Socket.IO com rooms por projeto
  - Arquivo: `backend/src/sockets/board.socket.ts`
- [ ] **T-306** — Emitir eventos Socket.IO em todas as mutações do board

### Frontend

- [ ] **T-307** `[P]` — Componente `KanbanBoard` com layout de colunas
  - Arquivo: `frontend/src/components/board/KanbanBoard.tsx`
- [ ] **T-308** `[P]` — Componente `KanbanColumn` com contador de tarefas e alerta de WIP
  - Arquivo: `frontend/src/components/board/KanbanColumn.tsx`
- [ ] **T-309** `[P]` — Componente `TaskCard` com todos os campos visuais
  - Arquivo: `frontend/src/components/board/TaskCard.tsx`
- [ ] **T-310** — Implementar drag-and-drop com `@dnd-kit/core`
  - Arquivo: `frontend/src/components/board/DragDropContext.tsx`
- [ ] **T-311** — Integrar Socket.IO no frontend, atualizar cache TanStack Query em eventos
  - Arquivo: `frontend/src/services/socket.service.ts`
- [ ] **T-312** — Barra de filtros (assignee, prioridade, etiqueta, busca por texto)
  - Arquivo: `frontend/src/components/board/BoardFilters.tsx`

**Checkpoint:** Board funciona com drag-and-drop, múltiplas abas mostram atualizações em tempo real

---

## Fase 4 — Gestão de Tarefas (US-04)

- [ ] **T-401** — Testes unitários para `TaskService`
- [ ] **T-402** — Implementar `TaskService`: CRUD completo, histórico automático
  - Arquivo: `backend/src/services/task.service.ts`
- [ ] **T-403** — Migration para tabela `activity_log`
- [ ] **T-404** `[P]` — Modal de detalhe da tarefa (todos os campos, histórico, comentários)
  - Arquivo: `frontend/src/components/task/TaskDetailModal.tsx`
- [ ] **T-405** `[P]` — Formulário de criação de tarefa com validação
  - Arquivo: `frontend/src/components/task/CreateTaskForm.tsx`
- [ ] **T-406** — Componente de edição inline de título no card
  - Arquivo: `frontend/src/components/board/TaskCard.tsx` (atualização)
- [ ] **T-407** `[P]` — Componente de histórico de atividade
  - Arquivo: `frontend/src/components/task/ActivityLog.tsx`

**Checkpoint:** Tarefa criada, editada e arquivada; histórico registra todas as mudanças

---

## Fase 5 — Colaboração (US-05)

- [ ] **T-501** — Migration para tabelas `comments` e `comment_reactions`
- [ ] **T-502** — Testes unitários para `CommentService`
- [ ] **T-503** — Implementar `CommentService`: CRUD, moderação, menções
  - Arquivo: `backend/src/services/comment.service.ts`
- [ ] **T-504** `[P]` — Componente de lista de comentários com avatar e markdown
  - Arquivo: `frontend/src/components/task/CommentList.tsx`
- [ ] **T-505** `[P]` — Editor de comentário com suporte a Markdown e @menções
  - Arquivo: `frontend/src/components/task/CommentEditor.tsx`
- [ ] **T-506** `[P]` — Componente de reações emoji
  - Arquivo: `frontend/src/components/task/CommentReactions.tsx`
- [ ] **T-507** — Notificações por email via SendGrid (menções e atribuições)
  - Arquivo: `backend/src/services/notification.service.ts`

**Checkpoint:** Usuário comenta, menciona colega, colega recebe notificação

---

## Fase 6 — Dashboard (US-06)

- [ ] **T-601** — Queries SQL para métricas (burndown, velocidade, distribuição)
  - Arquivo: `backend/src/models/dashboard.model.ts`
- [ ] **T-602** — Endpoint `GET /api/projects/:id/dashboard`
- [ ] **T-603** `[P]` — Gráfico de burndown com Recharts
  - Arquivo: `frontend/src/components/dashboard/BurndownChart.tsx`
- [ ] **T-604** `[P]` — Gráfico de velocidade (barras)
  - Arquivo: `frontend/src/components/dashboard/VelocityChart.tsx`
- [ ] **T-605** `[P]` — Gráfico de distribuição por prioridade (pizza)
  - Arquivo: `frontend/src/components/dashboard/PriorityDistribution.tsx`
- [ ] **T-606** — Painel de tarefas próximas do prazo
  - Arquivo: `frontend/src/components/dashboard/UpcomingDeadlines.tsx`
- [ ] **T-607** `[P]` — Funcionalidade de export CSV
  - Arquivo: `frontend/src/components/dashboard/ExportButton.tsx`

**Checkpoint:** Dashboard exibe todas as métricas com dados reais do projeto

---

## Resumo

| Fase | Tarefas | US Coberta |
|------|---------|-----------|
| 0 — Setup | 6 | — |
| 1 — Auth | 11 | US-01 |
| 2 — Projetos | 10 | US-02 |
| 3 — Kanban | 12 | US-03 |
| 4 — Tarefas | 7 | US-04 |
| 5 — Colaboração | 7 | US-05 |
| 6 — Dashboard | 7 | US-06 |
| **Total** | **60** | — |
```

---

## 8. `speckit-taskstoissues` — Conversão para GitHub Issues

### Comando utilizado

```
/speckit.taskstoissues
```

### O que o comando faz

O `speckit-taskstoissues` converte cada tarefa do `tasks.md` em um **GitHub Issue**, organizando-as com:
- Labels por fase (ex: `phase:auth`, `phase:board`)
- Labels por tipo (ex: `backend`, `frontend`, `e2e`, `setup`)
- Milestone para a feature (`001-taskflow-core`)
- Assignees baseados nos metadados
- Body com link para a spec e critérios de aceitação

### Exemplo de issues criadas

```
GitHub Issues criadas (60 total):

#1  [Setup] Configurar monorepo npm workspaces              [setup]
#2  [Setup] Configurar packages/backend/                    [setup, backend]
#3  [Setup] Configurar packages/frontend/                   [setup, frontend]
#4  [Setup] Criar docker-compose.yml                        [setup, devops]
#5  [Setup] Criar scripts de migração                       [setup, backend]
#6  [Setup] Configurar GitHub Actions CI                    [setup, ci-cd]
#7  [Auth] Testes unitários para AuthService                [phase:auth, backend, testing]
#8  [Auth] Implementar AuthService                          [phase:auth, backend]
...
#60 [Dashboard] Export CSV                                  [phase:dashboard, frontend]

✅ Milestone criado: TaskFlow Core (001-taskflow-core)
✅ Labels criadas: setup, backend, frontend, testing, e2e, phase:auth,
   phase:projects, phase:board, phase:tasks, phase:collaboration, phase:dashboard
✅ 60 issues criadas com sucesso
```

### Visualização no GitHub Projects

As issues são automaticamente adicionadas ao **GitHub Projects** configurado, aparecendo no board Kanban do próprio GitHub para rastreamento externo.

---

## 9. `speckit-implement` — Implementação

### Comando utilizado

```
/speckit.implement
```

### O que o agente executa

O Claude Code valida pré-requisitos e executa as tarefas em ordem, respeitando as marcações `[P]` para paralelismo:

```
🔍 Validando pré-requisitos...
  ✅ .specify/memory/constitution.md encontrado
  ✅ specs/001-taskflow-core/spec.md encontrado
  ✅ specs/001-taskflow-core/plan.md encontrado
  ✅ specs/001-taskflow-core/tasks.md encontrado

🚀 Iniciando implementação — 60 tarefas

═══════════════════════════════════════
FASE 0 — Setup de Projeto
═══════════════════════════════════════

[T-001] Configurando monorepo...
  → Criando root package.json com workspaces
  → Criando .nvmrc com Node 20
  ✅ T-001 concluída

[T-002] [P] Configurando backend...    [T-003] [P] Configurando frontend...
  → TypeScript strict mode                → Vite + React 18
  → ESLint + Prettier                     → Tailwind CSS 3.4
  → Jest + ts-jest                        → TanStack Query
  ✅ T-002 concluída                      ✅ T-003 concluída

[T-004] Criando docker-compose.yml...
  → PostgreSQL 16 com volume persistente
  → Redis 7 com autenticação
  → Health checks configurados
  ✅ T-004 concluída

[T-005] Criando sistema de migrations...
  → Script de run-migrations.ts
  → Migration 001_initial_schema.sql
  ✅ T-005 concluída

[T-006] Configurando GitHub Actions...
  → .github/workflows/ci.yml
  → Jobs: lint, test-backend, test-frontend, build
  ✅ T-006 concluída

✅ CHECKPOINT — Fase 0: Executando docker-compose up...
  PostgreSQL: healthy ✅  Redis: healthy ✅

═══════════════════════════════════════
FASE 1 — Autenticação
═══════════════════════════════════════

[T-101] Criando migration de users...
  → 002_users_and_auth.sql aplicada
  ✅ T-101 concluída

[T-102] Escrevendo testes para AuthService (TDD)...
  → 24 testes escritos
  → npm test -- auth.service: 24 FAIL (implementação pendente — esperado)
  ✅ T-102 concluída

[T-103] Implementando AuthService...
  → register(), login(), logout(), refreshToken()
  → forgotPassword(), resetPassword() com email via SendGrid
  → npm test -- auth.service: 24 PASS ✅
  ✅ T-103 concluída

...

✅ CHECKPOINT — Fase 1: Testando fluxo de auth...
  POST /api/auth/register: 201 ✅
  POST /api/auth/login: 200 ✅
  E2E auth.spec.ts: 8/8 PASS ✅

[Implementação continua para todas as 6 fases...]

═══════════════════════════════════════
IMPLEMENTAÇÃO CONCLUÍDA
═══════════════════════════════════════

📊 Resumo:
  ✅ 60/60 tarefas concluídas
  ✅ 186 testes passando (backend: 124, frontend: 62)
  ✅ Cobertura: 83% (meta: 80%) 
  ✅ 12 testes E2E Playwright passando
  ✅ Build de produção bem-sucedido
  ✅ Docker Compose funcionando
  
⚠️  Ações manuais pendentes:
  → Configurar variáveis de ambiente no Railway
  → Configurar domínio no Vercel
  → Configurar SendGrid API Key para emails
```

### Trecho de código gerado — `TaskService`

```typescript
// backend/src/services/task.service.ts
// Gerado pelo /speckit.implement seguindo plan.md e spec.md

import { db } from '../config/database';
import { ActivityService } from './activity.service';
import { SocketService } from './socket.service';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task.types';

export class TaskService {
  constructor(
    private activity: ActivityService,
    private socket: SocketService,
  ) {}

  async createTask(projectId: string, input: CreateTaskInput, userId: string): Promise<Task> {
    return db.transaction(async (client) => {
      // Obter próximo número de tarefa para o projeto (TF-001, TF-002, ...)
      const { rows: [{ next_num }] } = await client.query(
        `SELECT COALESCE(MAX(task_number), 0) + 1 AS next_num
         FROM tasks WHERE project_id = $1`,
        [projectId]
      );

      // Obter posição no final da coluna
      const { rows: [{ max_pos }] } = await client.query(
        `SELECT COALESCE(MAX(position), 0) AS max_pos
         FROM tasks WHERE column_id = $1 AND archived_at IS NULL`,
        [input.columnId]
      );

      const { rows: [task] } = await client.query(
        `INSERT INTO tasks
           (project_id, column_id, task_number, title, description,
            priority, assignee_id, points, due_date, position, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING *`,
        [
          projectId, input.columnId, next_num, input.title,
          input.description ?? null, input.priority ?? 'p2',
          input.assigneeId ?? null, input.points ?? null,
          input.dueDate ?? null, max_pos + 1000, userId
        ]
      );

      // Registrar atividade
      await this.activity.log(task.id, userId, 'created', null, {
        title: task.title,
        column: input.columnId,
      });

      // Emitir evento WebSocket para todos no projeto
      this.socket.toProject(projectId).emit('task:created', task);

      return task;
    });
  }

  async moveTask(
    taskId: string,
    targetColumnId: string,
    targetPosition: number,
    userId: string
  ): Promise<Task> {
    const { rows: [oldTask] } = await db.query(
      'SELECT * FROM tasks WHERE id = $1', [taskId]
    );

    const { rows: [task] } = await db.query(
      `UPDATE tasks
       SET column_id = $1, position = $2, updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [targetColumnId, targetPosition, taskId]
    );

    await this.activity.log(taskId, userId, 'moved', {
      columnId: oldTask.column_id,
    }, {
      columnId: targetColumnId,
    });

    this.socket.toProject(task.project_id).emit('task:moved', {
      taskId,
      fromColumnId: oldTask.column_id,
      toColumnId: targetColumnId,
      position: targetPosition,
    });

    return task;
  }
}
```

---

## 10. Estrutura de Diretórios Final

```
taskflow/
├── .specify/
│   ├── memory/
│   │   └── constitution.md          ← /speckit.constitution
│   ├── scripts/bash/
│   │   ├── create-new-feature.sh
│   │   ├── setup-plan.sh
│   │   └── setup-tasks.sh
│   └── templates/
│       ├── spec-template.md
│       ├── plan-template.md
│       └── tasks-template.md
├── .claude/
│   └── commands/
│       ├── speckit.constitution.md
│       ├── speckit.specify.md
│       ├── speckit.plan.md
│       ├── speckit.tasks.md
│       ├── speckit.taskstoissues.md
│       └── speckit.implement.md
├── specs/
│   └── 001-taskflow-core/           ← branch: 001-taskflow-core
│       ├── spec.md                  ← /speckit.specify
│       ├── plan.md                  ← /speckit.plan
│       ├── data-model.md
│       ├── quickstart.md
│       ├── research.md
│       ├── tasks.md                 ← /speckit.tasks
│       └── contracts/
│           ├── api-spec.json
│           └── websocket-spec.md
├── packages/
│   ├── backend/                     ← /speckit.implement
│   │   ├── src/
│   │   ├── tests/
│   │   └── migrations/
│   └── frontend/                    ← /speckit.implement
│       ├── src/
│       └── tests/
├── .github/
│   └── workflows/
│       └── ci.yml
├── docker-compose.yml
├── CLAUDE.md                        ← contexto para o agente
└── package.json
```

---

## 11. Resumo do Fluxo SDD

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUXO SPEC-DRIVEN DEVELOPMENT                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. /speckit.constitution                                        │
│     └─→ .specify/memory/constitution.md                         │
│         Princípios: qualidade, UX, performance, segurança        │
│                        ↓                                         │
│  2. /speckit.specify <descrição funcional>                       │
│     └─→ specs/001-taskflow-core/spec.md                         │
│         Personas, histórias de usuário, critérios de aceitação   │
│                        ↓                                         │
│  3. /speckit.plan <stack técnica>                                │
│     └─→ specs/001-taskflow-core/                                 │
│         plan.md, data-model.md, api-spec.json, research.md       │
│                        ↓                                         │
│  4. /speckit.tasks                                               │
│     └─→ specs/001-taskflow-core/tasks.md                        │
│         60 tarefas ordenadas, com [P] para paralelismo           │
│                        ↓                                         │
│  5. /speckit.taskstoissues                                       │
│     └─→ 60 GitHub Issues criadas                                 │
│         Com labels, milestone e assignees                        │
│                        ↓                                         │
│  6. /speckit.implement                                           │
│     └─→ Código implementado seguindo TDD                         │
│         83% cobertura, 186 testes passando                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Benefícios Observados

| Aspecto | Desenvolvimento Tradicional | Com SDD + Spec-Kit |
|---------|----------------------------|-------------------|
| Clareza de requisitos | Ambígua, em reuniões | Documentada, versionada |
| Rastreabilidade | Fragmentada | Issues ↔ Tarefas ↔ Spec |
| Consistência de decisões | Depende da memória | Guiada pela Constitution |
| Velocidade de implementação | Linear | Paralelizada com [P] |
| Qualidade | Variável | Garantida por DoD + TDD |
| Onboarding de novos devs | Difícil | Leitura da spec suficiente |

---

> 📌 **Nota:** Esta documentação foi gerada simulando o fluxo completo do Spec-Kit com Claude Sonnet 4.6 como agente IA parceiro. Em um ambiente real, cada comando `/speckit.*` seria executado interativamente no terminal do Claude Code, com o agente refinando iterativamente os artefatos gerados.
>
> **Repositório Spec-Kit:** https://github.com/github/spec-kit  
> **Versão utilizada:** v0.9.1  
> **Integração:** Claude Code (`--integration claude`)
