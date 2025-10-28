import { ActivityResponse } from "./activity-response.interface";

class ActivityResponseModel implements ActivityResponse {
    public id: number;
    public goalId: number;
    public title: string;
    public description: string;
    public createdBy: string;
    public createdOn: string;
    public updatedBy?: string;
    public updatedOn?: string;

    private constructor(
        id: number, 
        goalId: number,
        title: string,
        description: string,
        createdBy: string,
        createdOn: string,
        updatedBy?: string,
        updatedOn?: string,
    ) {
        this.id = id;
        this.goalId = goalId;
        this.title = title;
        this.description = description;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.updatedBy = updatedBy;
        this.updatedOn = updatedOn;
    }

    public static create({
        id = 0, 
        goalId = 0, 
        title = '',
        description = '',
        createdBy = '',
        createdOn = '',
        updatedBy,
        updatedOn
    }: Partial<ActivityResponse>): ActivityResponseModel {
        return new ActivityResponseModel(
            id, 
            goalId, 
            title,
            description,
            createdBy,
            createdOn,
            updatedBy,
            updatedOn
        );
    }
}

export default ActivityResponseModel;