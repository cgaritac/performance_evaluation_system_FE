import { ActivityRequest } from "./activity-request.interface";

class ActivityRequestModel implements ActivityRequest {
    public id: number;
    public goalId: number;
    public title: string;
    public description: string;

    private constructor(
        id: number, 
        goalId: number,
        title: string,
        description: string
    ) {
        this.id = id;
        this.goalId = goalId;
        this.title = title;
        this.description = description;
    }

    public static create({
        id = 0, 
        goalId = 0, 
        title = '',
        description = '',
    }: Partial<ActivityRequest>): ActivityRequestModel {
        return new ActivityRequestModel(id, goalId, title, description);
    }
}

export default ActivityRequestModel;