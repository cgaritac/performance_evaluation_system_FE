import { useState } from "react";
import { Dropdown } from "~/shared";
import { useSetYearsHook } from "../hooks";
import { YEAR_DROPDOWN_TEXTS } from "../constants";

interface YearDropdownProps {
    onYearChange: (year: string) => void;
    initialYear: string;
    className?: string;
}

const YearDropdown: React.FC<YearDropdownProps> = ({ onYearChange, initialYear, className }) => {
    const [selectedYear, setSelectedYear] = useState<string>(initialYear);
    const years = useSetYearsHook();

    const handleYearChange = (year: string) => {
        setSelectedYear(year);
        onYearChange(year);
    };

    return (
        <Dropdown 
            optionsData={years} 
            setSelectedOption={handleYearChange}
            initialValue={selectedYear}
            labelText={YEAR_DROPDOWN_TEXTS.LABEL}
            labelClassName={className}
            selectClassName={className}
        />
    );
};

export default YearDropdown;