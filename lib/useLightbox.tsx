import { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'components/Modal';

function Dialog({ src, $image }) {
  const [isOpen, setIsOpen] = useState(false);

  $image.setAttribute('tabindex', '-1');
  $image.addEventListener('click', () => setIsOpen(true));

  return (
    <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
      <img src={src} />
    </Modal>
  )
}

export default function useLightbox() {
  let images = useRef<NodeListOf<HTMLImageElement>>(null);

  const initLightbox = useCallback(() => {
    if (typeof window === 'undefined') return;

    images.current = document.querySelectorAll('.Post img');

    images.current.forEach((image) => {
      const container = document.createElement('div');
      container.classList.add('dialog-container');
      image.parentElement.append(container);

      ReactDOM.render(<Dialog src={image.src} $image={image} />, container);
    });
  }, []);

  const destroyLightbox = useCallback(() => {
    images.current.forEach((image) => {
      const containers = image.parentElement.querySelectorAll('.dialog-container');
      containers.forEach((container) => {
        ReactDOM.unmountComponentAtNode(container);
        container.remove();
      });
    })
  }, []);

  useEffect(() => {
    initLightbox();

    return () => {
      destroyLightbox()
    };
  }, [initLightbox, destroyLightbox])
}