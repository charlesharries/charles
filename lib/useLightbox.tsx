import { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'components/Modal';

function Dialog({ src, alt, $trigger }) {
  const [isOpen, setIsOpen] = useState(false);

  $trigger.addEventListener('click', (event) => {
    event.preventDefault();
    setIsOpen(true)
  });

  return (
    <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
      <img src={src} alt={alt} />
    </Modal>
  )
}

export default function useLightbox(el?: HTMLElement) {
  let images = useRef<NodeListOf<HTMLImageElement>>(null);

  const initLightbox = useCallback(() => {
    if (typeof window === 'undefined') return;

    let parent: HTMLElement | Document = el;
    if (typeof el === 'undefined') {
      parent = document;
    }

    images.current = parent.querySelectorAll('img:not(.Links__left img)');

    images.current.forEach((image) => {
      if (image.parentElement.classList.contains('dialog-image')) {
        return;
      }

      const label = image.getAttribute('alt');
      const $wrapper = document.createElement('div');
      $wrapper.classList.add('dialog-image');
      image.parentElement.insertBefore($wrapper, image.nextElementSibling);
      image.remove();
      $wrapper.appendChild(image);

      // Create a trigger for opening the dialog
      const trigger = document.createElement('a');
      trigger.setAttribute('href', image.src);
      trigger.classList.add('dialog-trigger')
      image.parentElement.append(trigger);
      if (label) trigger.setAttribute('title', label);

      // Create the dialog itself
      const dialogContainer = document.createElement('div');
      dialogContainer.classList.add('dialog-container');
      image.parentElement.append(dialogContainer);

      ReactDOM.render(<Dialog src={image.src} alt={image.alt} $trigger={trigger} />, dialogContainer);
    });
  }, [el]);

  const destroyLightbox = useCallback(() => {
    images.current.forEach((image) => {
      if (!image.parentElement) return;

      const wrapper = image.parentElement;
      const containers = image.parentElement.querySelectorAll('.dialog-container');
      const triggers = image.parentElement.querySelectorAll('.dialog-trigger');
      containers.forEach((container) => {
        ReactDOM.unmountComponentAtNode(container);
        container.remove();
      });

      if (wrapper) {
        wrapper.parentElement?.append(image);
        wrapper.remove();
      }

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