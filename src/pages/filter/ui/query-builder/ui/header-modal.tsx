import { Icon } from '@ui/icon'

interface IProps {
  groupName: string
  handleClose: () => void
}

export const HeaderModal = ({ groupName, handleClose }: IProps) => (
  <div className="flex w-full justify-between items-center font-medium">
    <div>{groupName}</div>

    <Icon
      name="Close"
      size={16}
      className="cursor-pointer"
      onClick={handleClose}
    />
  </div>
)
