import { CHANGE_FILTER_REQUEST } from '../constants/actionTypes';

export const changeFilter = (formId, filter) => ({
  type: CHANGE_FILTER_REQUEST,
  payload: { formId, filter },
});

export default 'dummyExport';
