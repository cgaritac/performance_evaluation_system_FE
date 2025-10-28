export interface ActivityResponse {
    id: number;
    goalId: number;
    title: string;
    description: string;
    createdBy: string;
    createdOn: string;
    updatedBy?: string;
    updatedOn?: string;
}