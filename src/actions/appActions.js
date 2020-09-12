import { INIT_APP_REQUEST, LOGOUT, SET_API_KEY } from '../constants/actionTypes';

export const initApp = () => ({
  type: INIT_APP_REQUEST,
});

export const setAPIKey = apiKey => ({
  type: SET_API_KEY,
  payload: apiKey,
});

export const logout = () => ({
  type: LOGOUT,
});

export default 'dummyExport';
