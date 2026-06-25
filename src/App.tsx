import { Sidebar } from './components/sidebar/Sidebar'
import { KanbanBoard } from './components/board/KanbanBoard'
import { NewTaskModal } from './components/modals/NewTaskModal'
import { TaskDetailPanel } from './components/task/TaskDetailPanel'
import { useStore } from './store'

export default function App() {
  const openTaskId = useStore((s) => s.openTaskId)
  const newTaskCol = useStore((s) => s.newTaskCol)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <KanbanBoard />
      </main>
      {newTaskCol && <NewTaskModal />}
      {openTaskId && <TaskDetailPanel />}
    </div>
  )
}
