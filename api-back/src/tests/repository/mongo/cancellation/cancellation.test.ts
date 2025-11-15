import repositories from "../../../../frameworks/repositories/mongo";
import MongoConnect from "../../../../frameworks/database/mongo";
import { cancellationRepositoryTests } from "../../common/cancellation/cancellationTest";

describe("Cancellation repository", () => {
  beforeAll(async () => {
    await MongoConnect.connect();
  });

  afterAll(async () => {
    await MongoConnect.disconnect();
  });
  
  cancellationRepositoryTests(repositories);
});
