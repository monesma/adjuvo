export interface CreateBuilder {
    firstname: string;
    lastname:string;
    nickname: string;
    wallet_id: string;
}

export interface BuilderQuery {
    _id:string;
    firstname: string;
    lastname:string;
    nickname: string;
    wallet_id: string;
    smartcontract_id: string;
    created_at: number;
    last_login: number;
    level: string;
    avatar?: string | null;
    score: number;
    missionsCompleted: number;
}