export interface HederaAppQuery {
    _id: string;
    app_name: string;
    app_twitter: string;
    email: string;
    wallet_id?:  string | null;
    smartcontract_id: string;
    level: string;
    score: number;
    missionsCompleted?: number;
    avatar?: string | null;
    topic_id?: string | null;
    created_at?: number; //timestamp,
    last_login?: number; //timestamp,
}

export interface HederaAppDtoQuery {
    app_name: string;
    app_twitter: string;
    email: string;
    wallet_id?: string | null;
    smartcontract_id: string;
    level: string;
    score: number;
    missionsCompleted?: number;
    avatar?: string | null;
    topic_id?: string | null;
    created_at?: number; //timestamp,
    last_login?: number; //timestamp,
}

export interface HederaAppSigninQuery {
    wallet_id: string;
}