import ReactDOM from 'react-dom';
import './BaseModal.style.css';

const BaseModal = ({ children, onBackdropClick, isOpen }) => {
  return ReactDOM.createPortal(
    isOpen ? (
      <div className="modal-layout" onClick={onBackdropClick}>
        <div>{children}</div>
      </div>
    ) : null,
    document.querySelector('#modal')
  );
};

export default BaseModal;
