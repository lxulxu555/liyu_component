import classNames from 'classnames';
import { FormItemProps } from './type';
import { Children, cloneElement, isValidElement, useContext, useEffect } from 'react';
import { FormContext } from './form';

export const FormItem = ({
  name,
  children,
  label,
  valuePropName = 'value',
  trigger = 'onChange',
  rules = [],
  getValueFromEvent = (e) => e.target.value,
  validateTrigger = 'onBlur',
}: FormItemProps) => {
  const { dispatch, fields, initialValues, validateField } = useContext(FormContext);

  useEffect(() => {
    const value = initialValues?.[name] || '';
    dispatch({ type: 'addField', name, value: { name, value: value, rules, isValid: true, errors: [] } });
  }, []);

  const rowClass = classNames('row', {
    'row-no-label': !label,
  });

  const fieldState = fields[name];
  const value = fieldState && fieldState.value;
  const errors = fieldState && fieldState.errors;
  const isRequired = rules && rules.some((rule) => typeof rule !== 'function' && rule.required);
  const hasError = errors && errors.length > 0;
  const labelClass = classNames({
    'form-item-label-required': isRequired,
  });
  const itemClass = classNames('form-item-control', {
    'form-item-has-error': hasError,
  });
  const controlProps: Record<string, any> = {
    [valuePropName]: value,
    [trigger]: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'updateValue', name, value: getValueFromEvent(e) });
    },
    [validateTrigger]: async () => {
      await validateField(name);
    },
  };
  const childList = Children.toArray(children);
  if (childList.length === 0) {
    console.error('FormItem must have children');
  }
  if (childList.length > 1) {
    console.error('FormItem only accept one child');
  }
  if (!isValidElement(childList[0])) {
    console.error('FormItem only accept valid element as child');
  }
  const child = childList[0] as React.ReactElement;
  const returnChildNode = cloneElement(child, { ...child.props, ...controlProps });

  return (
    <div className={rowClass}>
      {label && (
        <div className="form-item-label">
          <label className={labelClass} title={label}>
            {label}
          </label>
        </div>
      )}
      <div className="form-item">
        <div className={itemClass}>{returnChildNode}</div>
        {hasError && (
          <div className="form-item-explain">
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  );
};
