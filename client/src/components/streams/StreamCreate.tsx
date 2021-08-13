import React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

interface IProps {
  createStream(formValues: Record<string, unknown>, history: History): any;
  history: History;
}

const StreamCreate = ({ createStream, history }: IProps) => {
  const onSubmit = (formValues: Record<string, unknown>) => {
    createStream(formValues, history);
  };
  return (
    <div>
      <h3>Create Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { createStream })(StreamCreate);
