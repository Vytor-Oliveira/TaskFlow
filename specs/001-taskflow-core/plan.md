# Plano de Implementação — TaskFlow Core

**Gerado via:** `speckit-plan`  
**IA parceira:** Claude Sonnet 4.6

---

## Stack Técnica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Frontend | React + TypeScript | 18.3 / 5.4 |
| Estilização | Tailwind CSS | 3.4 |
| Estado | Zustand + localStorage | 4.5 |
| Drag-and-drop | @dnd-kit/core + sortable | 6.x / 8.x |
| Ícones | Lucide React | 0.383 |
| Build | Vite | 5.x |

## Estrutura do Projeto

```
src/
├── components/
│   ├── board/
│   │   ├── KanbanBoard.tsx   # DnD context + header
│   │   ├── KanbanColumn.tsx  # Coluna com drop zone
│   │   └── TaskCard.tsx      # Card draggable
│   ├── filters/
│   │   └── FiltersBar.tsx    # Filtros
│   ├── modals/
│   │   └── NewTaskModal.tsx  # Criação de tarefa
│   ├── sidebar/
│   │   ├── Sidebar.tsx       # Navegação + projetos
│   │   └── Avatar.tsx        # Avatar reutilizável
│   └── task/
│       └── TaskDetailPanel.tsx # Detalhe + comentários
├── data/
│   └── seed.ts               # Dados iniciais
├── store/
│   └── index.ts              # Zustand store
├── types/
│   └── index.ts              # TypeScript types
└── utils/
    └── index.ts              # Helpers
```

## Fases de Implementação

### Fase 1 — Foundation ✅
- Setup Vite + React + TypeScript + Tailwind
- Estrutura de pastas e tipos
- Dados seed (3 projetos, 19 tarefas, 4 usuários)
- Zustand store com persistência localStorage

### Fase 2 — Kanban Board ✅
- Sidebar com lista de projetos
- Board com 5 colunas
- Drag-and-drop com @dnd-kit
- Task cards com todos os metadados visuais

### Fase 3 — Gestão de Tarefas ✅
- Modal de criação de tarefa
- Painel lateral de detalhe
- Edição de status, prioridade, assignee, pontos, prazo

### Fase 4 — Colaboração ✅
- Sistema de comentários
- Filtros por assignee, prioridade, etiqueta, texto

### Fase 5 — Backend (próximos passos)
- Node.js + Express + PostgreSQL
- JWT autenticação
- Socket.IO para tempo real
- Deploy Railway + Vercel

---

*Gerado via `speckit-plan` — Spec-Kit v0.9.1*
