import { crudTestCreator } from "../crudTestCreator";
import Notifications from "../../../../entities/notifications/Notifications";
import { NotificationDtoQuery, NotificationQuery } from "../../../../types/notifications/notifications-types";

export const notificationRepositoryTests = (repositories: any) => {
  const { notificationRepository } = repositories;

  const smartContract1 = new Notifications({
    app_id: "kjrfekgnfjg1345",
    builder_id: "kjrfFDekgnfjg1345",
    title: "Test title",
    description: "Test description",
    who: "builder",
    mission_id: "bfsbsfsf455",
    status: "free",
    creation_date: 1732801928,
  });

  const smartContract2 = new Notifications({
    app_id: "kjrfekgnfjgz345",
    builder_id: "efdg332",
    title: "Test title",
    description: "Test description",
    who: "app",
    mission_id: "bfsbsfsf455",
    status: "free",
    creation_date: 1732901928,
  });

  crudTestCreator<NotificationDtoQuery, NotificationQuery>(
    notificationRepository,
    smartContract1,
    smartContract2,
    "notification"
  );

  describe("getNotificationByBuilderScId", () => {
    beforeAll(async () => {
      await notificationRepository.add(smartContract1);
      await notificationRepository.add(smartContract2);
    });

    it("should return a notification when a valid builder ID is provided", async () => {
      const result =
        await notificationRepository.getNotificationByBuilderScId("kjrfFDekgnfjg1345");

      const contract = Array.isArray(result) ? result[0] : result;

      expect(contract).toEqual(
        expect.objectContaining({
          app_id: "kjrfekgnfjg1345",
          builder_id: "kjrfFDekgnfjg1345",
          title: "Test title",
          description: "Test description",
          who: "builder",
          mission_id: "bfsbsfsf455",
          status: "Pending",
          creation_date: 1732801928,
        })
      );
    });

    it("should return null when no notification matches the builder ID", async () => {
      const result = await notificationRepository.getNotificationByBuilderScId("nonExistentId");
      expect(result).toBeNull();
    });

    it("should handle an empty builder ID gracefully", async () => {
      const result = await notificationRepository.getNotificationByBuilderScId("");
      expect(result).toBeNull();
    });

    it("should handle a null builder ID gracefully", async () => {
      const result = await notificationRepository.getNotificationByBuilderScId(null);
      expect(result).toBeNull();
    });
  });

  describe("getNotificationByAppScId", () => {
    beforeAll(async () => {
      await notificationRepository.add(smartContract1);
      await notificationRepository.add(smartContract2);
    });

    it("should return a notification when a valid app ID is provided", async () => {
      const result =
        await notificationRepository.getNotificationByAppScId("kjrfekgnfjg1345");

      const contract = Array.isArray(result) ? result[0] : result;

      expect(contract).toEqual(
        expect.objectContaining({
          app_id: "kjrfekgnfjg1345",
          builder_id: "kjrfFDekgnfjg1345",
          title: "Test title",
          description: "Test description",
          who: "builder",
          mission_id: "bfsbsfsf455",
          status: "Pending",
          creation_date: 1732801928,
        })
      );
    });

    it("should return null when no notification matches the app ID", async () => {
      const result =
        await notificationRepository.getNotificationByAppScId("nonExistentId");
      expect(result).toBeNull();
    });

    it("should handle an empty app ID gracefully", async () => {
      const result = await notificationRepository.getNotificationByAppScId("");
      expect(result).toBeNull();
    });

    it("should handle a null app ID gracefully", async () => {
      const result = await notificationRepository.getNotificationByAppScId(null);
      expect(result).toBeNull();
    });
  });
};
