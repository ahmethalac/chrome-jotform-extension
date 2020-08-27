import { createSelector } from 'reselect';

export const getShortcutsState = state => state.searchBarShortcuts;

export const getShortcuts = createSelector(
  [getShortcutsState],
  shortcuts => shortcuts,
);
