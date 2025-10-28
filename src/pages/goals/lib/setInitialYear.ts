interface SetInitialYearProps {
    year: number | null | undefined;
}

const setInitialYear = ({ year }: SetInitialYearProps): string => {
    return year?.toString() ?? new Date().getFullYear().toString();
}

export default setInitialYear;
