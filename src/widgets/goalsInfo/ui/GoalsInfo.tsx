import { NavLink } from 'react-router-dom';
import { GoalResponseModel } from "~/entities";
import { GoalCard } from "~/features";
import { PlusIcon, ROUTES } from '~/shared';
import { GOALS_INFO_TEXTS } from "../constants";
import GoalsInfoSkeleton from "./GoalsInfoSkeleton";

interface Props {
    goals: GoalResponseModel[];
    isLoading: boolean;
    isAdmin: boolean;
    NotEvaluatedFeedback: boolean;
}

const GoalsInfo: React.FC<Props> = ({ goals, isLoading, isAdmin, NotEvaluatedFeedback }) => {
    if (isLoading) return <GoalsInfoSkeleton />;

    return (
        <section className="grid grid-cols-3 gap-4">
            {goals.map(goal => (
                <GoalCard key={goal.id} goal={goal} />
            ))}

            {(isAdmin || (!isAdmin && NotEvaluatedFeedback)) && (
                <NavLink
                    to={ROUTES.GOAL_CREATE} end
                    state={{ fromApp: true }}
                    className="flex justify-center items-center h-[310px] gap-2 border border-dashed 
                            p-4 rounded cursor-pointer text-blue-500 hover:bg-gray-100/50 text-sm"
            >
                <PlusIcon />
                    {GOALS_INFO_TEXTS.CREATE_NEW_GOAL}
                </NavLink>
            )}
        </section>
    );
};

export default GoalsInfo;