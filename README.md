# TaskFlow

Sistema de gestão de tarefas para equipes, construído com Spec-Driven Development usando o [Spec-Kit](https://github.com/github/spec-kit).

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + TypeScript |
| Estilização | Tailwind CSS 3 |
| Estado | Zustand (com persistência em localStorage) |
| Drag & drop | @dnd-kit/core + @dnd-kit/sortable |
| Ícones | Lucide React |
| Build | Vite 5 |

## Funcionalidades

- ✅ 3 projetos com boards Kanban independentes
- ✅ 5 colunas: Backlog → To Do → In Progress → In Review → Done
- ✅ Drag-and-drop entre colunas (via @dnd-kit)
- ✅ Filtros por assignee, prioridade, etiqueta e busca de texto
- ✅ Criação de tarefas com prioridade
- ✅ Painel de detalhe: edição de status, assignee, pontos, prazo
- ✅ Comentários com criação e exclusão
- ✅ Persistência via localStorage
- ✅ Indicador de progresso por projeto
- ✅ Destaque visual em tarefas do usuário atual

## Como rodar

```bash
# Instalar dependências
npm install

# Modo desenvolvimento
npm run dev

# Build de produção
npm run build
```

## Estrutura de arquivos

```
src/
├── components/
│   ├── board/
│   │   ├── KanbanBoard.tsx     # Board principal com DnD context
│   │   ├── KanbanColumn.tsx    # Coluna com drop zone
│   │   └── TaskCard.tsx        # Card de tarefa draggable
│   ├── filters/
│   │   └── FiltersBar.tsx      # Barra de filtros
│   ├── modals/
│   │   └── NewTaskModal.tsx    # Modal de criação de tarefa
│   ├── sidebar/
│   │   ├── Sidebar.tsx         # Navegação lateral com projetos
│   │   └── Avatar.tsx          # Avatar reutilizável de usuário
│   └── task/
│       └── TaskDetailPanel.tsx # Painel lateral de detalhe + comentários
├── data/
│   └── seed.ts                 # Dados iniciais (3 projetos, 19 tarefas, 4 usuários)
├── hooks/                      # (pronto para hooks customizados)
├── store/
│   └── index.ts                # Zustand store centralizado
├── types/
│   └── index.ts                # TypeScript types e constantes
├── utils/
│   └── index.ts                # Helpers (timeAgo, formatDate, isOverdue)
├── App.tsx
├── main.tsx
└── index.css
```

## Próximos passos (backend)

Conforme o plano SDD em `specs/001-taskflow-core/plan.md`:

1. Node.js + Express + PostgreSQL (backend real)
2. Socket.IO para atualizações em tempo real
3. JWT authentication
4. Deploy: Railway (backend) + Vercel (frontend)

## Documentação SDD

Ver `taskflow-sdd-documentation.md` para o processo completo de Spec-Driven Development
usando todos os comandos do Spec-Kit.
