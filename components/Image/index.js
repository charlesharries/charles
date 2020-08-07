import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Modal from '../Modal';

function Image({ src, children }) {
  const router = useRouter();
  const slug = router.route.replace('/blog/', '');
  const [isOpen, setIsOpen] = useState(false);

  const url = size =>
    `https://assets.charlesharri.es/${size}/https://assets.charlesharri.es/src/${slug}/${src}`;

  function openModal(e) {
    e.preventDefault();
    console.log('opening modal');
    setIsOpen(true);
  }

  return (
    <figure className="Image">
      <a className="Image__link" href={url('1920x')} onClick={openModal}>
        <img src={url('700x')} alt={children} />
      </a>

      <figcaption className="Image__caption">{children}</figcaption>

      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <img src={url('1280x')} alt={children} />
      </Modal>
    </figure>
  );
}

Image.propTypes = {
  src: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default Image;
