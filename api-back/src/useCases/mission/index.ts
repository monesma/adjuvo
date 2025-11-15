import { crudUseCase } from "../crudUseCaseCreator";
import getScMissionForBuilderUseCase from "./getScMissionForBuilder.useCase";
import getScMissionForAppUseCase from "./getScMissionForApp.useCase";
import createMissionUseCase from "./createMission.useCase"
import { MissionDtoQuery, MissionQuery } from "../../types/mission/mission-types";
export default {
  ...crudUseCase<MissionDtoQuery, MissionQuery>({
    repositoryName: "missionRepository",
    useCaseName: "mission",
  }),
  createMissionUseCase,
  getScMissionForBuilderUseCase,
  getScMissionForAppUseCase
};
