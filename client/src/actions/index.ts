import streams from '../apis/streams';
import { ThunkAction } from 'redux-thunk';
import { Dispatch, AnyAction } from 'redux';
import { History } from 'history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  GET_STREAM,
  GET_STREAMS,
  DELETE_STREAM,
  UPDATE_STREAM,
} from './actionTypes';
export const signIn = (userId: string) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};
export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
export const createStream =
  (
    formValues: Record<string, unknown>,
    history: History
  ): ThunkAction<void, IRootState, unknown, AnyAction> =>
  async (dispatch: Dispatch, getState: any) => {
    const { userId } = getState().auth;
    try {
      const response = await streams.post('/streams', {
        ...formValues,
        userId,
      });
      dispatch({
        type: CREATE_STREAM,
        payload: response.data,
      });
      history.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };
export const getStreams =
  (): ThunkAction<void, IRootState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    try {
      const response = await streams.get('/streams');
      dispatch({
        type: GET_STREAMS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
export const getStream =
  (id: string): ThunkAction<void, IRootState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    try {
      const response = await streams.get(`/streams/${id}`);
      dispatch({
        type: GET_STREAM,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
export const updateStream =
  (
    id: string,
    formValues: Record<string, unknown>,
    history: History
  ): ThunkAction<void, IRootState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    try {
      const response = await streams.patch(`/streams/${id}`, formValues);
      dispatch({
        type: UPDATE_STREAM,
        payload: response.data,
      });
      history.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };
export const deleteStream =
  (
    id: number,
    history: History
  ): ThunkAction<void, IRootState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    try {
      await streams.delete(`/streams/${id}`);
      dispatch({
        type: DELETE_STREAM,
        payload: id,
      });
      history.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };
