import PropTypes from 'prop-types';

function Image({ src, children, alt }) {
  return (
    <figure>
      <img src={src} alt={children} />
      <figcaption>{children}</figcaption>
    </figure>
  );
}

Image.propTypes = {
  src: PropTypes.string,
  children: PropTypes.element,
  alt: PropTypes.string,
};

export default Image;
