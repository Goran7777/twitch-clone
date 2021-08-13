import React from 'react';
import { signOut } from '../../actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { OAuthKey } from '../../apiKey';
import { GoogleLogout } from 'react-google-login';
interface IProps {
  signOut: () => void;
}
const LogoutWithGoogle = ({ signOut }: IProps) => {
  const onSuccess = () => {
    signOut();
  };
  return (
    <div>
      <GoogleLogout
        clientId={OAuthKey}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default connect(null, { signOut })(LogoutWithGoogle);
