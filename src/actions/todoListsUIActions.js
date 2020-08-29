import { CHANGE_FILTER } from '../constants/actionTypes';

export const changeFilter = (formId, filter) => ({
  type: CHANGE_FILTER,
  payload: {
    formId,
    filter,
  },
});

export default 'dummyExport';
