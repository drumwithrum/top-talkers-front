import { useState } from 'react';
import './UploadForm.style.css';
import Button from '../Button/Button';
import Modal from '../Modal';
import Toolbar from './Toolbar';
import ErrorMessage from './ErrorMessage';

const UploadForm = ({
  onFileChange,
  onSubmit,
  fileName = '',
  isLoading,
  error,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const instructions = [
    'Choose your file to parse',
    "If you're ready press save button",
    'Wait for your report',
    'If you wish, you can save it to pdf file',
  ];
  return (
    <div className="upload-form">
      <div className="upload-form__header">
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="info-modal__title">
            <b>Made with 💖 by</b>
          </div>
          <div className="info-modal__subtitle">Wojciech Bębenek 👨‍💻</div>
          <div className="info-modal__subtitle">Nikodem Wojewodzic</div>
          <div className="info-modal__subtitle">Karol Mularczyk</div>
          <div className="info-modal__subtitle">Mikołaj Bochenek</div>
        </Modal>
        <Toolbar onInfoClick={() => setIsModalOpen(true)} />
        <h1 className="title">Top Talkers</h1>
      </div>
      <div className="upload-form__wrapper">
        <div className="form-instruction__wrapper">
          <h2 className="form-instruction__title">Instruction</h2>
          {instructions.map((instruction, index) => (
            <p
              className="form-instruction__item"
              key={`instruction-item-${index}`}
            >{`${index + 1}. ${instruction}`}</p>
          ))}
        </div>
        <form className="upload-form__form" onSubmit={onSubmit}>
          <div className="file-input__wrapper">
            <input
              className="file-input"
              type="file"
              name="data"
              onChange={onFileChange}
            />
            {fileName && <p className="file-input__label">{fileName}</p>}
          </div>
          <Button title="Save" disabled={!fileName} isLoading={isLoading} />
        </form>
        <p className="upload-form__hint">
          Accepcted file extensions: <b>.pcap</b>
        </p>
        <ErrorMessage text={error} />
      </div>
    </div>
  );
};

export default UploadForm;
