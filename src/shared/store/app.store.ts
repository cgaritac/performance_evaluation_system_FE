import { create } from 'zustand';
import { EvaluationWithGoalsResponseModel, GoalResponseModel } from '~/entities';

interface AppStore {
  evaluationSelected: EvaluationWithGoalsResponseModel | null;
  goalSelected: GoalResponseModel | null;
  setEvaluationSelected: (evaluation: EvaluationWithGoalsResponseModel) => void;
  setGoalSelected: (goal: GoalResponseModel) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  evaluationSelected: null,
  goalSelected: null,
  setEvaluationSelected: (evaluation: EvaluationWithGoalsResponseModel) => set({ evaluationSelected: evaluation }),
  setGoalSelected: (goal: GoalResponseModel) => set({ goalSelected: goal }),
}));
