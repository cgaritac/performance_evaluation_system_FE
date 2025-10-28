import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TextFieldType } from "./text-field.types";

interface TextFieldProps {
  name: string;
  label: string;
  type?: TextFieldType;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

const TextField = ({ name, label, type = "text", placeholder, required = true, maxLength }: TextFieldProps) => {
  const {
    register,
    formState: { errors },
    watch
  } = useFormContext();

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
      <input
        {...register(name)}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`p-2 mt-2 text-base block w-full rounded-lg border-gray-400 bg-fk-white shadow-md focus:outline-fk-light-blue/20 ${
          error ? "border-red-500" : ""
        }`}
      />
      <section className="h-7 flex justify-between items-center">
        {error && <p className="p-2 mt-3 text-sm text-red-600">{error}</p>}
        {maxLength && (
          <p className={`text-sm ${charCount > maxLength ? 'text-red-500 font-semibold' : 'text-gray-500'} ml-auto` }>
            {charCount}/{maxLength}
          </p>
        )}
      </section>
    </div>
  );
};

export default TextField;