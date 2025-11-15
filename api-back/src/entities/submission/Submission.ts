import { SubmissionDtoQuery } from "../../types/submission/submission-types";

const now = new Date().getTime()

export default class Submission {
    public app_id: string;
    public builder_id: string | null;
    public mission_id: string;
    public status: string;
    public creation_timestamp: number;

    constructor({app_id, builder_id, mission_id, status, creation_timestamp = now, }: SubmissionDtoQuery){
        this.app_id = app_id;
        this.builder_id = builder_id;
        this.mission_id = mission_id;
        this.status = status;
        this.creation_timestamp = creation_timestamp;
    }
}