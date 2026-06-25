# GitHub Issues — TaskFlow Core

**Gerado via:** `speckit-taskstoissues`  
**IA parceira:** Claude Sonnet 4.6

---

## O que este comando faz

O `speckit-taskstoissues` converte cada tarefa do `tasks.md` em um **GitHub Issue**, organizando-as com:
- Labels por fase (`phase:setup`, `phase:board`, `phase:filters`, etc.)
- Labels por tipo (`frontend`, `backend`, `testing`, `devops`)
- Milestone para a feature (`001-taskflow-core`)
- Body com link para a spec e critérios de aceitação

## Issues Criadas (simulação)

```
#1  [Setup] Configurar projeto Vite + React + TypeScript        [setup, frontend]
#2  [Setup] Configurar Tailwind CSS                             [setup, frontend]
#3  [Setup] Configurar Zustand com localStorage                 [setup, frontend]
#4  [Setup] Criar estrutura de tipos TypeScript                 [setup, frontend]
#5  [Setup] Criar dados seed                                    [setup, frontend]
#6  [Setup] Criar utilitários                                   [setup, frontend]
#7  [Sidebar] Componente Avatar                                 [phase:sidebar, frontend]
#8  [Sidebar] Componente Sidebar com projetos                   [phase:sidebar, frontend]
#9  [Sidebar] Store: ações de projeto e filtros                 [phase:sidebar, frontend]
#10 [Board] KanbanBoard com DnD context                        [phase:board, frontend]
#11 [Board] KanbanColumn com drop zone                         [phase:board, frontend]
#12 [Board] TaskCard draggable                                  [phase:board, frontend]
#13 [Board] Lógica drag-and-drop                               [phase:board, frontend]
#14 [Board] Barra de progresso                                  [phase:board, frontend]
#15 [Filters] FiltersBar                                        [phase:filters, frontend]
#16 [Filters] Filtros compostos                                 [phase:filters, frontend]
#17 [Filters] Botão limpar filtros                              [phase:filters, frontend]
#18 [Filters] Seletor getFilteredTasks                          [phase:filters, frontend]
#19 [Tasks] NewTaskModal                                        [phase:tasks, frontend]
#20 [Tasks] TaskDetailPanel                                     [phase:tasks, frontend]
#21 [Tasks] Edição de campos no painel                          [phase:tasks, frontend]
#22 [Tasks] Deletar tarefa                                      [phase:tasks, frontend]
#23 [Tasks] Labels no card e painel                             [phase:tasks, frontend]
#24 [Comments] Seção de comentários                             [phase:comments, frontend]
#25 [Comments] Adicionar comentário                             [phase:comments, frontend]
#26 [Comments] Excluir comentário                               [phase:comments, frontend]
#27 [Comments] Exibir autor e timestamp                         [phase:comments, frontend]

✅ Milestone criado: TaskFlow Core (001-taskflow-core)
✅ Labels criadas: setup, phase:sidebar, phase:board, phase:filters,
                   phase:tasks, phase:comments, frontend, backend, testing
✅ 27 issues convertidas
```

## Próximas Issues (Backend — fase futura)

```
#28 [Auth] Implementar JWT authentication                       [backend, auth]
#29 [Auth] Registro e login de usuários                         [backend, auth]
#30 [DB] Schema PostgreSQL                                      [backend, database]
#31 [DB] Migrations                                             [backend, database]
#32 [API] Endpoints REST de projetos                            [backend, api]
#33 [API] Endpoints REST de tarefas                             [backend, api]
#34 [WS] Socket.IO para tempo real                              [backend, realtime]
#35 [Deploy] Railway + Vercel CI/CD                             [devops]
```

---

*Gerado via `speckit-taskstoissues` — Spec-Kit v0.9.1*
