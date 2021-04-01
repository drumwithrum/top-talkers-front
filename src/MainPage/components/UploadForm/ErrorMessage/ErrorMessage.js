import './ErrorMessage.style.css'

const ErrorMessage = ({ text }) => {

  return (
    <div className={`error-message-wrapper ${text ? '' : 'error-msg--collapsed' }`}>
      <p className="error-msg__title">{text}</p>
    </div>
  )
}

export default ErrorMessage