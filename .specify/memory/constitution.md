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
*Gerado via `speckit-constitution` — Spec-Kit v0.9.1*
*IA parceira: Claude Sonnet 4.6 (Anthropic)*
