import { MissionDtoQuery } from "../../types/mission/mission-types";

const now = new Date().getTime()

export default class Mission {
    public contract_address: string | null;
    public app_id: string;
    public builder_id: string | null;
    public title: string;
    public description: string;
    public reward: number;
    public currency: string;
    public status: string;
    public creation_timestamp: number;
    // AJOUT DES PROPRIÉTÉS NFT
    public nftReceipt: {
        tokenId: string | null;
        serialNumber: number;
        transactionId: string;
        metadata?: string;
    } | null;
    public nftReward: {
        tokenId: string | null;
        serialNumber: number;
        transactionId: string;
        metadata?: string;
    } | null;

    constructor({
        contract_address = null, 
        app_id, 
        builder_id = null, 
        title, 
        description, 
        reward, 
        currency, 
        status, 
        creation_timestamp = now,
        nftReceipt = null,
        nftReward = null
    }: MissionDtoQuery){
        this.contract_address = contract_address;
        this.app_id = app_id;
        this.builder_id = builder_id;
        this.title = title;
        this.description = description;
        this.reward = reward;
        this.currency = currency;
        this.status = status;
        this.creation_timestamp = creation_timestamp;
        this.nftReceipt = nftReceipt;
        this.nftReward = nftReward;
    }
}