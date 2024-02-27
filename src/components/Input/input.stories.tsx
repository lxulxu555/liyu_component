import { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  argTypes: {
    prepend: {
      options: ['Bold', 'Italic'],
      mapping: {
        Bold: <b>Bold</b>,
        Italic: <i>Italic</i>,
      },
    },
    append: {
      options: ['Bold', 'Italic'],
      mapping: {
        Bold: <b>Bold</b>,
        Italic: <i>Italic</i>,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const DefaultInput: Story = {
  args: {},
};
