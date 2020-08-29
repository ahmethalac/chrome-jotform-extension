import { SHOW_ACTIVE, SHOW_COMPLETED } from './todolistFilters';

export const DUMMY_STATE_FOR_TODOLISTS = {
  1: {
    id: 1,
    name: 'List1',
    todos: {
      1: {
        id: 1,
        name: 'list1todo1',
        done: false,
      },
      2: {
        id: 2,
        name: 'list1todo2',
        done: true,
      },
    },
  },
  2: {
    id: 2,
    name: 'List2',
    todos: {
      3: {
        id: 3,
        name: 'list2todo1',
        done: false,
      },
      4: {
        id: 4,
        name: 'list2todo2',
        done: false,
      },
      5: {
        id: 5,
        name: 'list2todo3',
        done: false,
      },
    },
  },
};

export const DUMMY_STATE_FOR_SEARCHBAR_SHORTCUTS = {
  w: 'what is',
  h: 'how to',
};

export const DUMMY_STATE_FOR_TODOLISTS_UI = {
  202414858940963: {
    filter: SHOW_COMPLETED,
  },
  202414261222944: {
    filter: SHOW_ACTIVE,
  },
};

export default 'dummyExportForESLINT';
