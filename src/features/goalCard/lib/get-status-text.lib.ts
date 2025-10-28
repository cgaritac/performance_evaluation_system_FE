import { GoalStatus } from "~/entities";

const getStatusText = (status: GoalStatus) => {
    switch (status) {
        case GoalStatus.InProgress:
            return 'In Progress';
        case GoalStatus.Finished:
            return 'Finished';
        case GoalStatus.NotStarted:
            return 'Not Started';
        case GoalStatus.OnHold:
            return 'On Hold';
        case GoalStatus.Cancelled:
            return 'Cancelled';
        case GoalStatus.Delayed:
            return 'Delayed';
        default:
            return status;
    }
};

export default getStatusText;