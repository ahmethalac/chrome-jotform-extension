import PropTypes from 'prop-types';
import React from 'react';
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from '../constants/todolistFilters';

const Filters = ({
  filter,
  changeFilter,
}) => (
  <>
    <button
      type="button"
      disabled={filter === SHOW_ALL}
      onClick={() => changeFilter(SHOW_ALL)}
    >
      {SHOW_ALL}
    </button>
    <button
      type="button"
      disabled={filter === SHOW_ACTIVE}
      onClick={() => changeFilter(SHOW_ACTIVE)}
    >
      {SHOW_ACTIVE}
    </button>
    <button
      type="button"
      disabled={filter === SHOW_COMPLETED}
      onClick={() => changeFilter(SHOW_COMPLETED)}
    >
      {SHOW_COMPLETED}
    </button>
  </>
);

Filters.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func,
};

Filters.defaultProps = {
  filter: SHOW_ALL,
  changeFilter: (() => {}),
};

export default Filters;
