import { ReactNode, createContext } from 'react';
import { FormProps, IFormContext } from './type';
import useStore from './useStore';

export const FormContext = createContext<IFormContext>({} as IFormContext);
export const Form = ({ children, initialValues, onFinish, onFinishFailed }: FormProps) => {
  const { form, fields, dispatch, validateField, validateAllFields } = useStore(initialValues);
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { isValid, errors, values } = await validateAllFields();
    if (isValid && onFinish) {
      onFinish(values);
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(values, errors);
    }
  };

  let childrenNode: ReactNode;
  if (typeof children === 'function') {
    childrenNode = children(form);
  } else {
    childrenNode = children;
  }

  return (
    <form className="form" onSubmit={submitForm}>
      <FormContext.Provider value={passedContext}>{childrenNode}</FormContext.Provider>
    </form>
  );
};
