export interface NotificationQuery {
    _id: string;
    app_id: string;
    builder_id: string | null;
    title: string;
    description: string;
    who: string;
    mission_id?: string | null;
    cancellation_id?: string | null;
    status: string;
    creation_date: number;
}

export interface NotificationDtoQuery {
    app_id: string;
    builder_id: string | null;
    title: string;
    description: string;
    who: string;
    mission_id?: string | null;
    cancellation_id?: string | null;
    status: string;
    creation_date: number;
}  
