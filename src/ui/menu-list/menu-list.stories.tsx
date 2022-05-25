import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { MenuList } from './menu-list'
import { MenuListItem } from './menu-list-item'

export default {
  title: 'MenuList',
  component: MenuList,
} as ComponentMeta<typeof MenuList>

const items = [
  'Chicken',
  'Pug',
  'Yorkshire Terrier',
  'Unicorn',
  'Slug',
  'Snail',
  'Pig',
  'Cow',
]

const DefaultTemplate: ComponentStory<typeof MenuList> = args => {
  return (
    <div style={{ maxWidth: '240px' }}>
      <MenuList {...args}>
        {items.map(item => (
          <MenuListItem key={item} label={item} onClick={action(item)} />
        ))}
      </MenuList>
    </div>
  )
}

export const Default = DefaultTemplate.bind({})
Default.args = {}

export const Dense = DefaultTemplate.bind({})
Dense.args = {
  isDense: true,
}

const WithSelectedItemTemplate: ComponentStory<typeof MenuList> = args => {
  const [selectedItem, setSelectedItem] = useState('')

  return (
    <div style={{ maxWidth: '240px' }}>
      <MenuList {...args}>
        {items.map(item => (
          <MenuListItem
            key={item}
            label={item}
            isSelected={selectedItem === item}
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </MenuList>
    </div>
  )
}

export const WithSelectedItem = WithSelectedItemTemplate.bind({})

const WrapTemplate: ComponentStory<typeof MenuList> = args => {
  return (
    <div style={{ maxWidth: '240px' }}>
      <MenuList {...args}>
        {items.map(item => (
          <MenuListItem
            key={item}
            label={`${item} ${item} ${item} ${item} ${item} ${item} ${item} ${item}`}
            onClick={action(item)}
          />
        ))}
      </MenuList>
    </div>
  )
}

export const WordWrap = WrapTemplate.bind({})
WordWrap.args = {
  wrap: 'normal',
}
