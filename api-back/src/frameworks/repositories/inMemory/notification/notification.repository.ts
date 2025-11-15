import { NotificationDtoQuery, NotificationQuery } from "../../../../types/notifications/notifications-types";
import inMemoryDb from "../../../database/inMemory";
import { crudInMemoryCreator } from "../crudInMemoryCreator";

export default {
  ...crudInMemoryCreator<NotificationDtoQuery, NotificationQuery>({
    collectionName: "notification",
    inMemoryDb,
  }),
  getNotificationsByBuilderScId: async (
    id: string
  ): Promise<NotificationQuery[] | null> => {
    const entities = inMemoryDb["notification"].filter(
      (u: NotificationQuery) =>
        u.builder_id === id && u.who === "builder"
    );
    return entities.length > 0 ? entities : null;
  },

  getNotificationsByAppScId: async (
    id: string
  ): Promise<NotificationQuery[] | null> => {
    const entities = inMemoryDb["notification"].filter(
      (u: NotificationQuery) =>
        u.app_id === id && u.who === "app"
    );
    return entities.length > 0 ? entities : null;
  },
};
