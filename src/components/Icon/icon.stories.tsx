import { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon';

const meta: Meta<typeof Icon> = {
  title: 'Icon',
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const DefaultIcon: Story = {
  render: ({ name = 'fish', size = 120, ...args }) => {
    return (
      <div style={{ display: 'flex' }}>
        <Icon {...args} name={name} size={size} />
      </div>
    );
  },
};
