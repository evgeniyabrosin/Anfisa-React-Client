import { ComponentMeta, Story } from '@storybook/react'
import { Icon, IIconProps } from './icon'
import { icons, TIcons } from './icons'

export default {
  title: 'Icons',
  component: Icon,
  argTypes: {
    name: {
      table: {
        disable: true,
      },
    },
    dataTestId: {
      table: {
        disable: true,
      },
    },
    stroke: {
      table: {
        disable: true,
      },
    },
    fill: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Icon>

type TBaseIconProps = Omit<IIconProps, 'name'>

const iconNames = Object.keys(icons) as TIcons[]

const AllIconsTemplate: Story<TBaseIconProps> = args => {
  return (
    <div className="flex flex-wrap">
      {iconNames.map(name => (
        <div
          key="name"
          className="m-2 border border-black flex flex-col items-stretch justify-stretch"
        >
          <div className="w-32 h-32 p-2 flex items-center justify-center">
            <Icon name={name} {...args} />
          </div>
          <div className="text-center p-2 font-medium">{name}</div>
        </div>
      ))}
    </div>
  )
}

export const AllIcons = AllIconsTemplate.bind({})
AllIcons.args = {
  size: 48,
}
