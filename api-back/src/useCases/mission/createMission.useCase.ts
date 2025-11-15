import Mission from "../../entities/mission/Mission";
import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";
import { MissionDtoQuery } from "../../types/mission/mission-types";

export default (dependencies: any) => {
  const {
    repositories: { missionRepository },
  } = dependencies;

  if (!missionRepository) {
    throw new Error("the mission repository should be exist in dependencies");
  }

  const execute = async (
    missionData: MissionDtoQuery
  ): Promise<ResponseRequest> => {
    if (
      "title" in missionData === false ||
      "description" in missionData === false ||
      "reward" in missionData === false ||
      "currency" in missionData === false
    ) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: "It miss some information to create a mission",
          msg: "You need to have this minimum information: title, description, reward, currency",
        }),
        content: null,
      });
    }

    const now = new Date().getTime();

    const {
        app_id,
        title,
        description,
        reward,
        currency,
        nftReceipt = null,
        nftReward = null
    } = missionData;

    const newMission = new Mission({
        contract_address: null,
        app_id,
        builder_id: null,
        title,
        description,
        reward,
        currency,
        status: "Pending",
        creation_timestamp: now,
        nftReceipt,
        nftReward
    })

    const missionResponseDB = await missionRepository.add(newMission);
    if (!missionResponseDB) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: "Problem to save mission",
          msg: "a problem occured during creation of mission",
        }),
        content: null,
      });
    } else {
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
          mission: missionResponseDB,
        },
      });
    }
  };

  return { execute };
};