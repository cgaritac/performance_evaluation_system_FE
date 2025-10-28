import { useState } from "react";
import { useUser } from "~/entities";
import { EvaluationTable, YearDropdown, CreateBulkButton } from "~/features";
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

    if (!userData?.companyId) {
        return null;
    }

    return (
        <section className="flex flex-col gap-1 mt-6">
            {isLoading ? <EvaluationsInfoSkeleton /> : (
                <>
                    <div className="flex justify-between">
                        <CreateBulkButton companyId={userData.companyId} year={yearSelected} />
                        <YearDropdown onYearChange={setYear} initialYear={year} />
                        <Search onSearchChange={setSearchTerm} />
                    </div>
                    <EvaluationTable userCompanyId={userData.companyId} yearSelected={yearSelected} searchTermTyped={searchTerm}/>
                </>
            )}
        </section>
    );
};

export default EvaluationsInfo;