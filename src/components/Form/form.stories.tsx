import { Meta, StoryObj } from '@storybook/react';
import { Form } from './form';
import { FormItem } from './formItem';
import Input from '../Input/input';

const meta: Meta<typeof Form> = {
  title: 'Form',
  component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;

export const DefaultFormn: Story = {
  args: {},
  render: () => {
    return (
      <Form>
        <FormItem label="nameqweeeeeeee" name="name" rules={[{ required: true }]}>
          <Input />
        </FormItem>
        <FormItem label="age" name="age">
          <Input />
        </FormItem>
        <FormItem name="desc">
          <Input />
        </FormItem>
      </Form>
    );
  },
};
