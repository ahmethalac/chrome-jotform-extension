import { createSelector } from 'reselect';

export const getApp = state => state.app;

export const getLoggedIn = createSelector(
  [getApp],
  app => app.get('loggedIntoJotForm', 'notKnown'),
);
