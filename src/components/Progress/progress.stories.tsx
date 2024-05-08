import { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  title: 'Progress',
  component: Progress,
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const DefaultProgress: Story = {
  args: { percent: 80, showText: true, theme: 'primary' },
};
