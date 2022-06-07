import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import s from './modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClick, children }) => {
  
  useEffect(() => {
    window.addEventListener('keydown', hideModal);
    return () => {
      window.removeEventListener('keydown', hideModal);
    };
  });

  const hideModal = e => {
    if (e.code === 'Escape') {
      onClick();
    }
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return createPortal(
    <div onClick={hideModal} className={s.overlay}>
      <div className={s.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
};
