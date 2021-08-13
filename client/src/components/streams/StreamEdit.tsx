import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStream, updateStream } from '../../actions';
import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import StreamForm from './StreamForm';

interface IProps {
  stream: Stream;
  getStream(id: string): any;
  updateStream(
    id: string,
    formValues: Record<string, unknown>,
    history: History
  ): any;
}

interface MatchParams {
  id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

const StreamEdit = ({
  match,
  history,
  stream,
  getStream,
  updateStream,
}: MatchProps & IProps) => {
  useEffect(() => {
    const id = match.params.id;
    getStream(id);
  }, [match.params.id, getStream]);

  const onSubmit = (formValues: Record<string, unknown>) => {
    updateStream(match.params.id, formValues, history);
  };
  return (
    <div>
      <h3>Edit Stream</h3>
      {!stream ? (
        <h1>Loading ...</h1>
      ) : (
        <StreamForm
          initialValues={{
            title: stream.title,
            description: stream.description,
          }}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: IRootState, ownProps: MatchProps) => {
  return {
    stream: state.streams[parseInt(ownProps.match.params.id)],
  };
};

export default connect(mapStateToProps, { getStream, updateStream })(
  StreamEdit
);
