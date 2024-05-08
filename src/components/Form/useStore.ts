import { useReducer, useState } from 'react';
import { CustomRule, FieldsAction, FieldsState, FormState, ValidateErrorType } from './type';
import Schema, { ValidateError } from 'async-validator';
import { mapValues, each } from 'lodash-es';

function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case 'addField':
      return {
        ...state,
        [action.name]: { ...action.value },
      };
    case 'updateValue':
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value },
      };
    case 'updateValidateResult':
      const { isValid, errors } = action.value;
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors },
      };
    default:
      return state;
  }
}

export default function useStore(initialValues?: Record<string, any>) {
  const [form, setForm] = useState<FormState>({ isValid: true, isSubmtting: false, errors: {} });
  const [fields, dispatch] = useReducer(fieldsReducer, {});

  const getFieldValue = (key: string) => {
    return fields[key] && fields[key].value;
  };

  const getFieldsValue = () => {
    return mapValues(fields, (item) => item.value);
  };

  const setFieldsValue = (name: string, values: any) => {
    if (fields[name]) {
      dispatch({ type: 'updateValue', name, value: values });
    }
  };

  const resetFields = () => {
    if (initialValues) {
      each(initialValues, (value, name) => {
        if (fields[name]) {
          dispatch({ type: 'updateValue', name, value });
        }
      });
    }
  };

  const transfromRules = (rules: CustomRule[]) => {
    return rules.map((rule) => {
      if (typeof rule === 'function') {
        const calledRule = rule({ getFieldValue });
        return calledRule;
      }
      return rule;
    });
  };

  const validateField = async (name: string) => {
    const { value, rules } = fields[name];
    const afterRules = transfromRules(rules);
    const descriptor = { [name]: afterRules };
    const valuemAP = { [name]: value };
    const validator = new Schema(descriptor);
    let isValid = true;
    let errors: ValidateError[] = [];
    try {
      await validator.validate(valuemAP);
    } catch (error: any) {
      isValid = false;
      errors = error.errors;
    } finally {
      dispatch({ type: 'updateValidateResult', name, value: { isValid, errors } });
    }
  };

  const validateAllFields = async () => {
    let isValid = true;
    let errors: Record<string, ValidateError[]> = {};
    const valueMap = mapValues(fields, (item) => item.value);
    const descriptor = mapValues(fields, (item) => transfromRules(item.rules));
    const validarot = new Schema(descriptor);
    setForm({ ...form, isSubmtting: true });
    try {
      await validarot.validate(valueMap);
    } catch (e) {
      isValid = false;
      const err = e as ValidateErrorType;
      errors = err.fields;
      each(fields, (value, name) => {
        if (errors[name]) {
          const itemErrors = errors[name];
          dispatch({ type: 'updateValidateResult', name, value: { isValid: false, errors: itemErrors } });
        } else if (value.rules.length > 0 && !errors[name]) {
          dispatch({ type: 'updateValidateResult', name, value: { isValid: true, errors: [] } });
        }
      });
    } finally {
      setForm({ ...form, isSubmtting: false, isValid, errors });
      return {
        isValid,
        errors,
        values: valueMap,
      };
    }
  };

  return {
    fields,
    dispatch,
    form,
    validateField,
    getFieldValue,
    validateAllFields,
    getFieldsValue,
    setFieldsValue,
    resetFields,
  };
}
