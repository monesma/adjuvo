export interface CreateHederaApp {
    app_name: string;
    app_twitter: string;
    email: string;
    wallet_id: string;
}

export interface HederaAppQuery {
    _id:string;
    app_name: string;
    app_twitter: string;
    email: string;
    wallet_id: string;
    smartcontract_id: string;
    created_at: number;
    last_login: number;
    level: string;
    score: number;
    missionsCompleted: number;
    avatar?: string | null;
    topic_id?: string;
}