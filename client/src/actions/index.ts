import streams from '../apis/streams';
import { db } from '../db/firestore';
import { v4 as uuidv4 } from 'uuid';
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
    const id = uuidv4();
    const document = {
      ...formValues,
      userId,
      id,
    };
    try {
      await db.collection('streams').doc().set(document);

      dispatch({
        type: CREATE_STREAM,
        payload: document,
      });
      history.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };
export const getStreams =
  (): ThunkAction<void, IRootState, unknown, AnyAction> =>
  (dispatch: Dispatch) => {
    db.collection('streams').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      dispatch({
        type: GET_STREAMS,
        payload: data,
      });
    });
  };
export const getStream =
  (id: string): ThunkAction<void, IRootState, unknown, AnyAction> =>
  (dispatch: Dispatch) => {
    db.collection('streams')
      .where('id', '==', id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          dispatch({
            type: GET_STREAM,
            payload: data,
          });
        });
      })
      .catch((error) => console.log(error.message));
  };
export const updateStream =
  (
    id: string,
    formValues: Record<string, unknown>,
    history: History
  ): ThunkAction<void, IRootState, unknown, AnyAction> =>
  (dispatch: Dispatch) => {
    db.collection('streams')
      .where('id', '==', id)
      .limit(1)
      .get()
      .then((snapshot) => {
        const thing = snapshot.docs[0];
        //   console.log(thing);
        console.log(thing.data());
        thing.ref.update({ ...formValues });
        const data = thing.data();
        console.log(data);

        dispatch({
          type: UPDATE_STREAM,
          payload: data,
        });
        history.push('/');
      });
  };

export const deleteStream =
  (
    id: string,
    history: History
  ): ThunkAction<void, IRootState, unknown, AnyAction> =>
  (dispatch: Dispatch) => {
    const query = db.collection('streams').where('id', '==', id);

    query
      .get()
      .then((snapshoot) => {
        snapshoot.forEach((doc) => {
          doc.ref.delete();
          dispatch({
            type: DELETE_STREAM,
            payload: id,
          });
          history.push('/');
        });
      })
      .catch((error) => console.log(error.message));
  };
