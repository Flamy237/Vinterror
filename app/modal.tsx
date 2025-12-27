// components/Modal.tsx
import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
   <div className="modal-overlay">
  <div className="modal-container" role="dialog" aria-modal="true">
    <button onClick={onClose} className="modal-close" aria-label="Fermer la fenêtre">✕</button>
    {children}
  </div>
</div>

  );
};

export default Modal;