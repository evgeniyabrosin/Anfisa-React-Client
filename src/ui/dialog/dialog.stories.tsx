import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Dialog } from './dialog'

export default {
  title: 'Dialog/Dialog',
  component: Dialog,
  argTypes: {
    actions: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Dialog>

const Template: ComponentStory<typeof Dialog> = args => {
  return (
    <>
      <p>Dialog is a combination of DialogCard and Modal components</p>
      <Dialog {...args}>Dialog content</Dialog>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  title: 'Dialog Title',
  onClose: action('close'),
  onApply: action('apply'),
}
