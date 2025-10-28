import { Approval, GoalCategory, GoalStatus, GoalType } from "../enums";

export interface GoalResponse {
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
    createdBy: string;
    createdOn: string;
    updatedBy?: string;
    updatedOn?: string;
}