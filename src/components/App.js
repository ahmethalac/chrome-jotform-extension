import React from 'react';
import '../styles/App.scss';
import SearchBar from './SearchBar';
import VisibleTodoLists from './VisibleTodoLists';

const App = () => (
  <div className="App">
    <header className="App-header">
      <SearchBar />
      <VisibleTodoLists />
    </header>
  </div>
);

export default App;
