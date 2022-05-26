import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DialogStandardActions } from './dialog-standard-actions'

export default {
  title: 'Dialog/DialogStandardActions',
  component: DialogStandardActions,
} as ComponentMeta<typeof DialogStandardActions>

const Template: ComponentStory<typeof DialogStandardActions> = args => {
  return (
    <div className="flex justify-between" style={{ maxWidth: '320px' }}>
      <DialogStandardActions {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  isApplyDisabled: false,
  isLoading: false,
  onClose: action('close'),
  onApply: action('apply'),
}
