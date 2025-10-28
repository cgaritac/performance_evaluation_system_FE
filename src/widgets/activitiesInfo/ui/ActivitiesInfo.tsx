import { NavLink } from "react-router-dom";
import { ActivityResponseModel, GoalStatus } from "~/entities";
import { ActivityCard } from "~/features";
import { ROUTES, useAppStore } from "~/shared";
import { PlusIcon } from "~/shared/assets";
import { ACTIVITIES_INFO_TEXTS } from "../constants";
import ActivitiesInfoSkeleton from "./ActivitiesInfoSkeleton";

interface ActivitiesInfoProps {
    data: ActivityResponseModel[];
    isLoading: boolean;
}

const ActivitiesInfo: React.FC<ActivitiesInfoProps> = ({ data, isLoading }) => {
    const { goalSelected } = useAppStore();
    
    if (isLoading) {
        return <ActivitiesInfoSkeleton />;
    }

    return (
        <section className="grid grid-cols-1 gap-4 mt-4">
            {data?.map((activity, index) => (
                <ActivityCard key={activity.id} activity={activity} index={index} />
            ))}

            {(goalSelected?.status === GoalStatus.InProgress || goalSelected?.status === GoalStatus.OnHold) && (
                <NavLink
                to={ROUTES.ACTIVITY_CREATE}
                state={{ fromApp: true }}
                end
                className="flex justify-center items-center h-[160px] gap-2 border border-dashed 
                           p-4 rounded cursor-pointer text-blue-500 hover:bg-gray-100/50 text-sm"
                >
                    <PlusIcon />
                    {ACTIVITIES_INFO_TEXTS.CREATE_NEW_ACTIVITY}
                </NavLink>
            )}
        </section>
    );
};

export default ActivitiesInfo;