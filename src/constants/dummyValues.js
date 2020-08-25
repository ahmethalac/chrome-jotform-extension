/**
 * Its always a good idea to keep a data structure as a map if you are to search within.
 *
 * For example, if you are trying to find a list with an id of x, search will end up O(n)
 * But if you keep the data with keys, then the search will be O(1)
 *
 * If you keep a nested structure it will get even worse when you try to find a single todo.
 *
 * lists = {
 *  1t313¿: {
 *    name: 'xx',
 *    id: 1t313¿,
 *    todos: {
 *      a4ag42: {
 *        id: a4ag42,
 *        name: 'yy',
 *        done: false
 *      }
 *    }
 *  }
 * }
 *
 * If we think this way, it might be even better if we keep the lists(forms) reducer
 * and todos(submissions) reducer. Worth a try. You decide.
 *
 * lists = {
 *  1t313¿: {
 *    name: 'xx',
 *    id: 1t313¿,
 *  }
 * }
 *
 * todos = {
 *  a4ag42: {
 *    id: a4ag42,
 *    listID: 1t313¿,
 *    name: 'yy',
 *    done: false
 *  }
 * }
 */

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

export default 'dummyExportForESLINT';
