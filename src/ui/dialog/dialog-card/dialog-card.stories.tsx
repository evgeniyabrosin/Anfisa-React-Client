import { Button } from '@ui/button'
import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DialogCard } from './dialog-card'

export default {
  title: 'Dialog/DialogCard',
  component: DialogCard,
  argTypes: {
    title: {
      type: 'string',
    },
    actions: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof DialogCard>

const Template: ComponentStory<typeof DialogCard> = args => {
  return (
    <div style={{ maxWidth: '320px' }}>
      <DialogCard {...args}>
        <div>Dialog content</div>
      </DialogCard>
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: 'Dialog Title',
  onApply: action('apply'),
  onClose: action('close'),
}

export const WithoutActions = Template.bind({})
WithoutActions.args = {
  title: 'Without Actions',
  onClose: action('close'),
  actions: false,
}

export const CustomActions = Template.bind({})
CustomActions.args = {
  title: 'Custom Actions',
  onClose: action('close'),
  actions: (
    <>
      <Button
        variant="secondary"
        onClick={action('secondary')}
        text="Secondary"
      />
      <Button variant="primary" onClick={action('primary')} text="Primary" />
    </>
  ),
}
