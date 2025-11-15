import { NotificationDtoQuery } from "../../types/notifications/notifications-types";

const now = new Date().getTime()

export default class Notifications {
    public app_id: string;
    public builder_id: string | null;
    public title: string;
    public description: string;
    public who: string;
    public mission_id: string | null;
    public cancellation_id: string | null;
    public status: string;
    public creation_date: number;//timestamp

    constructor({ app_id, builder_id, title, description, who, mission_id = null, cancellation_id = null, status, creation_date = now }: NotificationDtoQuery){
        this.app_id = app_id;
        this.builder_id = builder_id;
        this.title = title;
        this.description = description;
        this.who = who;
        this.mission_id = mission_id;
        this.cancellation_id = cancellation_id
        this.status = status;
        this.creation_date = creation_date;
    }
}