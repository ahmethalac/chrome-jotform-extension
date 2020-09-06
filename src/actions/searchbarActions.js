import {
  ADD_SHORTCUT_REQUEST,
  DELETE_SHORTCUT_REQUEST,
} from '../constants/actionTypes';

export const addShortcut = (shortForm, longForm) => ({
  type: ADD_SHORTCUT_REQUEST,
  payload: { shortForm, longForm },
});

export const deleteShortcut = shortForm => ({
  type: DELETE_SHORTCUT_REQUEST,
  payload: { shortForm },
});

export default 'dummyExportForESLINT';
