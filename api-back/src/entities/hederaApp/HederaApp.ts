import { HederaAppDtoQuery } from "../../types/hederaApp/hederaApp-types";

const now = new Date().getTime()

export default class HederaApp {
    public app_name: string;
    public app_twitter: string;
    public email: string;
    public wallet_id: string | null;
    public smartcontract_id: string;
    public level: string;
    public score: number;
    public missionsCompleted: number;
    public avatar: string | null;
    public topic_id?: string | null;
    public created_at: number;
    public last_login: number;

    constructor({app_name, app_twitter, email, wallet_id = null, smartcontract_id, level, score, missionsCompleted = 0, avatar = null, topic_id = null, created_at, last_login}: HederaAppDtoQuery){
        this.app_name = app_name;
        this.app_twitter = app_twitter;
        this.email = email;
        this.wallet_id = wallet_id;
        this.smartcontract_id = smartcontract_id;
        this.level = level;
        this.score = score;
        this.missionsCompleted = missionsCompleted;
        this.avatar = avatar;
        this.topic_id = topic_id;
        this.created_at = created_at ?? now;
        this.last_login = last_login ?? now;
    }
}