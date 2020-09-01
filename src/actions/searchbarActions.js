import { ADD_SHORTCUT_REQUEST } from '../constants/actionTypes';

export const addShortcut = (shortForm, longForm) => ({
  type: ADD_SHORTCUT_REQUEST,
  payload: { shortForm, longForm },
});

export default 'dummyExportForESLINT';
