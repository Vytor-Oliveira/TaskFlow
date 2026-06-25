# Tarefas de Implementação — TaskFlow Core

**Gerado via:** `speckit-tasks`  
**IA parceira:** Claude Sonnet 4.6

> **Legenda:** ✅ Concluída | `[P]` Pode ser executada em paralelo

---

## Fase 0 — Setup de Projeto

- [x] **T-001** — Configurar projeto Vite + React + TypeScript
- [x] **T-002** `[P]` — Configurar Tailwind CSS 3.4
- [x] **T-003** `[P]` — Configurar Zustand com persistência localStorage
- [x] **T-004** — Criar estrutura de tipos TypeScript (`src/types/index.ts`)
- [x] **T-005** — Criar dados seed (3 projetos, 19 tarefas, 4 usuários, comentários)
- [x] **T-006** — Criar utilitários (`timeAgo`, `formatDate`, `isOverdue`)

**Checkpoint ✅:** `npm run dev` inicia o projeto; `npm run build` compila sem erros

---

## Fase 1 — Sidebar e Navegação

- [x] **T-101** — Componente `Avatar` reutilizável com iniciais e cor do usuário
- [x] **T-102** — Componente `Sidebar` com lista de projetos, contagem de tarefas abertas e usuário atual
- [x] **T-103** — Store: ações `setActiveProject`, `setFilters`, `clearFilters`

**Checkpoint ✅:** Sidebar exibe 3 projetos; clique alterna o projeto ativo

---

## Fase 2 — Board Kanban

- [x] **T-201** — Componente `KanbanBoard` com DnD context (@dnd-kit) e header do projeto
- [x] **T-202** `[P]` — Componente `KanbanColumn` com drop zone e contador de tarefas
- [x] **T-203** `[P]` — Componente `TaskCard` draggable com prioridade, labels, prazo, assignee, pontos
- [x] **T-204** — Lógica de drag-and-drop: mover tarefa entre colunas via `handleDragEnd`
- [x] **T-205** — Barra de progresso no header (tarefas Done / total)

**Checkpoint ✅:** Drag-and-drop funcional entre as 5 colunas

---

## Fase 3 — Filtros

- [x] **T-301** — Componente `FiltersBar` com filtros por assignee, prioridade, etiqueta e busca de texto
- [x] **T-302** — Filtros compostos: múltiplos filtros aplicados simultaneamente
- [x] **T-303** — Botão "Limpar filtros" visível apenas quando há filtro ativo
- [x] **T-304** — Store: seletor `getFilteredTasks` aplicando todos os filtros

**Checkpoint ✅:** Filtros funcionam em combinação; board atualiza em tempo real

---

## Fase 4 — Gestão de Tarefas

- [x] **T-401** — Componente `NewTaskModal` com título, prioridade e criação atômica
- [x] **T-402** `[P]` — Componente `TaskDetailPanel` com slide-in lateral
- [x] **T-403** `[P]` — Edição de status (select de coluna), prioridade, assignee, pontos, prazo
- [x] **T-404** — Deletar tarefa com limpeza de comentários associados
- [x] **T-405** — Labels visíveis no card e no painel de detalhe

**Checkpoint ✅:** Criar, editar e excluir tarefas; todas as mudanças persistem no localStorage

---

## Fase 5 — Comentários

- [x] **T-501** — Seção de comentários no `TaskDetailPanel`
- [x] **T-502** — Adicionar comentário com `⌘↵` ou botão Enviar
- [x] **T-503** — Excluir comentário próprio
- [x] **T-504** — Exibir autor, timestamp relativo e texto do comentário

**Checkpoint ✅:** Comentários funcionam; contagem atualizada no card

---

## Resumo

| Fase | Tarefas | Status |
|------|---------|--------|
| 0 — Setup | 6 | ✅ Concluída |
| 1 — Sidebar | 3 | ✅ Concluída |
| 2 — Kanban | 5 | ✅ Concluída |
| 3 — Filtros | 4 | ✅ Concluída |
| 4 — Tarefas | 5 | ✅ Concluída |
| 5 — Comentários | 4 | ✅ Concluída |
| **Total** | **27** | **✅ 27/27** |

---

*Gerado via `speckit-tasks` — Spec-Kit v0.9.1*
