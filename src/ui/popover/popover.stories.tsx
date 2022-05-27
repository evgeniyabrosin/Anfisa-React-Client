import { useRef, useState } from 'react'

import { Button } from '@ui/button'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Popover } from './popover'

const disabledInControls = {
  table: {
    disable: true,
  },
}

export default {
  title: 'Popover',
  component: Popover,
  argTypes: {
    isOpen: disabledInControls,
    onClose: disabledInControls,
    anchorEl: disabledInControls,
  },
} as ComponentMeta<typeof Popover>

const Template: ComponentStory<typeof Popover> = args => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>()

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <Button
          text="Open Popover"
          onClick={event => setAnchorEl(event.currentTarget)}
        />
      </div>
      <Popover
        {...args}
        anchorEl={anchorEl}
        isOpen={!!anchorEl}
        onClose={() => setAnchorEl(undefined)}
      >
        <div className="border border-black p-2">Some Popover Content</div>
      </Popover>
    </>
  )
}

export const Default = Template.bind({})

const PlacementTemplate: ComponentStory<typeof Popover> = args => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div ref={setAnchorEl} className="p-2 border border-black">
          Popover Anchor
        </div>
      </div>
      <Popover {...args} anchorEl={anchorEl} isOpen={!!anchorEl}>
        <div className="border border-black p-2">Some Popover Content</div>
      </Popover>
    </>
  )
}

export const Placement = PlacementTemplate.bind({})
Placement.argTypes = {
  modalClassName: disabledInControls,
  transitionDuration: disabledInControls,
  className: disabledInControls,
  offset: disabledInControls,
  isKeepMounted: disabledInControls,
  placement: {
    control: { type: 'radio' },
  },
}

const CustomAnchorElementTemplate: ComponentStory<typeof Popover> = args => {
  const anchorElRef = useRef<HTMLDivElement>(null)
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <div className="w-full h-full flex">
        <div className="flex-1 flex items-center justify-center">
          <div ref={anchorElRef} className="p-2 border border-black">
            Popover Anchor
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Button text="Open Popover" onClick={() => setOpen(true)} />
        </div>
      </div>
      <Popover
        {...args}
        anchorEl={anchorElRef.current}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        <div className="border border-black p-2">Some Popover Content</div>
      </Popover>
    </>
  )
}

export const CustomAnchorElement = CustomAnchorElementTemplate.bind({})
