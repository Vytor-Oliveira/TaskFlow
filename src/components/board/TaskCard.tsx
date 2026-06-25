import { MessageSquare, Calendar } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useStore } from '../../store'
import { Avatar } from '../sidebar/Avatar'
import type { Task } from '../../types'
import { PRIORITY_META } from '../../types'
import { isOverdue, formatDate } from '../../utils'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { openTask, currentUserId, labels, comments } = useStore()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  const pm = PRIORITY_META[task.priority]
  const isOwn = task.assigneeId === currentUserId
  const currentUser = useStore((s) => s.users.find((u) => u.id === s.currentUserId))
  const taskLabels = labels.filter((l) => task.labelIds.includes(l.id))
  const commentCount = comments.filter((c) => c.taskId === task.id).length
  const overdue = isOverdue(task.dueDate)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white rounded-lg border transition-shadow cursor-pointer select-none group
        hover:shadow-sm active:shadow-none
        ${isOwn ? 'border-brand-200' : 'border-gray-200'}
      `}
      {...attributes}
      {...listeners}
      onClick={() => openTask(task.id)}
    >
      {isOwn && (
        <div
          className="h-0.5 rounded-t-lg"
          style={{ background: currentUser?.color }}
        />
      )}
      <div className="p-3">
        {/* Priority + title */}
        <div className="flex items-start gap-2 mb-2.5">
          <span
            className="badge mt-0.5 flex-shrink-0 text-[10px]"
            style={{ background: pm.bg, color: pm.color }}
          >
            {task.priority.toUpperCase()}
          </span>
          <p className="text-[13px] leading-snug text-gray-800 line-clamp-2">{task.title}</p>
        </div>

        {/* Labels */}
        {taskLabels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {taskLabels.slice(0, 3).map((lbl) => (
              <span
                key={lbl.id}
                className="badge text-[10px]"
                style={{ background: `${lbl.color}18`, color: lbl.color }}
              >
                {lbl.name}
              </span>
            ))}
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center gap-1.5">
          {task.dueDate && (
            <span
              className={`flex items-center gap-0.5 text-[11px] ${
                overdue ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              <Calendar size={10} />
              {formatDate(task.dueDate)}
            </span>
          )}
          <div className="flex-1" />
          {task.points && (
            <span className="text-[11px] text-gray-400">{task.points}pt</span>
          )}
          {commentCount > 0 && (
            <span className="flex items-center gap-0.5 text-[11px] text-gray-400">
              <MessageSquare size={10} />
              {commentCount}
            </span>
          )}
          <Avatar userId={task.assigneeId} size={20} />
        </div>
      </div>
    </div>
  )
}
