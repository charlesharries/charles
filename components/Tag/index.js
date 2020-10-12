import React from 'react';
import PropTypes from 'prop-types';
import './Tag.css';

function Tag({ content }) {
  return <span className="Tag">{content}</span>;
}

Tag.propTypes = {
  content: PropTypes.string,
};

export default Tag;
