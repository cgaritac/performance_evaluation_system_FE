import { useState } from "react";
import { useUser } from "~/entities";
import { CreateBulkButton, EvaluationTable, YearDropdown } from "~/features";
import { Search } from "~/shared";
import EvaluationsInfoSkeleton from "./EvaluationsInfoSkeleton";

interface EvaluationsInfoProps {
    isLoading: boolean;
}

const EvaluationsInfo: React.FC<EvaluationsInfoProps> = ({ isLoading }) => {
    const { userData } = useUser();
    const [searchTerm, setSearchTerm] = useState("");
    const [year, setYear] = useState<string>(new Date().getFullYear().toString());
    const yearSelected = parseInt(year);

    if (isLoading || !userData || !userData.departmentId) {
        return (
            <section className="flex flex-col gap-1 mt-6">
                <EvaluationsInfoSkeleton />
            </section>
        );
    }

    return (
        <section className="flex flex-col gap-1 mt-6">
            <div className="flex justify-between">
                <CreateBulkButton departmentId={userData.departmentId} year={yearSelected} />
                <YearDropdown onYearChange={setYear} initialYear={year} />
                <Search onSearchChange={setSearchTerm} />
            </div>
            <EvaluationTable userDepartmentId={userData.departmentId} yearSelected={yearSelected} searchTermTyped={searchTerm}/>
        </section>
    );
};

export default EvaluationsInfo;