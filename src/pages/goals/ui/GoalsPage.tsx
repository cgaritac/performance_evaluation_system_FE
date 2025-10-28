import { useState } from "react";
import { Navigate } from "react-router-dom";
import { EvaluationRequestModel, FeedbackEnum, getFeedbackText, useGetEvaluationWithGoals, useUser } from "~/entities";
import { FeedbackForm, getGoalStats, YearDropdown } from "~/features";
import {
    Button,
    GLOBAL_CONSTANTS,
    Hero,
    HeroEsqueleton,
    ROUTES,
    useAppStore,
    useEvaluationSelection,
    useGetIdFromUrl,
    useGoErrorPage,
    useGoHome
} from "~/shared";
import { Dashboard, Feedback, GoalsInfo, GoalSummaryCard, GoalSummarySkeleton } from "~/widgets";
import { GOALS_TEXTS } from "../constants";
import { setInitialYear } from "../lib";

const GoalsPage: React.FC = () => {
    const { userData } = useUser()!;
    const { evaluationSelected } = useAppStore();
    const [year, setYear] = useState<string>(setInitialYear({ year: evaluationSelected?.year }));
    const goHome = useGoHome();

    const isAdmin = userData?.role === GLOBAL_CONSTANTS.ADMIN_ROLE;

    const { id: currentEmployeeId, isValid } = useGetIdFromUrl({ idSelected: evaluationSelected?.employeeId });
    const { data: evaluation, isLoading, error } = useGetEvaluationWithGoals(Number(currentEmployeeId), 
        EvaluationRequestModel.create({
            id: 0,
            employeeId: Number(currentEmployeeId),
            year: Number(year),
            companyId: userData?.companyId
        })
    );

    useEvaluationSelection(evaluation);
    useGoErrorPage(error);

    if (!isValid) {
        return <Navigate to={ROUTES.ERROR} />;
    }

    const stats = getGoalStats(evaluation?.goals ?? []);

    return (
        <>
            <Hero>
                {isLoading ? <HeroEsqueleton /> : 
                    <>
                        {evaluation?.employeeFullName + GOALS_TEXTS.TITLE}
                        <YearDropdown onYearChange={setYear} initialYear={year} className="text-base font-normal" />
                    </>
                }
            </Hero>
            <Dashboard 
                leftChildren={
                    isLoading ? <GoalSummarySkeleton /> :
                    <GoalSummaryCard 
                        value={stats.finished} 
                        label={GOALS_TEXTS.GOALS_FINISHED} 
                        variant='finished' />
                }
                centerChildren={
                    isLoading ? <GoalSummarySkeleton /> :
                    <GoalSummaryCard 
                        value={stats.inProgress} 
                        label={GOALS_TEXTS.GOALS_IN_PROGRESS} 
                        variant='inProgress' />
                }
                rightChildren={
                    isLoading ? <GoalSummarySkeleton /> :
                    <GoalSummaryCard 
                        value={stats.delayed} 
                        label={GOALS_TEXTS.GOALS_DELAYED} 
                        variant='delayed' />
                }
            />
            <GoalsInfo 
                goals={evaluation?.goals ?? []} 
                isLoading={isLoading} 
                isAdmin={isAdmin} 
                NotEvaluatedFeedback={evaluation?.feedback === FeedbackEnum.NotEvaluated}
            />
            <Feedback 
                result={getFeedbackText(evaluation?.feedback ?? FeedbackEnum.Outstanding)} 
                className={`${isAdmin ? 'h-[530px]' : 'h-[340px] mb-8'}`}
                isLoading={isLoading}
            >
                {evaluation && (
                    <FeedbackForm 
                        data={evaluation}
                    />
                )}
            </Feedback>
            {isAdmin && (
                <section className="flex justify-center items-center my-8">
                    <Button onClick={goHome}>
                        {GLOBAL_CONSTANTS.GO_HOME_BUTTON_TEXT}
                    </Button>
                </section>
            )}
        </>
    );
};

export default GoalsPage;