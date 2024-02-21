import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const DefaultButton: Story = {
  args: {
    children: 'Base Button',
    onClick: action('on-click'),
  },
};

export const ButtonWithSize: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 12 }}>
      <Button size="lg">Large Button</Button>
      <Button size="sm">Small Button</Button>
    </div>
  ),
};

export const ButtonWithType: Story = {
  render: (args) => (
    <div style={{ display: 'flex', columnGap: 12 }}>
      <Button btnType="primary">Primary Button</Button>
      <Button btnType="default">Default Button</Button>
      <Button btnType="danger">Danger Button</Button>
      <Button btnType="link" href="/">
        Link Button
      </Button>
    </div>
  ),
};
