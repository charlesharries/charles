import { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'components/Modal';

function Dialog({ src, $trigger }) {
  const [isOpen, setIsOpen] = useState(false);

  $trigger.addEventListener('click', (event) => {
    event.preventDefault();
    setIsOpen(true)
  });

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
      const label = image.parentElement.querySelector('figcaption');

      // Create a trigger for opening the dialog
      const trigger = document.createElement('a');
      trigger.setAttribute('href', image.src);
      trigger.classList.add('dialog-trigger')
      image.parentElement.append(trigger);
      if (label) trigger.setAttribute('title', label.innerText);

      // Create the dialog itself
      const container = document.createElement('div');
      container.classList.add('dialog-container');
      image.parentElement.append(container);

      ReactDOM.render(<Dialog src={image.src} $trigger={trigger} />, container);
    });
  }, []);

  const destroyLightbox = useCallback(() => {
    images.current.forEach((image) => {
      const containers = image.parentElement.querySelectorAll('.dialog-container');
      const triggers = image.parentElement.querySelectorAll('.dialog-trigger');
      containers.forEach((container) => {
        ReactDOM.unmountComponentAtNode(container);
        container.remove();
      });

      triggers.forEach(t => t.remove())
    })
  }, []);

  useEffect(() => {
    initLightbox();

    return () => {
      destroyLightbox()
    };
  }, [initLightbox, destroyLightbox])
}