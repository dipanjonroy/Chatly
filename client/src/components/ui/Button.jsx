function Button({ type, onClick, text }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-button w-full py-2 font-semibold text-white cursor-pointer hover:bg-[#1c52c9] transition duration-300"
    >
      {text}
    </button>
  );
}

export default Button;
