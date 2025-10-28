import { useFormContext } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
}

const SelectField = ({ name, label, options, required = true }: SelectFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;

  return (
    <div>
      <label htmlFor={name} className="block text-lg font-medium text-fk-text-secondary">
        {label}
        {required && <span className="ml-1 text-xs align-super">(*)</span>}
      </label>
      <select
        {...register(name)}
        id={name}
        defaultValue='Hola'
        className={`p-2 mt-2 block w-full rounded-lg bg-white border-gray-400 shadow-md cursor-pointer focus:outline-fk-light-blue/20 ${
          error ? "border-red-500" : ""
        }`}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <section className="h-7">
        {error && <p className="p-2 text-sm text-red-600">{error}</p>}
      </section>
    </div>
  );
};

export default SelectField;