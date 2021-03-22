import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import './modal.css';

function Modal({ children, isOpen, close }) {
  const $button = useRef(null);

  function handleClose(e) {
    e.preventDefault();
    close();
  }

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape' && $button.current) {
        $button.current.click();
      }
    }

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [$button]);

  if (!isOpen) return null;

  return (
    <div className="Modal">
      <button type="button" className="Modal__bg" onClick={handleClose} ref={$button}></button>
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
