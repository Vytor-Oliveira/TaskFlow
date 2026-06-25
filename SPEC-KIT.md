# Spec-Kit SDD — TaskFlow

Este projeto foi desenvolvido usando o framework **Spec-Driven Development (SDD)** do [Spec-Kit](https://github.com/github/spec-kit) com **Claude Sonnet 4.6** como IA parceira.

## O que é SDD?

Spec-Driven Development inverte o script do desenvolvimento tradicional. Em vez de começar com código, o SDD eleva as **especificações a artefatos executáveis** que guiam diretamente a implementação.

```
Constitution → Specify → Plan → Tasks → TasksToIssues → Implement
```

## Comandos Executados

| Comando | Artefato Gerado | Descrição |
|---------|----------------|-----------|
| `speckit-constitution` | `.specify/memory/constitution.md` | Princípios de qualidade, UX, performance e segurança |
| `speckit-specify` | `specs/001-taskflow-core/spec.md` | Personas, histórias de usuário, critérios de aceitação |
| `speckit-plan` | `specs/001-taskflow-core/plan.md` | Stack técnica, estrutura do projeto, fases |
| `speckit-tasks` | `specs/001-taskflow-core/tasks.md` | 27 tarefas ordenadas com checkpoints |
| `speckit-taskstoissues` | `specs/001-taskflow-core/taskstoissues.md` | Conversão para GitHub Issues com labels e milestone |
| `speckit-implement` | `specs/001-taskflow-core/implement.md` | Log de implementação com checkpoints por fase |

## Estrutura SDD

```
taskflow/
├── .specify/
│   └── memory/
│       └── constitution.md       ← speckit-constitution
├── specs/
│   └── 001-taskflow-core/
│       ├── spec.md               ← speckit-specify
│       ├── plan.md               ← speckit-plan
│       ├── tasks.md              ← speckit-tasks
│       ├── taskstoissues.md      ← speckit-taskstoissues
│       └── implement.md          ← speckit-implement
├── docs/
│   └── SDD-DOCUMENTATION.md     ← Documentação completa do processo
└── src/                          ← Código implementado
```

## Instalação e Uso

```bash
# Instalar Spec-Kit
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.9.1

# Inicializar projeto com Claude
specify init meu-projeto --integration claude

# Executar os comandos no Claude Code
/speckit.constitution
/speckit.specify <descrição do projeto>
/speckit.plan <stack técnica>
/speckit.tasks
/speckit.taskstoissues
/speckit.implement
```

## Rodar o Projeto

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Bundle de produção
```

## Referências

- [Spec-Kit Repository](https://github.com/github/spec-kit)
- [Documentação completa SDD](./docs/SDD-DOCUMENTATION.md)
- [Spec da feature](./specs/001-taskflow-core/spec.md)
- [Constitution do projeto](./.specify/memory/constitution.md)
