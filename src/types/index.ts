export type Priority = 'p0' | 'p1' | 'p2' | 'p3'

export type ProjectRole = 'owner' | 'admin' | 'member' | 'viewer'

export type ColumnName = 'Backlog' | 'To Do' | 'In Progress' | 'In Review' | 'Done'

export const COLUMNS: ColumnName[] = ['Backlog', 'To Do', 'In Progress', 'In Review', 'Done']

export interface User {
  id: string
  name: string
  initials: string
  color: string
  email: string
}

export interface Project {
  id: string
  name: string
  color: string
  emoji: string
  description: string
}

export interface Label {
  id: string
  name: string
  color: string
}

export interface Comment {
  id: string
  taskId: string
  authorId: string
  text: string
  createdAt: number
}

export interface Task {
  id: string
  projectId: string
  col: ColumnName
  title: string
  description: string
  priority: Priority
  assigneeId: string | null
  points: number | null
  dueDate: string | null
  labelIds: string[]
  commentIds: string[]
  createdAt: number
  createdBy: string
}

export interface AppState {
  currentUserId: string
  users: User[]
  projects: Project[]
  labels: Label[]
  tasks: Task[]
  comments: Comment[]
}

export interface Filters {
  assigneeId: string
  priority: string
  labelId: string
  search: string
}

export const PRIORITY_META: Record<Priority, { label: string; color: string; bg: string; dot: string }> = {
  p0: { label: 'P0 Crítico', color: '#B91C1C', bg: '#FEF2F2', dot: '#EF4444' },
  p1: { label: 'P1 Alta',    color: '#92400E', bg: '#FFFBEB', dot: '#F59E0B' },
  p2: { label: 'P2 Média',   color: '#1E40AF', bg: '#EFF6FF', dot: '#3B82F6' },
  p3: { label: 'P3 Baixa',   color: '#374151', bg: '#F9FAFB', dot: '#9CA3AF' },
}

export const LABEL_COLORS: Record<string, string> = {
  setup:    '#534AB7',
  backend:  '#0F6E56',
  frontend: '#D85A30',
  auth:     '#993556',
  database: '#185FA5',
  devops:   '#3B6D11',
  testing:  '#BA7517',
  design:   '#D85A30',
  seo:      '#0F6E56',
  content:  '#534AB7',
  research: '#BA7517',
  mobile:   '#185FA5',
  ci:       '#3B6D11',
}
