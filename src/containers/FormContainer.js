import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../components/Form';
import { saveLocation } from '../actions/locationActions';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ saveLocation }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
