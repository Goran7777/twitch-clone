import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { getStream, deleteStream } from '../../actions';
import { History } from 'history';
import { RouteComponentProps } from 'react-router-dom';

interface IProps {
  history: History;
  getStream(id: string): any;
  deleteStream(id: number, history: History): any;
  stream: Stream;
}
interface MatchParams {
  id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}
const StreamDelete = ({
  history,
  match,
  getStream,
  deleteStream,
  stream,
}: MatchProps & IProps) => {
  useEffect(() => {
    const id = match.params.id;
    getStream(id);
  }, [getStream, match.params.id]);
  const renderActions = () => (
    <>
      <button
        onClick={() => deleteStream(stream.id, history)}
        className="ui negative button"
      >
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </>
  );
  return (
    <div>
      {!stream ? (
        <h2>Loading ...</h2>
      ) : (
        <Modal
          title="Delete Stream"
          content={`Are you sure you want to delete stream: ${stream.title} ?`}
          actions={renderActions()}
          onDismiss={() => history.push('/')}
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

export default connect(mapStateToProps, { getStream, deleteStream })(
  StreamDelete
);
