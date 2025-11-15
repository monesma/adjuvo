import repositories from "../../../../frameworks/repositories/mongo";
import MongoConnect from "../../../../frameworks/database/mongo";
import { builderRepositoryTests } from "../../common/builder/builderTests";

describe("Builder repository", () => {
  beforeAll(async () => {
    await MongoConnect.connect();
  });

  afterAll(async () => {
    await MongoConnect.disconnect();
  });
  
  builderRepositoryTests(repositories);
});
