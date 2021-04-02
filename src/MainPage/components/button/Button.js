import './Button.style.css'
import Loader from '../Loader'

const Button = ({ title, children, isLoading = false, variant, disabled = false, onClick, className }) => {
  return (
    <button
      className={`button button--${variant || 'primary'} ${disabled ? 'button--disabled' : '' } ${isLoading ? 'button--loading' : '' } ${className}`}
      onClick={!(disabled || isLoading) ? onClick : undefined}
    >
      {isLoading ? <Loader /> : (title || children)}
    </button>
  );
}

export default Button;
  