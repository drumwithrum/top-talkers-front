import './Toolbar.style.css';

const Toolbar = ({ onInfoClick }) => (
  <div className="toolbar-wrapper">
    <div className="icon red" />
    <div className="icon yellow" onClick={onInfoClick} />
    <div className="icon green" />
  </div>
);

export default Toolbar;
