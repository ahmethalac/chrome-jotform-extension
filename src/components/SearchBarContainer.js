import { connect } from 'react-redux';
import { getShortcuts } from '../selectors';
import SearchBar from './SearchBar';

const mapStateToProps = state => ({
  shortcuts: getShortcuts(state),
});

export default connect(mapStateToProps, null)(SearchBar);
