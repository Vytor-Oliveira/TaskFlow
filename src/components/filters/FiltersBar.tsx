import { Search, X } from 'lucide-react'
import { useStore } from '../../store'
import { PRIORITY_META } from '../../types'

export function FiltersBar() {
  const { users, labels, activeProjectId, tasks, filters, setFilters, clearFilters } = useStore()

  const projectLabels = labels.filter((lbl) =>
    tasks.some((t) => t.projectId === activeProjectId && t.labelIds.includes(lbl.id))
  )

  const hasFilter = filters.assigneeId || filters.priority || filters.labelId || filters.search

  return (
    <div className="flex items-center gap-2 px-5 py-2.5 border-b border-gray-100 bg-white overflow-x-auto flex-shrink-0">
      {/* Search */}
      <div className="flex items-center gap-1.5 text-gray-400">
        <Search size={14} />
        <input
          type="text"
          placeholder="Buscar tarefas..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="text-[13px] bg-transparent border-none outline-none w-36 text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="w-px h-4 bg-gray-200 flex-shrink-0" />

      {/* Assignee */}
      <select
        value={filters.assigneeId}
        onChange={(e) => setFilters({ assigneeId: e.target.value })}
        className="text-[12px] border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700 cursor-pointer outline-none focus:ring-1 focus:ring-brand-400"
      >
        <option value="">Todos assignees</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      {/* Priority */}
      <select
        value={filters.priority}
        onChange={(e) => setFilters({ priority: e.target.value })}
        className="text-[12px] border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700 cursor-pointer outline-none focus:ring-1 focus:ring-brand-400"
      >
        <option value="">Todas prioridades</option>
        {Object.entries(PRIORITY_META).map(([k, v]) => (
          <option key={k} value={k}>
            {v.label}
          </option>
        ))}
      </select>

      {/* Label */}
      {projectLabels.length > 0 && (
        <select
          value={filters.labelId}
          onChange={(e) => setFilters({ labelId: e.target.value })}
          className="text-[12px] border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700 cursor-pointer outline-none focus:ring-1 focus:ring-brand-400"
        >
          <option value="">Todas etiquetas</option>
          {projectLabels.map((lbl) => (
            <option key={lbl.id} value={lbl.id}>
              {lbl.name}
            </option>
          ))}
        </select>
      )}

      {/* Clear */}
      {hasFilter && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 text-[12px] text-gray-500 hover:text-gray-700 border border-gray-200 rounded-md px-2 py-1 transition-colors whitespace-nowrap"
        >
          <X size={11} />
          Limpar
        </button>
      )}
    </div>
  )
}
