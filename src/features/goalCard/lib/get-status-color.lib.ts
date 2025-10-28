import { GoalStatus } from "~/entities";


const getStatusColor = (status: GoalStatus) => {
    switch (status) {
        case GoalStatus.InProgress:
            return 'bg-fk-blue/80';
        case GoalStatus.Finished:
            return 'bg-fk-green/80';
        case GoalStatus.NotStarted:
            return 'bg-gray-400/80';
        case GoalStatus.OnHold:
            return 'bg-orange-400/80';
        case GoalStatus.Cancelled:
            return 'bg-black/70';
        case GoalStatus.Delayed:
            return 'bg-red-400/80';
        default:
            return 'bg-gray-400/80';
    }
};

export default getStatusColor;