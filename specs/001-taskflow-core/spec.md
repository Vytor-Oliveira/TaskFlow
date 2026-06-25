# Especificação: TaskFlow Core

**Feature ID:** 001-taskflow-core  
**Status:** Implementado  
**IA parceira:** Claude Sonnet 4.6  
**Gerado via:** `speckit-specify`

---

## 👥 Personas de Usuário

### P1 — Tech Lead (Lucas)
- Gerencia equipe de 8 pessoas
- Necessidades: visibilidade do progresso, distribuição de tarefas, identificar bloqueios

### P2 — Desenvolvedor (Ana)
- Necessidades: saber o que fazer agora, contexto claro, histórico de discussões

### P3 — Product Manager (Rafael)
- Necessidades: rastrear progresso, garantir alinhamento com metas

---

## 📖 Histórias de Usuário

### US-01: Autenticação (planejado para backend)
**Como** visitante, **quero** criar uma conta e fazer login

### US-02: Gerenciamento de Projetos
**Como** usuário, **quero** criar e gerenciar projetos com controle de acesso RBAC

#### Critérios de Aceitação
- [x] Criar projeto com nome, descrição e cor
- [x] Listar projetos com nome, emoji, tarefas abertas e membros
- [x] Alternar entre projetos na sidebar

### US-03: Board Kanban
**Como** membro, **quero** visualizar e gerenciar tarefas em um board Kanban

#### Critérios de Aceitação
- [x] Board com 5 colunas: Backlog, To Do, In Progress, In Review, Done
- [x] Drag-and-drop entre colunas (via @dnd-kit)
- [x] Cards com prioridade (cor), assignee (avatar), pontos, prazo, etiquetas
- [x] Filtros por assignee, prioridade, etiqueta, texto livre
- [x] Contador de tarefas por coluna

### US-04: Gestão de Tarefas
**Como** membro, **quero** criar e editar tarefas com detalhes suficientes

#### Critérios de Aceitação
- [x] Criar tarefa com título, prioridade (P0-P3), assignee, pontos, prazo, etiquetas
- [x] Modal de detalhe com todos os campos editáveis
- [x] Histórico de atividade (futuro backend)
- [x] Arquivar tarefa (excluir com confirmação)

### US-05: Comentários e Colaboração
**Como** membro, **quero** comentar nas tarefas

#### Critérios de Aceitação
- [x] Comentários com texto e timestamp
- [x] Excluir comentário próprio
- [x] Comentários em tempo real (frontend state)

### US-06: Dashboard (planejado)
**Como** Tech Lead, **quero** visualizar métricas do projeto

---

*Gerado via `speckit-specify` — Spec-Kit v0.9.1*
