import repositories from "../../../../frameworks/repositories/mongo";
import MongoConnect from "../../../../frameworks/database/mongo";
import { missionRepositoryTests } from "../../common/mission/missionTests";

describe("Mission repository", () => {
  beforeAll(async () => {
    await MongoConnect.connect();
  });

  afterAll(async () => {
    await MongoConnect.disconnect();
  });
  
  missionRepositoryTests(repositories);
});
