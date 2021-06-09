import { FilterSvg } from '@icons/filter'

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

    <FilterSvg />
  </div>
)
