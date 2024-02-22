import { Meta, StoryObj } from '@storybook/react';
import { Icon2 } from './icon2';

const meta: Meta<typeof Icon2> = {
  title: 'Icon2',
  component: Icon2,
};

export default meta;
type Story = StoryObj<typeof Icon2>;

export const DefaultIcon2: Story = {
  render: ({ name = 'fish', size = 120, ...args }) => {
    return (
      <div style={{ display: 'flex' }}>
        <Icon2 {...args} name={name} size={size} />
      </div>
    );
  },
};
