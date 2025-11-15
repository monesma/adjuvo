import { Types } from "mongoose";
import { HederaAppQuery } from "../../../../types/hederaApp/hederaApp-types";
    
export type mongoHederaAppResponse = {
    app_name: string;
    app_twitter: string;
    email: string;
    wallet_id: string | null;
    smartcontract_id: string;
    level: string;
    score: number;
    missionsCompleted?: number;
    avatar?: string | null;
    topic_id?: string | null;
    created_at: number; //timestamp,
    last_login: number; //timestamp,
    _id: Types.ObjectId;
    __v: number;
}

export const hederaAppTypeFormatter = (
  hederaAppMongoResponse: any
): HederaAppQuery => {
  const hederaAppMongo: mongoHederaAppResponse = hederaAppMongoResponse._doc
    ? hederaAppMongoResponse._doc
    : hederaAppMongoResponse;
  const { _id } = hederaAppMongo;
  const formatted: any = { ...hederaAppMongo, _id: _id.toString() };
  delete formatted.__v;
  const hederaApp: HederaAppQuery = { ...formatted };
  return hederaApp;
};
