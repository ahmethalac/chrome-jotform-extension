import React, { useEffect } from 'react';
import '../styles/App.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import VisibleTodoLists from './VisibleTodoLists';
import { initApp } from '../actions';

/** TODO:
 * We need to start thinking about the markup skeleton of the
 * application and implement the basic styles.
 */

const App = ({
  initApp: _initApp,
}) => {
  useEffect(() => {
    _initApp();
  }, [_initApp]);
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar />
        <VisibleTodoLists />
      </header>
    </div>
  );
};

App.propTypes = {
  initApp: PropTypes.func,
};

App.defaultProps = {
  initApp: (() => {}),
};

const mapActionsToProps = {
  initApp,
};

export default connect(null, mapActionsToProps)(App);
