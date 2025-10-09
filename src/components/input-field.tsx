interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  legend: string;
  placeholder?: string;
  label?: string;
  type?: string;
  required?: boolean;
}

const InputField: React.FC<InputProps> = ({
  legend, placeholder, label, type, required, ...props
}) => {
  return (
    <fieldset className="fieldset w-full">
      <legend className="fieldset-legend">
        {legend}
        {required && <span className="-ml-2 text-red-500">*</span>}
      </legend>
      <input
        {...props}
        className="input w-full"
        type={type || 'text'}
        placeholder={placeholder}
      />
      <p className="label">{label}</p>
    </fieldset>
  );
};

export default InputField;