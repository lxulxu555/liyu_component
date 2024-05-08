import { ReactNode } from 'react';
import useStore from './useStore';
import { RuleItem, ValidateError } from 'async-validator';

export type RenderProps = (form: FormState) => ReactNode;

export interface FormProps {
  children: React.ReactNode | RenderProps;
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}

export interface FormItemProps {
  name: string;
  label?: string;
  children?: React.ReactNode;
  valuePropName?: string;
  trigger?: string;
  getValueFromEvent?: (event: any) => any;
  rules?: CustomRule[];
  validateTrigger?: string;
}

export interface FieldDetail {
  name: string;
  value: any;
  rules: CustomRule[];
  isValid: boolean;
  errors: ValidateError[];
}

export interface FieldsState {
  [key: string]: FieldDetail;
}

export interface FormState {
  isValid: boolean;
  isSubmtting: boolean;
  errors: Record<string, ValidateError[]>;
}

export interface FieldsAction {
  type: 'addField' | 'updateValue' | 'updateValidateResult';
  name: string;
  value: any;
}

export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>;

export type CustomRuleFunc = ({ getFieldValue }: any) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;

export interface ValidateErrorType extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;
}
