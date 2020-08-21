import React from 'react';
import '../styles/App.scss';
import SearchBar from './SearchBar';
import Todos from './Todos';

const App = () => (
  <div className="App">
    <header className="App-header">
      <SearchBar />
      <Todos />
    </header>
  </div>
);

export default App;
