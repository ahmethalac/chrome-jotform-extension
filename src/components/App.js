import React from 'react';
import '../styles/App.scss';
import SearchBar from './SearchBar';
import VisibleTodoLists from './VisibleTodoLists';

/** TODO:
 * We need to start thinking about the markup skeleton of the
 * application and implement the basic styles.
 */

const App = () => (
  <div className="App">
    <header className="App-header">
      <SearchBar />
      <VisibleTodoLists />
    </header>
  </div>
);

export default App;
