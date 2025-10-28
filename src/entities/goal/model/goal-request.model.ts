import { Approval, GoalCategory, GoalStatus, GoalType } from "../enums";
import { GoalRequest } from "./goal-request.interface";

class GoalRequestModel implements GoalRequest {
    public id: number;
    public evaluationId: number;
    public goalCategory: GoalCategory;
    public goalType: GoalType;
    public title: string;
    public description: string;
    public approval?: Approval;
    public startDate?: string;
    public endDate?: string;
    public dueDate: string;
    public status: GoalStatus;

    private constructor(
        id: number, 
        evaluationId: number, 
        goalCategory: GoalCategory, 
        goalType: GoalType, 
        title: string,
        description: string,
        dueDate: string,
        status: GoalStatus,
        approval?: Approval,
        startDate?: string,
        endDate?: string,
    ) {
        this.id = id;
        this.evaluationId = evaluationId;
        this.goalCategory = goalCategory;
        this.goalType = goalType;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
        this.approval = approval;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public static create({
        id = 0, 
        evaluationId = 0, 
        goalCategory = GoalCategory.Business, 
        goalType = GoalType.SelfAssigned, 
        title = '',
        description = '',
        dueDate = '',
        status = GoalStatus.NotStarted,
        approval,
        startDate,
        endDate,
    }: Partial<GoalRequest>): GoalRequestModel {
        return new GoalRequestModel(
            id, 
            evaluationId, 
            goalCategory, 
            goalType, 
            title,
            description,
            dueDate,
            status,
            approval,
            startDate,
            endDate,
        );
    }
}

export default GoalRequestModel;