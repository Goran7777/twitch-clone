import _ from 'lodash';
import {
  GET_STREAM,
  GET_STREAMS,
  UPDATE_STREAM,
  DELETE_STREAM,
  CREATE_STREAM,
} from '../actions/actionTypes';

export default (
  state: Record<string, unknown> = {},
  action: IStreamsAction
) => {
  switch (action.type) {
    case GET_STREAM:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case CREATE_STREAM:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case UPDATE_STREAM:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case DELETE_STREAM:
      return _.omit(state, action.payload);

    case GET_STREAMS:
      return {
        ...state,
        ..._.mapKeys(action.payload, 'id'),
      };

    default:
      return state;
  }
};
