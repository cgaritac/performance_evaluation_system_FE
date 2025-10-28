import { GoalCategory } from "~/entities";

const getGoalCategoryText = (goalCategory: GoalCategory) => {
    switch (goalCategory) {
        case GoalCategory.Personal:
            return 'Personal';
        case GoalCategory.Business:
            return 'Business';
        case GoalCategory.Development:
            return 'Development';
        default:
            return goalCategory;
    }
};

export default getGoalCategoryText;