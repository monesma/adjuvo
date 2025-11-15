import { NotificationDtoQuery, NotificationQuery } from "../../types/notifications/notifications-types";
import { crudUseCase } from "../crudUseCaseCreator";
import getNotificationForAppUseCase from "./getNotificationForApp.useCase";
import getNotificationForBuilderUseCase from "./getNotificationForBuilder.useCase";
export default {
  ...crudUseCase<NotificationDtoQuery, NotificationQuery>({
    repositoryName: "notificationRepository",
    useCaseName: "notification",
  }),
  getNotificationForAppUseCase,
  getNotificationForBuilderUseCase
};
