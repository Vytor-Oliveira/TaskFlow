import { useStore } from '../../store'

interface AvatarProps {
  userId: string | null
  size?: number
  className?: string
}

export function Avatar({ userId, size = 28, className = '' }: AvatarProps) {
  const user = useStore((s) => s.users.find((u) => u.id === userId))

  if (!user) {
    return (
      <div
        className={`rounded-full border border-dashed border-gray-300 flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }

  const fontSize = Math.floor(size * 0.38)

  return (
    <div
      className={`rounded-full flex items-center justify-center flex-shrink-0 font-medium select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `${user.color}20`,
        color: user.color,
        border: `1.5px solid ${user.color}44`,
        fontSize,
      }}
      title={user.name}
    >
      {user.initials}
    </div>
  )
}
