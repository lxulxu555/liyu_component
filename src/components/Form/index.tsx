import { FC } from 'react';
import { FormProps, FormItemProps } from './type';
import { Form } from './form';
import { FormItem } from './formItem';

export type IFormComponent = FC<FormProps> & {
  Item: FC<FormItemProps>;
};

const TransForm = Form as IFormComponent;

TransForm.Item = FormItem;

export default TransForm;
