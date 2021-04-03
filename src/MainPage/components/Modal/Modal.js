import BaseModal from '../BaseModal';
import Button from '../Button';
import './Modal.style.css';

const Modal = ({ children, onClose, closeButtonText, isOpen }) => {
  return (
    <BaseModal onBackdropClick={onClose} isOpen={isOpen}>
      <div className="modal-wrapper">
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <Button variant="confirm" onClick={onClose}>
            {closeButtonText || 'ok'}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default Modal;
