import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import { useStore } from '../../store'
import { KanbanColumn } from './KanbanColumn'
import { FiltersBar } from '../filters/FiltersBar'
import { COLUMNS, type ColumnName } from '../../types'

export function KanbanBoard() {
  const { activeProjectId, projects, moveTask, getFilteredTasks, getProjectTasks, tasks } =
    useStore()

  const project = projects.find((p) => p.id === activeProjectId)
  const filteredTasks = getFilteredTasks(activeProjectId)
  const allProjectTasks = getProjectTasks(activeProjectId)
  const doneCount = allProjectTasks.filter((t) => t.col === 'Done').length
  const totalCount = allProjectTasks.length
  const progress = totalCount ? Math.round((doneCount / totalCount) * 100) : 0

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  )

  function handleDragOver(_event: DragOverEvent) {
    // Handled in handleDragEnd for simplicity
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const taskId = active.id as string
    const overId = over.id as string

    // Over a column droppable
    if (COLUMNS.includes(overId as ColumnName)) {
      moveTask(taskId, overId as ColumnName)
      return
    }

    // Over another task card — move to that task's column
    const overTask = tasks.find((t) => t.id === overId)
    if (overTask) {
      moveTask(taskId, overTask.col)
    }
  }

  if (!project) return null

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 bg-white flex-shrink-0">
        <span className="text-lg">{project.emoji}</span>
        <span className="text-[15px] font-semibold text-gray-900">{project.name}</span>

        {/* Progress bar */}
        <div className="flex items-center gap-2 ml-2">
          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: project.color }}
            />
          </div>
          <span className="text-[12px] text-gray-400">
            {doneCount}/{totalCount}
          </span>
        </div>

        <div className="flex-1" />

        {/* Members */}
        <div className="flex -space-x-1.5">
          {useStore
            .getState()
            .users.slice(0, 4)
            .map((u) => (
              <div
                key={u.id}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium border-2 border-white"
                style={{ background: `${u.color}20`, color: u.color }}
                title={u.name}
              >
                {u.initials}
              </div>
            ))}
        </div>
      </div>

      <FiltersBar />

      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-4 h-full p-5 min-w-max">
            {COLUMNS.map((col) => (
              <KanbanColumn
                key={col}
                name={col}
                tasks={filteredTasks.filter((t) => t.col === col)}
              />
            ))}
          </div>
        </div>
      </DndContext>
    </div>
  )
}
