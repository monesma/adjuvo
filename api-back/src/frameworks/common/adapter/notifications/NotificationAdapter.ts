import { Types } from "mongoose";
import { NotificationQuery } from "../../../../types/notifications/notifications-types";
    
export type mongoNotificationResponse = {
  app_id: string;
  builder_id: string | null;
  title: string;
  description: string;
  who: string;
  mission_id: string | null;
  cancellation_id: string | null;
  status: string;
  creation_date: number;
    _id: Types.ObjectId;
    __v: number;
}

export const notificationTypeFormatter = (
  notificationMongoResponse: any
): NotificationQuery => {
  const notificationMongo: mongoNotificationResponse = notificationMongoResponse._doc
    ? notificationMongoResponse._doc
    : notificationMongoResponse;
  const { _id } = notificationMongo;
  const formatted: any = { ...notificationMongo, _id: _id.toString() };
  delete formatted.__v;
  const notification: NotificationQuery = { ...formatted };
  return notification;
};
