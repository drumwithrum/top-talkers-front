import './Button.style.css'
import Loader from '../Loader'

const Button = ({ title, children, isLoading = false, variant, disabled = false, onClick }) => {
  return (
    <button
      className={`button button--${variant || 'primary'} ${disabled ? 'button--disabled' : '' } ${isLoading ? 'button--loading' : '' }`}
      onClick={!(disabled || isLoading) && onClick}
    >
      {isLoading ? <Loader /> : (title || children)}
    </button>
  );
}
  
export default Button;
  