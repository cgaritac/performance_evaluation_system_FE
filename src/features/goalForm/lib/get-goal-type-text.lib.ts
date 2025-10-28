import { GoalType } from "~/entities";

const getGoalTypeText = (goalType: GoalType) => {
    switch (goalType) {
        case GoalType.SelfAssigned:
            return 'Self-Assigned';
        case GoalType.ManagerAssigned:
            return 'Manager-Assigned';
        default:
            return goalType;
    }
};

export default getGoalTypeText; 