function FormInput({
  type,
  id,
  name,
  placeholder,
  value,
  autoComplete,
  onChange,
  color,
  background,
  disabled,
}) {
  return (
    <input
      disabled={disabled}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      className={`w-full block  border border-border rounded-none text-base ${
        color === "white" ? "text-white" : "text-background"
      } ${
        background === "secondary" ? "bg-secondary" : ""
      } px-3 py-2 max-h-[40px] mt-1 focus:outline focus:outline-1 focus:outline-border focus:rounded-none`}
    />
  );
}

export default FormInput;
