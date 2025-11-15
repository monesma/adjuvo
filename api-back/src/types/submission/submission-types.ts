export interface SubmissionQuery {
    _id: string;
    app_id: string;
    builder_id: string | null;
    mission_id: string;
    status: string;
    creation_timestamp: number;
}

export interface SubmissionDtoQuery {
    app_id: string;
    builder_id: string | null;
    mission_id: string;
    status: string;
    creation_timestamp: number;
}  