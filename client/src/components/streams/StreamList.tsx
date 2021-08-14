import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { db } from '../../db/firestore';
import { getStreams } from '../../actions';

interface IProps {
  getStreams(): any;
  streams: Stream[];
  currentUserId: string | null;
  isSignedIn: boolean;
}

const StreamList = ({
  getStreams,
  streams,
  currentUserId,
  isSignedIn,
}: IProps) => {
  useEffect(() => {
    getStreams();
  }, [getStreams]);
  const renderAdmin = (stream: Stream) => {
    if (stream.userId && stream.userId === currentUserId) {
      return (
        <div className=" right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  };
  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };
  const renderStreams = () => {
    return streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>

            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderStreams()}</div>
      {renderCreate()}
    </div>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { getStreams })(StreamList);
