import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import { OAuthKey } from '../../apiKey';
import { GoogleLogin } from 'react-google-login';

interface IProps {
  signIn: (id: string) => void;
}

const LoginWithGoogle = ({ signIn }: IProps) => {
  const onSuccess = (res: any) => {
    const userId = res.googleId;
    signIn(userId);
  };
  const onFailure = (res: any) => {
    console.log(res.error);
  };
  return (
    <div>
      <GoogleLogin
        clientId={OAuthKey}
        buttonText="Login"
        cookiePolicy={'single_host_origin'}
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
      />
    </div>
  );
};

export default connect(null, { signIn })(LoginWithGoogle);
