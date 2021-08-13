import { SIGN_IN, SIGN_OUT } from '../actions/actionTypes';
interface IInitialState {
  isSignedIn: boolean;
  userId: string;
}
const INITIAL_STATE = {
  isSignedIn: false,
  userId: '',
};

export default (state: IInitialState = INITIAL_STATE, action: IAuthAction) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null,
      };
    default:
      return state;
  }
};
