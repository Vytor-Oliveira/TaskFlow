import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, Task, Comment, ColumnName, Filters } from '../types'
import { SEED_DATA } from '../data/seed'

interface UIState {
  activeProjectId: string
  openTaskId: string | null
  filters: Filters
  newTaskCol: ColumnName | null
  commentDraft: string
}

interface TaskFlowStore extends AppState, UIState {
  // UI actions
  setActiveProject: (id: string) => void
  openTask: (id: string) => void
  closeTask: () => void
  setFilters: (f: Partial<Filters>) => void
  clearFilters: () => void
  setNewTaskCol: (col: ColumnName | null) => void
  setCommentDraft: (text: string) => void

  // Task actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'commentIds'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  moveTask: (taskId: string, toCol: ColumnName) => void
  deleteTask: (id: string) => void

  // Comment actions
  addComment: (taskId: string, text: string) => void
  deleteComment: (commentId: string, taskId: string) => void

  // Selectors (computed)
  getProjectTasks: (projectId: string) => Task[]
  getFilteredTasks: (projectId: string) => Task[]
  getTaskComments: (taskId: string) => Comment[]
}

const EMPTY_FILTERS: Filters = { assigneeId: '', priority: '', labelId: '', search: '' }

export const useStore = create<TaskFlowStore>()(
  persist(
    (set, get) => ({
      // --- Initial data ---
      ...SEED_DATA,

      // --- UI state ---
      activeProjectId: 'p1',
      openTaskId: null,
      filters: EMPTY_FILTERS,
      newTaskCol: null,
      commentDraft: '',

      // --- UI actions ---
      setActiveProject: (id) =>
        set({ activeProjectId: id, openTaskId: null, filters: EMPTY_FILTERS }),

      openTask: (id) => set({ openTaskId: id, commentDraft: '' }),
      closeTask: () => set({ openTaskId: null }),

      setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),
      clearFilters: () => set({ filters: EMPTY_FILTERS }),

      setNewTaskCol: (col) => set({ newTaskCol: col }),
      setCommentDraft: (text) => set({ commentDraft: text }),

      // --- Task actions ---
      addTask: (taskData) => {
        const id = `t-${Date.now()}`
        const task: Task = { ...taskData, id, createdAt: Date.now(), commentIds: [] }
        set((s) => ({ tasks: [...s.tasks, task], newTaskCol: null }))
      },

      updateTask: (id, updates) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),

      moveTask: (taskId, toCol) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, col: toCol } : t)),
        })),

      deleteTask: (id) =>
        set((s) => ({
          tasks: s.tasks.filter((t) => t.id !== id),
          comments: s.comments.filter((c) => c.taskId !== id),
          openTaskId: s.openTaskId === id ? null : s.openTaskId,
        })),

      // --- Comment actions ---
      addComment: (taskId, text) => {
        const id = `c-${Date.now()}`
        const comment: Comment = {
          id,
          taskId,
          authorId: get().currentUserId,
          text,
          createdAt: Date.now(),
        }
        set((s) => ({
          comments: [...s.comments, comment],
          tasks: s.tasks.map((t) =>
            t.id === taskId ? { ...t, commentIds: [...t.commentIds, id] } : t
          ),
          commentDraft: '',
        }))
      },

      deleteComment: (commentId, taskId) =>
        set((s) => ({
          comments: s.comments.filter((c) => c.id !== commentId),
          tasks: s.tasks.map((t) =>
            t.id === taskId
              ? { ...t, commentIds: t.commentIds.filter((cid) => cid !== commentId) }
              : t
          ),
        })),

      // --- Selectors ---
      getProjectTasks: (projectId) =>
        get().tasks.filter((t) => t.projectId === projectId),

      getFilteredTasks: (projectId) => {
        const { tasks, filters } = get()
        return tasks.filter((t) => {
          if (t.projectId !== projectId) return false
          if (filters.assigneeId && t.assigneeId !== filters.assigneeId) return false
          if (filters.priority && t.priority !== filters.priority) return false
          if (filters.labelId && !t.labelIds.includes(filters.labelId)) return false
          if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase()))
            return false
          return true
        })
      },

      getTaskComments: (taskId) =>
        get().comments.filter((c) => c.taskId === taskId).sort((a, b) => a.createdAt - b.createdAt),
    }),
    {
      name: 'taskflow-store',
      partialize: (s) => ({
        currentUserId: s.currentUserId,
        users: s.users,
        projects: s.projects,
        labels: s.labels,
        tasks: s.tasks,
        comments: s.comments,
        activeProjectId: s.activeProjectId,
      }),
    }
  )
)
