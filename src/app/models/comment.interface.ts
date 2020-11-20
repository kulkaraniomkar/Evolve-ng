export interface IComment {
    MentoshipActivityId: number;
    CommentId: number;
    IsActive: boolean;
    Comment: string;
    CreatedDateTime: Date;
    CreatedEmployeeId?: any;
    UpdatedEmployeeId?: any;
}