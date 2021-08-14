import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStream } from '../../actions';
import { History } from 'history';
import { RouteComponentProps } from 'react-router-dom';

interface IProps {
  history: History;
  getStream(id: string): any;
  stream: Stream;
}
interface MatchParams {
  id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

const StreamShow = ({ stream, match, getStream }: MatchProps & IProps) => {
  useEffect(() => {
    const id = match.params.id;
    getStream(id);
  }, [getStream, match.params.id]);
  return (
    <>
      {!stream ? (
        <h2>Loading ...</h2>
      ) : (
        <div>
          <h1 className="">{stream.title}</h1>
          <h5 className="">{stream.description}</h5>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: IRootState, ownProps: MatchProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { getStream })(StreamShow);
