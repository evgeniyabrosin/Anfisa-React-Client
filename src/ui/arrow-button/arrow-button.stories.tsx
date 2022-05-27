import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ArrowButton } from './arrow-button'

export default {
  title: 'ArrowButton',
  component: ArrowButton,
  argTypes: {
    direction: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof ArrowButton>

const Template: ComponentStory<typeof ArrowButton> = args => {
  return (
    <div className="flex">
      <ArrowButton {...args} direction="up" className="mr-2" />
      <ArrowButton {...args} direction="down" className="mr-2" />
      <ArrowButton {...args} direction="left" className="mr-2" />
      <ArrowButton {...args} direction="right" className="mr-2" />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  size: 'md',
}

export const Disabled = Template.bind({})
Disabled.args = {
  size: 'md',
  disabled: true,
}
