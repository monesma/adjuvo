import { Types } from "mongoose";
import { MissionQuery } from "../../../../types/mission/mission-types";
    
export type mongoMissionResponse = {
  contract_address: string | null;
  app_id: string;
  builder_id: string | null;
  title: string;
  description: string;
  reward: number;
  currency: string;
  status: string;
  creation_timestamp: number;
  nftReceipt: {
    tokenId: string | null;
    serialNumber: number;
    transactionId: string;
    metadata?: string;
  } | null;
  nftReward: {
    tokenId: string | null;
    serialNumber: number;
    transactionId: string;
    metadata?: string;
  } | null;
  _id: Types.ObjectId;
  __v: number;
}

export const missionTypeFormatter = (
  missionMongoResponse: any
): MissionQuery => {
  const missionMongo: mongoMissionResponse = missionMongoResponse._doc
    ? missionMongoResponse._doc
    : missionMongoResponse;
  const { _id } = missionMongo;
  const formatted: any = { ...missionMongo, _id: _id.toString() };
  delete formatted.__v;
  const mission: MissionQuery = { ...formatted };
  return mission;
};