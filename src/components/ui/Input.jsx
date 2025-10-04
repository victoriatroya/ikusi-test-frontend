const Input = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  icon,
  autoFocus = false,
  rightIcon,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`w-full ${icon ? "pl-10" : "pl-4"} ${rightIcon ? "pr-10" : "pr-4"} py-2.5 sm:py-3 text-sm sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
