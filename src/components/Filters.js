import PropTypes from 'prop-types';
import React from 'react';
import {
  SHOW_ACTIVE,
  SHOW_ALL,
  SHOW_COMPLETED,
} from '../constants/todolistFilters';
import '../styles/Filters.scss';

const Filters = ({
  filter,
  changeFilter,
}) => (
  <div id="filterContainer">
    <button
      type="button"
      disabled={filter === SHOW_ALL}
      onClick={() => changeFilter(SHOW_ALL)}
      className="filterButton"
    >
      {SHOW_ALL}
    </button>
    <button
      type="button"
      disabled={filter === SHOW_ACTIVE}
      onClick={() => changeFilter(SHOW_ACTIVE)}
      className="filterButton"
    >
      {SHOW_ACTIVE}
    </button>
    <button
      type="button"
      disabled={filter === SHOW_COMPLETED}
      onClick={() => changeFilter(SHOW_COMPLETED)}
      className="filterButton"
    >
      {SHOW_COMPLETED}
    </button>
  </div>
);

Filters.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  filter: SHOW_ALL,
};
export default Filters;
