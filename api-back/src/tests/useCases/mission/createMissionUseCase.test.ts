import useCases from "../../../useCases";
const { createMissionUseCase } = useCases;
import repositories from "../../../frameworks/repositories/inMemory";
const { missionRepository } = repositories;
import ResponseError from "../../../frameworks/common/ResponseError";
import Mission from "../../../entities/mission/Mission";
import { MissionDtoQuery } from "../../../types/mission/mission-types";

const badMission = {
  app_id: "kjrfekgnfjg1345",
  builder_id: "kjrfFDekgnfjg1345",
  title: "Test title",
  created_at: 1672531200, // Timestamp : 01/01/2023
  last_login: 1704067200, // Timestamp : 01/01/2024
}

const missionComplete: MissionDtoQuery = new Mission({
  contract_address: "0x1d1b9e2c4d6f8a8910d8b7f4",
  app_id: "kjrfekgnfjg1345",
  builder_id: "kjrfFDekgnfjg1345",
  title: "Test title",
  description: "Test description",
  reward: 400,
  currency: "HBAR",
  status: "Pending",
  creation_timestamp: 1732801928,
});

describe("Signup Mission tests", () => {
  const dependencies = {
    repositories: { missionRepository },
  };

  const createMission = createMissionUseCase(dependencies).execute;

  it("Should have minimum creation query", async () => {

    //@ts-ignore
    const addedMission = await createMission(badMission);
    expect(addedMission).toEqual({
        status: 500,
        error: new ResponseError({
          error: "It miss some information to create a mission",
          msg: "You need to have this minimum information: title, description, reward, currency",
        }),
        content: null,
      });
  });

  it("Should be registred if mission informations are complete", async () => {
    const addedMission = await createMission(missionComplete);
    const { mission } = addedMission.content;
    expect(mission).toBeDefined();
  })
});
