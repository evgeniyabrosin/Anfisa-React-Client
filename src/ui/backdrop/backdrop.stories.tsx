import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Backdrop } from './backdrop'

export default {
  title: 'Backdrop',
  component: Backdrop,
} as ComponentMeta<typeof Backdrop>

const Template: ComponentStory<typeof Backdrop> = args => {
  return (
    <div>
      Some content
      <Backdrop {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
}

export const Invisible = Template.bind({})
Invisible.args = {
  isOpen: true,
  isInvisible: true,
}
