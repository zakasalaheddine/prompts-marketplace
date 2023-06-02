import { ReactNode } from 'react'
import { Button } from '../ui/button'

interface SidebarButtonProps {
  icon: ReactNode
  label: string
  isSelected?: boolean
}

export default function SidebarButton({
  label,
  icon,
  isSelected
}: SidebarButtonProps) {
  return (
    <Button
      variant={isSelected ? 'secondary' : 'ghost'}
      size="sm"
      className="w-full justify-start"
    >
      {icon}
      {label}
    </Button>
  )
}
