import { Types } from "mongoose";
import { BuilderQuery } from "../../../../types/builder/builder-types";


export type mongoBuilderResponse = {
    firstname: string;
    lastname: string;
    nickname: string;
    wallet_id?: string | null;
    smartcontract_id?: string | null;
    level: string;
    score: number;
    missionsCompleted?: number;
    avatar?: string | null;
    created_at: number; //timestamp,
    last_login: number; //timestamp,
    _id: Types.ObjectId;
    __v: number;
  };


export const builderTypeFormatter = (
  builderMongoResponse: any
): BuilderQuery => {
  const builderMongo: mongoBuilderResponse = builderMongoResponse._doc
    ? builderMongoResponse._doc
    : builderMongoResponse;
  const { _id } = builderMongo;
  const formatted: any = { ...builderMongo, _id: _id.toString() };
  delete formatted.__v;
  const builder: BuilderQuery = { ...formatted };
  return builder;
};
