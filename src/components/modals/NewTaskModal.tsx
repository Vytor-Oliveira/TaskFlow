import { useRef, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useStore } from '../../store'
import type { Priority } from '../../types'
import { PRIORITY_META } from '../../types'

export function NewTaskModal() {
  const { newTaskCol, setNewTaskCol, addTask, activeProjectId, currentUserId } = useStore()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('p2')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (newTaskCol) {
      setTitle('')
      setPriority('p2')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [newTaskCol])

  if (!newTaskCol) return null

  function handleSubmit() {
    if (!title.trim() || !newTaskCol) return
    addTask({
      projectId: activeProjectId,
      col: newTaskCol,
      title: title.trim(),
      description: '',
      priority,
      assigneeId: currentUserId,
      points: null,
      dueDate: null,
      labelIds: [],
      createdBy: currentUserId,
    })
    setTitle('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') setNewTaskCol(null)
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) setNewTaskCol(null)
      }}
    >
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg w-[400px] max-w-[90vw] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-semibold text-gray-900">
            Nova tarefa — <span className="text-gray-500 font-normal">{newTaskCol}</span>
          </h3>
          <button
            onClick={() => setNewTaskCol(null)}
            className="btn-ghost p-1"
            aria-label="Fechar"
          >
            <X size={15} />
          </button>
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Título da tarefa..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input mb-3"
        />

        <div className="flex items-center gap-2 mb-4">
          <label className="text-[12px] text-gray-500">Prioridade:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="text-[12px] border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700 cursor-pointer outline-none"
          >
            {Object.entries(PRIORITY_META).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 justify-end">
          <button onClick={() => setNewTaskCol(null)} className="btn text-[13px]">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="btn-primary text-[13px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Criar tarefa
          </button>
        </div>
      </div>
    </div>
  )
}
