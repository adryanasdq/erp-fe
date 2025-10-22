interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  legend: string;
  label?: string;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  legend, label, required, ...props
}) => {
  return (
    <fieldset className="fieldset w-full">
      <legend className="fieldset-legend">
        {legend}
        {required && <span className="-ml-2 text-red-500">*</span>}
      </legend>
      <input
        {...props}
        className="checkbox"
        type="checkbox"
      />
      <p className="label">{label}</p>
    </fieldset>
  );
};

export default Checkbox;