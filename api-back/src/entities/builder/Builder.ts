import { BuilderDtoQuery } from "../../types/builder/builder-types";

const now = new Date().getTime()

export default class Builder {
    public firstname: string;
    public lastname: string;
    public nickname: string;
    public wallet_id: string | null
    public smartcontract_id: string | null
    public level: string;
    public score: number;
    public missionsCompleted: number;
    public avatar: string | null;
    public created_at: number;
    public last_login: number;
    
    constructor({
        firstname, 
        lastname, 
        nickname,
        wallet_id = null,
        smartcontract_id = null,
        level,
        score,
        missionsCompleted = 0,
        avatar = null,
        created_at,
        last_login,
    }: BuilderDtoQuery) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.nickname = nickname;
        this.wallet_id = wallet_id;
        this.smartcontract_id = smartcontract_id;
        this.level = level;
        this.score = score;
        this.missionsCompleted = missionsCompleted
        this.avatar = avatar
        this.created_at = created_at ?? now;
        this.last_login = last_login ?? now;
    }
}
