import { CancellationDtoQuery } from "../../types/cancellation/cancellation-types";

const now = new Date().getTime()

export default class Cancellation {
    public app_id: string;
    public builder_id: string | null;
    public reason: string | null;
    public mission_id: string | null;
    public status: string;
    public creation_timestamp: number;//timestamp

    constructor({ app_id, builder_id, reason, mission_id = null, status, creation_timestamp = now, }: CancellationDtoQuery){
        this.app_id = app_id;
        this.builder_id = builder_id;
        this.reason = reason
        this.mission_id = mission_id;
        this.status = status;
        this.creation_timestamp = creation_timestamp;
    }
}