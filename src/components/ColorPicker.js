import React from 'react';
import PropTypes from 'prop-types';
import withClickOutside from '../helpers/hocs/withClickOutside';
import ColorWheel from '../ColorPicker';

const ColorPicker = ({
  position,
  initialColor,
  onChange,
}) => (
  <div
    style={{
      position: 'absolute',
      backgroundColor: 'white',
      top: position.y,
      left: position.right,
      zIndex: 5,
      borderRadius: 10,
      overflow: 'hidden',
      padding: 10,
    }}
  >
    <ColorWheel
      size={150}
      initialColor={initialColor}
      onChange={onChange}
    />
  </div>
);

ColorPicker.propTypes = {
  position: PropTypes.instanceOf(DOMRect),
  initialColor: PropTypes.string,
  onChange: PropTypes.func,
};

ColorPicker.defaultProps = {
  position: new DOMRect(),
  initialColor: '#FF0000',
  onChange: (() => {}),
};

export default withClickOutside(ColorPicker);
