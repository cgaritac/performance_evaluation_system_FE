import { EvaluationRequestModel, useGetEvaluationWithGoals, useUser } from "~/entities";
import { GLOBAL_CONSTANTS, Hero, HeroEsqueleton, useEvaluationSelection } from "~/shared";
import { EvaluationsInfo } from "~/widgets";

const HomePage: React.FC = () => {
    const { userData } = useUser();
    
    const { data: evaluation, isLoading } = useGetEvaluationWithGoals(userData?.id ?? 0, 
        EvaluationRequestModel.create({
            id: 0,
            employeeId: userData?.id ?? 0,
            year: new Date().getFullYear(),
            departmentId: userData?.departmentId ?? 0,
        })
    );

    useEvaluationSelection(evaluation);

    return (
        <>
            {isLoading ? <HeroEsqueleton /> : <Hero>
                {GLOBAL_CONSTANTS.APP_NAME_GLOBAL}
            </Hero>}
            <EvaluationsInfo isLoading={isLoading} />
        </>
    );
};

export default HomePage;