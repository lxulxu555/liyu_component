import { Meta, StoryObj } from '@storybook/react';
import { Message } from './message';
import { Button } from '../Button/button';

const meta: Meta<typeof Message> = {
  title: 'Message',
};

export default meta;
type Story = StoryObj<typeof Message>;

export const Messages: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', columnGap: 12 }}>
        <Button onClick={() => Message.info('Info message')}>Info</Button>
        <Button onClick={() => Message.warn('Warning message')}>Warning</Button>
        <Button onClick={() => Message.error('Error message')}>Error</Button>
        <Button onClick={() => Message.success('Success message')}>Success</Button>
      </div>
    );
  },
};
