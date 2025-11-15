import { crudMongoCreator } from "../crudMongoCreator";
import { missionTypeFormatter } from "../../../common/adapter/mission/MissionAdapter";
import MissionModel from "../../../database/mongo/schemas/mission.schema";
import { MissionDtoQuery, MissionQuery } from "../../../../types/mission/mission-types";

export default {
  ...crudMongoCreator<MissionDtoQuery, MissionQuery>({
    entityModel: MissionModel,
    entityTypeFormatter: missionTypeFormatter,
  }),
  getScMissionByBuilderScId: async (
    builder_id: string
  ): Promise<MissionQuery[] | null> => {
    const response: any = await MissionModel.find({
      builder_id: builder_id,
    });
    try {
      if (response.length !== 0) {
        return response.map((mission: MissionDtoQuery) =>
          missionTypeFormatter(mission)
        );
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
  getScMissionByAppScId: async (
    app_id: string
  ): Promise<MissionQuery[] | null> => {
    const response: any = await MissionModel.find({
      app_id: app_id,
    });
    try {
      if (response.length !== 0) {
        return response.map((mission: MissionDtoQuery) =>
          missionTypeFormatter(mission)
        );
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
};
