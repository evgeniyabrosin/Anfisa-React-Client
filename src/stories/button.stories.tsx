import { Button } from '@ui/button'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>

export const Template: ComponentStory<typeof Button> = args => (
  <Button variant="primary" text="Button" {...args} />
)
