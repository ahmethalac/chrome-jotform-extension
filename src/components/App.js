import React from 'react';
import '../styles/App.scss';
import SearchBar from './SearchBar';

const App = () => (
  <div className="App">
    <header className="App-header">
      <SearchBar handleSubmit={message => console.log(message)} />
      <div>JotForm New Tab</div>
    </header>
  </div>
);

export default App;
