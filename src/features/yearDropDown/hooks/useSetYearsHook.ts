import { useState, useEffect } from "react";

const useSetYearsHook = () => {
    const [years, setYears] = useState<string[]>([]);
    
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const yearsArray = Array.from(
            { length: currentYear - 2020 + 1 },
            (_, index) => (currentYear - index).toString()
        );
        setYears(yearsArray);
    }, []);

    return years;
}

export default useSetYearsHook;