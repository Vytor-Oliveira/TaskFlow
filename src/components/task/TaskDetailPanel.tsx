import { useRef, useEffect } from 'react'
import { X, Trash2 } from 'lucide-react'
import { useStore } from '../../store'
import { Avatar } from '../sidebar/Avatar'
import { PRIORITY_META, COLUMNS, type Priority, type ColumnName } from '../../types'
import { timeAgo } from '../../utils'

export function TaskDetailPanel() {
  const {
    openTaskId, closeTask, tasks, projects, labels, users,
    activeProjectId, currentUserId, updateTask, deleteTask,
    getTaskComments, addComment, deleteComment,
    commentDraft, setCommentDraft,
  } = useStore()

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const task = tasks.find((t) => t.id === openTaskId)
  const project = projects.find((p) => p.id === activeProjectId)
  const comments = task ? getTaskComments(task.id) : []
  const taskLabels = task ? labels.filter((l) => task.labelIds.includes(l.id)) : []

  useEffect(() => {
    if (openTaskId) setCommentDraft('')
  }, [openTaskId])

  if (!task || !project) return null

  const pm = PRIORITY_META[task.priority]

  function handleSubmitComment() {
    if (!commentDraft.trim() || !task) return
    addComment(task.id, commentDraft.trim())
  }

  return (
    <div
      className="fixed inset-0 z-40 bg-black/20"
      onClick={(e) => { if (e.target === e.currentTarget) closeTask() }}
    >
      <div className="absolute right-0 top-0 bottom-0 w-[460px] max-w-full bg-white border-l border-gray-200 flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 flex-shrink-0">
          <button onClick={closeTask} className="btn-ghost p-1" aria-label="Fechar painel">
            <X size={15} />
          </button>
          <span className="text-[12px] text-gray-400">
            {project.emoji} {project.name}
          </span>
          <div className="flex-1" />
          {/* Move column */}
          <select
            value={task.col}
            onChange={(e) => updateTask(task.id, { col: e.target.value as ColumnName })}
            className="text-[12px] border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700 cursor-pointer outline-none"
          >
            {COLUMNS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button
            onClick={() => deleteTask(task.id)}
            className="btn-ghost p-1 text-red-400 hover:text-red-600"
            title="Excluir tarefa"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-5">
            {/* Priority badge */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="badge text-[11px]"
                style={{ background: pm.bg, color: pm.color }}
              >
                {pm.label}
              </span>
              <select
                value={task.priority}
                onChange={(e) => updateTask(task.id, { priority: e.target.value as Priority })}
                className="text-[11px] border border-gray-200 rounded px-1.5 py-0.5 bg-white text-gray-600 cursor-pointer outline-none ml-auto"
              >
                {Object.entries(PRIORITY_META).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <h2 className="text-[17px] font-semibold text-gray-900 leading-snug mb-5">
              {task.title}
            </h2>

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {/* Assignee */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[11px] text-gray-400 mb-1.5">Assignee</p>
                <select
                  value={task.assigneeId ?? ''}
                  onChange={(e) =>
                    updateTask(task.id, { assigneeId: e.target.value || null })
                  }
                  className="text-[13px] bg-transparent border-none outline-none w-full text-gray-700 cursor-pointer"
                >
                  <option value="">Sem assignee</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>

              {/* Points */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[11px] text-gray-400 mb-1.5">Story points</p>
                <select
                  value={task.points ?? ''}
                  onChange={(e) =>
                    updateTask(task.id, {
                      points: e.target.value ? parseFloat(e.target.value) : null,
                    })
                  }
                  className="text-[13px] bg-transparent border-none outline-none w-full text-gray-700 cursor-pointer"
                >
                  <option value="">Sem estimativa</option>
                  {[0.5, 1, 2, 3, 5, 8, 13].map((p) => (
                    <option key={p} value={p}>{p} pts</option>
                  ))}
                </select>
              </div>

              {/* Due date */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[11px] text-gray-400 mb-1.5">Prazo</p>
                <input
                  type="date"
                  value={task.dueDate ?? ''}
                  onChange={(e) => updateTask(task.id, { dueDate: e.target.value || null })}
                  className="text-[13px] bg-transparent border-none outline-none w-full text-gray-700 cursor-pointer"
                />
              </div>

              {/* Labels */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[11px] text-gray-400 mb-1.5">Etiquetas</p>
                {taskLabels.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {taskLabels.map((lbl) => (
                      <span
                        key={lbl.id}
                        className="badge text-[10px]"
                        style={{ background: `${lbl.color}18`, color: lbl.color }}
                      >
                        {lbl.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[12px] text-gray-400">Nenhuma</p>
                )}
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <div className="mb-5">
                <p className="text-[11px] text-gray-400 mb-2">Descrição</p>
                <p className="text-[13px] text-gray-600 leading-relaxed">{task.description}</p>
              </div>
            )}

            {/* Comments */}
            <div className="border-t border-gray-100 pt-5">
              <p className="text-[13px] font-medium text-gray-900 mb-4">
                Comentários{' '}
                <span className="text-gray-400 font-normal">({comments.length})</span>
              </p>

              <div className="space-y-4 mb-4">
                {comments.map((comment) => {
                  const author = users.find((u) => u.id === comment.authorId)
                  const isOwn = comment.authorId === currentUserId
                  return (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar userId={comment.authorId} size={28} />
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-[13px] font-medium text-gray-900">
                            {author?.name ?? 'Desconhecido'}
                          </span>
                          <span className="text-[11px] text-gray-400">{timeAgo(comment.createdAt)}</span>
                          {isOwn && (
                            <button
                              onClick={() => deleteComment(comment.id, task.id)}
                              className="ml-auto text-gray-300 hover:text-red-400 transition-colors"
                              title="Excluir comentário"
                            >
                              <Trash2 size={11} />
                            </button>
                          )}
                        </div>
                        <div className="text-[13px] text-gray-700 bg-gray-50 rounded-lg px-3 py-2 leading-relaxed">
                          {comment.text}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {comments.length === 0 && (
                  <p className="text-[13px] text-gray-400 italic">Nenhum comentário ainda.</p>
                )}
              </div>

              {/* New comment */}
              <div className="flex gap-3">
                <Avatar userId={currentUserId} size={28} />
                <div className="flex-1">
                  <textarea
                    ref={textareaRef}
                    rows={2}
                    placeholder="Escrever comentário..."
                    value={commentDraft}
                    onChange={(e) => setCommentDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmitComment()
                    }}
                    className="input resize-none mb-2 text-[13px]"
                  />
                  <button
                    onClick={handleSubmitComment}
                    disabled={!commentDraft.trim()}
                    className="btn text-[12px] disabled:opacity-40"
                  >
                    Enviar <span className="text-gray-400">⌘↵</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
