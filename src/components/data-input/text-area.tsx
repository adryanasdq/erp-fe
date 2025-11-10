interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  legend: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  legend, placeholder, label, required, ...props
}) => {
  return (
    <fieldset className="fieldset w-full">
      <legend className="fieldset-legend">
        {legend}
        {required && <span className="-ml-2 text-red-500">*</span>}
      </legend>
      <textarea
        {...props}
        className="textarea w-full"
        placeholder={placeholder}
      />
      <p className="label">{label}</p>
    </fieldset>
  );
};

export default TextAreaField;