import { INIT_APP_REQUEST, SET_API_KEY } from '../constants/actionTypes';

export const initApp = () => ({
  type: INIT_APP_REQUEST,
});

export const setAPIKey = apiKey => ({
  type: SET_API_KEY,
  payload: apiKey,
});
export default 'dummyExport';
