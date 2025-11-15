import { crudTestCreator } from "../crudTestCreator";
import Mission from "../../../../entities/mission/Mission";
import { MissionDtoQuery, MissionQuery } from "../../../../types/mission/mission-types";

export const missionRepositoryTests = (repositories: any) => {
  const { missionRepository } = repositories;

  const smartContract1 = new Mission({
    contract_address: "0x1d1b9e2c4d6f8a8910d8b7f4",
    app_id: "kjrfekgnfjg1345",
    builder_id: "kjrfFDekgnfjg1345",
    title: "Test title",
    description: "Test description",
    reward: 400,
    currency: "HBAR",
    status: "free",
    creation_timestamp: 1732801928,
  });

  const smartContract2 = new Mission({
    contract_address: "0x1d1b9a2c4d6f8a8910d8b7f4",
    app_id: "kjrfekgnfjgz345",
    builder_id: "efdg332",
    title: "Test title",
    description: "Test description",
    reward: 320,
    currency: "HBAR",
    status: "free",
    creation_timestamp: 1732901928,
  });

  crudTestCreator<MissionDtoQuery, MissionQuery>(
    missionRepository,
    smartContract1,
    smartContract2,
    "mission"
  );

  describe("getScMissionByBuilderScId", () => {
    beforeAll(async () => {
      await missionRepository.add(smartContract1);
      await missionRepository.add(smartContract2);
    });

    it("should return a mission when a valid builder ID is provided", async () => {
      const result =
        await missionRepository.getScMissionByBuilderScId("kjrfFDekgnfjg1345");

      const contract = Array.isArray(result) ? result[0] : result;

      expect(contract).toEqual(
        expect.objectContaining({
          contract_address: "0x1d1b9e2c4d6f8a8910d8b7f4",
          app_id: "kjrfekgnfjg1345",
          builder_id: "kjrfFDekgnfjg1345",
          title: "Test title",
          description: "Test description",
          reward: 400,
          currency: "HBAR",
          status: "free",
          creation_timestamp: 1732801928,
        })
      );
    });

    it("should return null when no mission matches the builder ID", async () => {
      const result = await missionRepository.getScMissionByBuilderScId("nonExistentId");
      expect(result).toBeNull();
    });

    it("should handle an empty builder ID gracefully", async () => {
      const result = await missionRepository.getScMissionByBuilderScId("");
      expect(result).toBeNull();
    });

    it("should handle a null builder ID gracefully", async () => {
      const result = await missionRepository.getScMissionByBuilderScId(null);
      expect(result).toBeNull();
    });
  });

  describe("getScMissionByAppScId", () => {
    beforeAll(async () => {
      await missionRepository.add(smartContract1);
      await missionRepository.add(smartContract2);
    });

    it("should return a mission when a valid app ID is provided", async () => {
      const result =
        await missionRepository.getScMissionByAppScId("kjrfekgnfjg1345");

      const contract = Array.isArray(result) ? result[0] : result;

      expect(contract).toEqual(
        expect.objectContaining({
          contract_address: "0x1d1b9e2c4d6f8a8910d8b7f4",
          app_id: "kjrfekgnfjg1345",
          builder_id: "kjrfFDekgnfjg1345",
          title: "Test title",
          description: "Test description",
          reward: 400,
          currency: "HBAR",
          status: "free",
          creation_timestamp: 1732801928,
        })
      );
    });

    it("should return null when no mission matches the app ID", async () => {
      const result =
        await missionRepository.getScMissionByAppScId("nonExistentId");
      expect(result).toBeNull();
    });

    it("should handle an empty app ID gracefully", async () => {
      const result = await missionRepository.getScMissionByAppScId("");
      expect(result).toBeNull();
    });

    it("should handle a null app ID gracefully", async () => {
      const result = await missionRepository.getScMissionByAppScId(null);
      expect(result).toBeNull();
    });
  });
};
