import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users){
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password, successCallback, errorCallback }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.register({ name, email, password });
      successCallback?.();
    } catch (error) {
      errorCallback?.(error.message);
    }

    dispatch(hideLoading());
  };
}


export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
};