import PropTypes from 'prop-types';
import './modal.css';

function Modal({ children, isOpen, close }) {
  if (!isOpen) return null;

  function handleClose(e) {
    e.preventDefault();
    close();
  }

  return (
    <div className="Modal">
      <button
        type="button"
        className="Modal__bg"
        onClick={handleClose}
      ></button>
      <div className="Modal__content">{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  isOpen: PropTypes.bool,
  close: PropTypes.func,
};

export default Modal;
