import React from "react";
import "./modal.css";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Réveil</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            ignorer
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            arrêter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
