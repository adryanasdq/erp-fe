interface Options {
    value: string | number;
    label: string;
}

interface SelectOptionProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    legend: string;
    required?: boolean;
    label?: string;
    options?: Options[];
}

const SelectOption: React.FC<SelectOptionProps> = ({
    legend, required, label, options, ...props
}) => {
    return (
        <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
                {legend}
                {required && <span className="-ml-1 text-red-500">*</span>}
            </legend>
            <select defaultValue={`Pick a ${legend}`} className="select w-full" {...props}>
                <option disabled={true}>Pick a {legend}</option>
                {options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <p className="label">{label}</p>
        </fieldset>
    )
};

export default SelectOption;