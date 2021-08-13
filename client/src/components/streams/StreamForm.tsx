import React from 'react';
import { Field, reduxForm, InjectedFormProps, FormErrors } from 'redux-form';

export interface IFormProps {
  input: Input;
  meta: Meta;
  label: string;
}
export interface Input {
  name: string;
  value: string;
}
export interface Meta {
  active: boolean;
  asyncValidating: boolean;
  autofilled: boolean;
  dirty: boolean;
  form: string;
  invalid: boolean;
  pristine: boolean;
  submitting: boolean;
  submitFailed: boolean;
  touched: boolean;
  valid: boolean;
  visited: boolean;
  error?: string;
}

const renderError = ({ error, touched }: Meta) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};
const renderInput = ({ input, label, meta }: IFormProps) => {
  const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} autoComplete="off" />
      {renderError(meta)}
    </div>
  );
};
const StreamForm = ({ onSubmit, handleSubmit }: any) => {
  const onFormSubmit = (formValues: Record<string, unknown>) => {
    onSubmit(formValues);
  };
  return (
    <form className="ui form error" onSubmit={handleSubmit(onFormSubmit)}>
      <Field name="title" component={renderInput} label="Enter Title" />
      <Field
        name="description"
        component={renderInput}
        label="Enter Description"
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

const validate = (formValues: Record<string, unknown>) => {
  const errors: FormErrors<Record<string, unknown>> = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title.';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description.';
  }
  return errors;
};

export default reduxForm<Record<string, unknown>>({
  form: 'streamForm',
  validate,
})(StreamForm);
