import repositories from "../../../../frameworks/repositories/mongo";
import MongoConnect from "../../../../frameworks/database/mongo";
import { hederaAppRepositoryTests } from "../../common/hederaApp/hederaAppTests";

describe("Hedera app repository", () => {
  beforeAll(async () => {
    await MongoConnect.connect();
  });

  afterAll(async () => {
    await MongoConnect.disconnect();
  });
  
  hederaAppRepositoryTests(repositories);
});
