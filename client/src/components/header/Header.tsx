import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LoginWithGoogle from '../google-oauth/LoginWithGoogle';
import LogoutWithGoogle from '../google-oauth/LogoutWithGoogle';

interface IProps {
  isSignedIn: boolean;
}

const Header = ({ isSignedIn }: IProps) => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Streamy
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
        {!isSignedIn && <LoginWithGoogle />}
        {isSignedIn && <LogoutWithGoogle />}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps)(Header);
