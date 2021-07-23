import { ReactElement } from 'react'

export const PlusIcon = ({ color }: { color: string }): ReactElement => (
  <div
    className="mr-1.5 text-16"
    style={{
      color,
    }}
  >
    ✚
  </div>
)
