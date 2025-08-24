function IconButton({ children, type, onClick, onMouseEnter, onMouseLeave }) {
  const style = `p-2 ${
    type === "option" ? "bg-primary" : "bg-secondary"
  } flex items-center justify-center rounded-full cursor-pointer ${
    type === "option" ? "hover:bg-secondary" : "hover:bg-hover"
  }`;
  return (
    <button
      className={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}

export default IconButton;
