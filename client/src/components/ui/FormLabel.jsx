function FormLabel({ htmlFor, name, required }) {
  return (
    <label htmlFor={htmlFor} className="text-base block">
      {name}: {required ? <span className="text-red-500">*</span> : null}
    </label>
  );
}

export default FormLabel;
