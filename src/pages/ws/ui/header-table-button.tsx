import { Icon } from '@ui/icon'

interface Props {
  refEl: any
  text: string
  onClick: () => void
}

export const HeaderTableButton = ({ text, refEl, onClick }: Props) => (
  <div
    ref={refEl}
    onClick={onClick}
    className="flex item-center justify-between cursor-pointer"
  >
    <p>{text}</p>

    <Icon name="Filter" />
  </div>
)
