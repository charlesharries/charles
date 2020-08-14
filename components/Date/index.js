import PropTypes from 'prop-types';

function Date({ children }) {
  return <p style={{ fontStyle: 'italic' }}>{children}</p>;
}

Date.propTypes = {
  children: PropTypes.oneOf([PropTypes.element, PropTypes.string]),
};

export default Date;
