import { crudMongoCreator } from "../crudMongoCreator";
import { notificationTypeFormatter } from "../../../common/adapter/notifications/NotificationAdapter";
import { NotificationDtoQuery, NotificationQuery } from "../../../../types/notifications/notifications-types";
import NotificationModel from "../../../database/mongo/schemas/notification.schema";

export default {
  ...crudMongoCreator<NotificationDtoQuery, NotificationQuery>({
    entityModel: NotificationModel,
    entityTypeFormatter: notificationTypeFormatter,
  }),

  getNotificationsByBuilderScId: async (
    builder_id: string
  ): Promise<NotificationQuery[] | null> => {
    try {
      const response: NotificationDtoQuery[] = await NotificationModel.find({
        builder_id,
        who: "builder",
      });

      return response.length > 0
        ? response.map(notificationTypeFormatter)
        : null;

    } catch (e) {
      return null;
    }
  },

  getNotificationsByAppScId: async (
    app_id: string
  ): Promise<NotificationQuery[] | null> => {
    try {
      const response: NotificationDtoQuery[] = await NotificationModel.find({
        app_id,
        who: "app",
      });

      return response.length > 0
        ? response.map(notificationTypeFormatter)
        : null;

    } catch (e) {
      return null;
    }
  },
};
