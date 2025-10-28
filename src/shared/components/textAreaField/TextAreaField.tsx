import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface TextAreaFieldProps {
  name: string;
  label: string;
  rows?: number | undefined;
  placeholder?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  maxLength?: number | undefined;
}

const TextAreaField = ({ name, label, rows = 4, placeholder, required = true, disabled = false, maxLength }: TextAreaFieldProps) => {
  const { register, formState: { errors }, watch } = useFormContext();
  const [charCount, setCharCount] = useState(0);
  const value = watch(name);

  useEffect(() => {
    setCharCount(value?.length || 0);
  }, [value]);

  const error = errors[name]?.message as string;

  return (
    <div>
      <label htmlFor={name} className="block text-lg font-medium text-fk-text-secondary">
        {label}
        {required && <span className="ml-1 text-xs align-super">(*)</span>}
      </label>
      <textarea
        {...register(name)}
        id={name}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        className={`p-2 mt-2 block w-full rounded-lg text-base bg-white shadow-md border-gray-400 
                focus:outline-fk-light-blue/20 resize-none ${error ? "border-red-500" : ""
        }`}
      />
      <section className="h-7 flex justify-between items-center">
        {error && <p className="p-2 text-sm text-red-600">{error}</p>}
        {maxLength && (
          <p className={`text-sm ${charCount > maxLength ? 'text-red-500 font-semibold' : 'text-gray-500'} ml-auto`}>
            {charCount}/{maxLength}
          </p>
        )}
      </section>
    </div>
  );
};

export default TextAreaField;