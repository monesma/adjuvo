export interface BuilderQuery {
    _id: string;
    firstname: string;
    lastname: string;
    nickname: string;
    wallet_id?: string | null;
    smartcontract_id?: string | null;
    level: string;
    score: number;
    missionsCompleted?: number;
    avatar?: string | null;
    created_at?: number; //timestamp,
    last_login?: number; //timestamp,
}

export interface BuilderDtoQuery {
    firstname: string;
    lastname: string;
    nickname: string;
    wallet_id?: string | null;
    smartcontract_id?: string | null;
    level: string;
    score: number;
    missionsCompleted?: number;
    avatar?: string | null;
    created_at?: number; //timestamp,
    last_login?: number; //timestamp,
}

export interface BuilderSigninQuery {
    wallet_id: string;
}