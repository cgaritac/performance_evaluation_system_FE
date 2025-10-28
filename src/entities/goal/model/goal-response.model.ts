import { Approval, GoalCategory, GoalStatus, GoalType } from "../enums";
import { GoalResponse } from "./goal-response.interface";

class GoalResponseModel implements GoalResponse {
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
    public createdBy: string;
    public createdOn: string;
    public updatedBy?: string;
    public updatedOn?: string;

    private constructor(
        id: number, 
        evaluationId: number, 
        goalCategory: GoalCategory, 
        goalType: GoalType, 
        title: string,
        description: string,
        dueDate: string,
        status: GoalStatus,
        createdBy: string,
        createdOn: string,
        approval?: Approval,
        startDate?: string,
        endDate?: string,
        updatedBy?: string,
        updatedOn?: string,
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
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.updatedBy = updatedBy;
        this.updatedOn = updatedOn;
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
        createdBy = '',
        createdOn = '',
        updatedBy,
        updatedOn
    }: Partial<GoalResponse>): GoalResponseModel {
        return new GoalResponseModel(
            id, 
            evaluationId, 
            goalCategory, 
            goalType, 
            title,
            description,
            dueDate,
            status,
            createdBy,
            createdOn,
            approval,
            startDate,
            endDate,
            updatedBy,
            updatedOn
        );
    }
}

export default GoalResponseModel;