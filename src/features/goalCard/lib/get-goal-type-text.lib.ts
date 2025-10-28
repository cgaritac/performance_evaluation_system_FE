import { GoalType } from "~/entities";

const getGoalTypeText = (goalType: GoalType) => {
    switch (goalType) {
        case GoalType.ManagerAssigned:
            return 'Manager-Assigned';
        case GoalType.SelfAssigned:
            return 'Self-Assigned';
        default:
            return goalType;
    }
};

export default getGoalTypeText;