import { GoalResponseModel, GoalStatus } from "~/entities";

const getGoalStats = (goals: GoalResponseModel[] = []) => {
  return {
    finished: goals.filter(g => g.status === GoalStatus.Finished).length,
    inProgress: goals.filter(g => g.status === GoalStatus.InProgress).length,
    delayed: goals.filter(g => g.status === GoalStatus.Delayed).length,
  };
};

export default getGoalStats;