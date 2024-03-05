import { Meta, StoryObj } from '@storybook/react';
import { Upload } from './upload';
import { UploadFile } from './type';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Upload> = {
  title: 'Upload',
  component: Upload,
};

export default meta;
type Story = StoryObj<typeof Upload>;

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 },
];

export const DefaultUpload: Story = {
  args: {
    action: 'https://run.mocky.io/v3/9db03520-dd33-49f4-9f7c-cce3d49440ac',
    defaultFileList: defaultFileList,
    onChange: () => action('change'),
    onProgress: () => action('onProgress'),
    onRemove: () => action('onRemove'),
    onSuccess: () => action('onSuccess'),
  },
  render: (args) => {
    return <Upload {...args} />;
  },
};
