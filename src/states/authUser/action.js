import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
  SET_AUTH_ERROR: 'SET_AUTH_ERROR',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function setAuthErrorActionCreator(errorMessage) {
  return {
    type: ActionType.SET_AUTH_ERROR,
    payload: {
      errorMessage,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
      dispatch(setAuthErrorActionCreator(null));
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch(setAuthErrorActionCreator(errorMessage));
      global.alert(errorMessage);

      throw new Error(errorMessage);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(showLoading());

    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  setAuthErrorActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
