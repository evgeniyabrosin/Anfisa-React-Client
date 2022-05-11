import { PopperMenu } from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Popper Menu',
  component: PopperMenu,
} as ComponentMeta<typeof PopperMenu>

const Template: ComponentStory<typeof PopperMenu> = args => (
  <div style={{ width: '100px' }}>
    <PopperMenu {...args} close={() => {}}>
      {args.children}
    </PopperMenu>
  </div>
)

export const Default = Template.bind({})

Default.args = {
  children: (
    <>
      <PopperMenuItem>Item 1</PopperMenuItem>
      <PopperMenuItem>Item 2</PopperMenuItem>
    </>
  ),
}

export const WithIcon = Template.bind({})

WithIcon.args = {
  children: (
    <>
      <PopperMenuItem iconName="Cloud">Item 1</PopperMenuItem>
      <PopperMenuItem iconName="Copy">Item 2</PopperMenuItem>
    </>
  ),
}
