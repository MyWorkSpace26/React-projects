const Input = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  error,
  label,
  autoComplete,
  required = false,
  className = "",
  wrapperClassName = "",
  rightElement,
  ...props
}) => {
  return (
    <div className={`space-y-2 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full rounded-md border bg-gray-50 p-3 text-sm outline-none ${
            error ? "border-red-500" : "border-gray-200"
          } ${className}`}
          autoComplete={autoComplete}
          required={required}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
