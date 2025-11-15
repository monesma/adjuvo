import inMemoryDb from "../../../database/inMemory";
import { crudInMemoryCreator } from "../crudInMemoryCreator";
import { MissionDtoQuery, MissionQuery } from "../../../../types/mission/mission-types";

export default {
  ...crudInMemoryCreator<MissionDtoQuery, MissionQuery>({
    collectionName: "mission",
    inMemoryDb,
  }),
  getScMissionByBuilderScId: async (
    id: string
  ): Promise<MissionQuery | null> => {
    const entity = inMemoryDb["mission"].find(
      (u: MissionQuery) => {
        if (u.builder_id) {
          return u.builder_id === id;
        }
      }
    );
    return entity ? entity : null;
  },
  getScMissionByAppScId: async (
    id: string
  ): Promise<MissionQuery | null> => {
    const entity = inMemoryDb["mission"].find(
      (u: MissionQuery) => {
        if (u.app_id) {
          return u.app_id === id;
        }
      }
    );
    return entity ? entity : null;
  },
};
