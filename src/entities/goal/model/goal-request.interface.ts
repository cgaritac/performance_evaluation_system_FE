import { Approval, GoalCategory, GoalStatus, GoalType } from "../enums";

export interface GoalRequest {
    id: number;
    evaluationId: number;
    goalCategory: GoalCategory;
    goalType: GoalType;
    title: string;
    description: string;
    approval?: Approval;
    startDate?: string;
    endDate?: string;
    dueDate: string;
    status: GoalStatus;
}