import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Modal } from './modal'

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    component: {
      table: {
        disable: true,
      },
    },
    render: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = args => {
  return (
    <>
      <div>Some content behind modal</div>
      <Modal
        {...args}
        render={({ state, transitionDuration }) => (
          <div
            className="absolute inset-1/4 bg-white p-4 border border-black"
            style={{
              opacity: state === 'entered' || state === 'entering' ? 1 : 0,
              transitionProperty: 'opacity',
              transitionDuration: `${transitionDuration}ms`,
            }}
          >
            Modal content
          </div>
        )}
      />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  transitionDuration: 300,
}
