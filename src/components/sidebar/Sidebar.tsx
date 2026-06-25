import { useStore } from '../../store'
import { Avatar } from './Avatar'

export function Sidebar() {
  const { projects, activeProjectId, setActiveProject, currentUserId, tasks } = useStore()
  const currentUser = useStore((s) => s.users.find((u) => u.id === s.currentUserId))

  return (
    <aside className="w-52 min-w-[208px] flex flex-col bg-white border-r border-gray-200 overflow-hidden">
      {/* Logo */}
      <div className="px-4 py-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-brand-600 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
              <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity=".7" />
              <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity=".5" />
              <rect x="8" y="8" width="5" height="5" rx="1" fill="white" opacity=".3" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-900">TaskFlow</span>
        </div>
      </div>

      {/* Projects */}
      <div className="flex-1 overflow-y-auto p-2">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-2">
          Projetos
        </p>
        <nav className="space-y-0.5">
          {projects.map((project) => {
            const open = tasks.filter(
              (t) => t.projectId === project.id && t.col !== 'Done'
            ).length
            const isActive = project.id === activeProjectId

            return (
              <button
                key={project.id}
                onClick={() => setActiveProject(project.id)}
                className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-left transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-800'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-base leading-none">{project.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[13px] truncate ${
                      isActive ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    {project.name}
                  </p>
                  <p className="text-[11px] text-gray-400">{open} abertas</p>
                </div>
                {isActive && (
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: project.color }}
                  />
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Current user */}
      {currentUser && (
        <div className="p-3 border-t border-gray-100 flex items-center gap-2.5">
          <Avatar userId={currentUserId} size={32} />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium truncate text-gray-900">{currentUser.name}</p>
            <p className="text-[11px] text-gray-400">Membro</p>
          </div>
        </div>
      )}
    </aside>
  )
}
