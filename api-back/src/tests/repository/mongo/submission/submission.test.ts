import repositories from "../../../../frameworks/repositories/mongo";
import MongoConnect from "../../../../frameworks/database/mongo";
import { submissionRepositoryTests } from "../../common/submission/submissionTests";

describe("Submission repository", () => {
  beforeAll(async () => {
    await MongoConnect.connect();
  });

  afterAll(async () => {
    await MongoConnect.disconnect();
  });
  
  submissionRepositoryTests(repositories);
});
