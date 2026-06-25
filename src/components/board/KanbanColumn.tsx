import { Plus } from 'lucide-react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useStore } from '../../store'
import { TaskCard } from './TaskCard'
import type { ColumnName, Task } from '../../types'

interface KanbanColumnProps {
  name: ColumnName
  tasks: Task[]
}

const COL_ACCENT: Record<ColumnName, string> = {
  'Backlog':     '#9CA3AF',
  'To Do':       '#60A5FA',
  'In Progress': '#A78BFA',
  'In Review':   '#FB923C',
  'Done':        '#34D399',
}

export function KanbanColumn({ name, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: name })
  const { setNewTaskCol, getProjectTasks, activeProjectId } = useStore()

  const allColTasks = getProjectTasks(activeProjectId).filter((t) => t.col === name)

  return (
    <div className="flex flex-col flex-shrink-0 w-60">
      {/* Column header */}
      <div className="flex items-center gap-2 px-1 pb-2 flex-shrink-0">
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: COL_ACCENT[name] }}
        />
        <span className="text-[13px] font-medium text-gray-700">{name}</span>
        <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
          {allColTasks.length}
        </span>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={`
          flex-1 flex flex-col gap-2 p-1.5 rounded-lg border-2 border-dashed transition-colors min-h-[60px]
          ${isOver ? 'border-brand-300 bg-brand-50' : 'border-transparent'}
        `}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>

        {/* Add task button */}
        <button
          onClick={() => setNewTaskCol(name)}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[12px] text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors w-full"
        >
          <Plus size={13} />
          Adicionar tarefa
        </button>
      </div>
    </div>
  )
}
