import repositories from "../../../../frameworks/repositories/mongo";
import MongoConnect from "../../../../frameworks/database/mongo";
import { notificationRepositoryTests } from "../../common/notification/notificationTest";

describe("Notification repository", () => {
  beforeAll(async () => {
    await MongoConnect.connect();
  });

  afterAll(async () => {
    await MongoConnect.disconnect();
  });
  
  notificationRepositoryTests(repositories);
});
