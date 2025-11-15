export interface CancellationQuery {
    _id: string;
    app_id: string | null;
    builder_id: string | null;
    reason: string | null;
    mission_id?: string | null;
    status: string;
    creation_timestamp: number;
}

export interface CreateNewCancellation {
    app_id: string | null;
    builder_id: string | null;
    reason: string | null;
    mission_id?: string | null;
}  