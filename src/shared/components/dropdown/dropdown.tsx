import { useRef, useState } from 'react';

interface CustomDropdownProps<T> {
  optionsData: T[];
  labelText: string;
  selectClassName?: string;
  labelClassName?: string;
  setSelectedOption: (option: T) => void;
  initialValue?: T;
  title?: string;
}

const CustomDropdown = <T extends string>({
  optionsData,
  labelText,
  selectClassName,
  labelClassName,
  setSelectedOption,
  initialValue,
  title,
}: CustomDropdownProps<T>) => {
  const [selected, setSelected] = useState<T | null>(initialValue || null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as T;
    setSelected(value);
    setSelectedOption(value);
  };

  return (
    <div className={`flex items-center pl-2 text-fk-text-secondary bg-fk-light-gray rounded-2xl shadow-md ${labelClassName}`}>
      <label htmlFor="select-year" className="mr-2">
        {labelText}
      </label>
      <select
        id="select-year"
        ref={selectRef}
        value={selected ?? ''}
        onChange={handleChange}
        title={title}
        className={`px-3 py-2 border border-gray-100 text-gray-500 rounded-2xl 
                  bg-white cursor-pointer ${selectClassName}`}
        aria-label={title}
      >
        {optionsData.map((item, index) => (
          <option 
            key={index} 
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;