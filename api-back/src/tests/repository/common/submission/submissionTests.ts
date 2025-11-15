import { crudTestCreator } from "../crudTestCreator";
import Submission from "../../../../entities/submission/Submission";
import { SubmissionDtoQuery, SubmissionQuery } from "../../../../types/submission/submission-types";

export const submissionRepositoryTests = (repositories: any) => {
  const { submissionRepository } = repositories;

  const smartContract1 = new Submission({
    app_id: "kjrfekgnfjg1345",
    builder_id: "kjrfFDekgnfjg1345",
    mission_id: "vbnjkfsbn",
    status: "free",
    creation_timestamp: 1732801928,
  });

  const smartContract2 = new Submission({
    app_id: "kjrfekgnfjgz345",
    builder_id: "efdg332",
    mission_id: "sdflkfsb",
    status: "free",
    creation_timestamp: 1732901928,
  });

  crudTestCreator<SubmissionDtoQuery, SubmissionQuery>(
    submissionRepository,
    smartContract1,
    smartContract2,
    "submission"
  );

  describe("getScSubmissionByBuilderScId", () => {
    beforeAll(async () => {
      await submissionRepository.add(smartContract1);
      await submissionRepository.add(smartContract2);
    });

    it("should return a submission when a valid builder ID is provided", async () => {
      const result =
        await submissionRepository.getScSubmissionByBuilderScId("kjrfFDekgnfjg1345");

      const contract = Array.isArray(result) ? result[0] : result;

      expect(contract).toEqual(
        expect.objectContaining({
          app_id: "kjrfekgnfjg1345",
          builder_id: "kjrfFDekgnfjg1345",
          mission_id: "vbnjkfsbn",
          status: "free",
          creation_timestamp: 1732801928,
        })
      );
    });

    it("should return null when no submission matches the builder ID", async () => {
      const result = await submissionRepository.getScSubmissionByBuilderScId("nonExistentId");
      expect(result).toBeNull();
    });

    it("should handle an empty builder ID gracefully", async () => {
      const result = await submissionRepository.getScSubmissionByBuilderScId("");
      expect(result).toBeNull();
    });

    it("should handle a null builder ID gracefully", async () => {
      const result = await submissionRepository.getScSubmissionByBuilderScId(null);
      expect(result).toBeNull();
    });
  });

  describe("getScSubmissionByAppScId", () => {
    beforeAll(async () => {
      await submissionRepository.add(smartContract1);
      await submissionRepository.add(smartContract2);
    });

    it("should return a submission when a valid app ID is provided", async () => {
      const result = await submissionRepository.getScSubmissionByAppScId("kjrfekgnfjgz345");

      const contract = Array.isArray(result) ? result[0] : result;

      expect(contract).toEqual(
        expect.objectContaining({
          app_id: "kjrfekgnfjgz345",
          builder_id: "efdg332",
          mission_id: "sdflkfsb",
          status: "free",
          creation_timestamp: 1732901928,
        })
      );
    });

    it("should return null when no submission matches the app ID", async () => {
      const result = await submissionRepository.getScSubmissionByAppScId("nonExistentId");
      expect(result).toBeNull();
    });

    it("should handle an empty app ID gracefully", async () => {
      const result = await submissionRepository.getScSubmissionByAppScId("");
      expect(result).toBeNull();
    });

    it("should handle a null app ID gracefully", async () => {
      const result = await submissionRepository.getScSubmissionByAppScId(null);
      expect(result).toBeNull();
    });
  });
};
