import repositories from "../../../../frameworks/repositories/mongo";
import MongoConnect from "../../../../frameworks/database/mongo";
import { reportRepositoryTests } from "../../common/report/reportTest";

describe("Report repository", () => {
  beforeAll(async () => {
    await MongoConnect.connect();
  });

  afterAll(async () => {
    await MongoConnect.disconnect();
  });
  
  reportRepositoryTests(repositories);
});
