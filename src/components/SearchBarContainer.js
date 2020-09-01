import { connect } from 'react-redux';
import { getShortcuts } from '../selectors';
import SearchBar from './SearchBar';
import { addShortcut } from '../actions';

const mapStateToProps = state => ({
  shortcuts: getShortcuts(state),
});

const mapActionsToProps = {
  addShortcut,
};

export default connect(mapStateToProps, mapActionsToProps)(SearchBar);
