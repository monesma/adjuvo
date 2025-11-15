export interface ReportQuery {
    _id: string;
    app_id: string;
    builder_id: string | null;
    reason: string | null;
    mission_id?: string | null;
    status: string;
    creation_timestamp: number;
}

export interface ReportDtoQuery {
    app_id: string;
    builder_id: string | null;
    reason: string | null;
    mission_id?: string | null;
    status: string;
    creation_timestamp: number;
}  
