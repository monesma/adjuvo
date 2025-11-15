import { Types } from "mongoose";
import { CancellationQuery } from "../../../../types/cancellation/cancellation-types";
    
export type mongoCancellationResponse = {
  app_id: string;
  builder_id: string | null;
  reason: string | null;
  mission_id: string | null;
  status: string;
  creation_timestamp: number;
    _id: Types.ObjectId;
    __v: number;
}

export const cancellationTypeFormatter = (
  cancellationMongoResponse: any
): CancellationQuery => {
  const cancellationMongo: mongoCancellationResponse = cancellationMongoResponse._doc
    ? cancellationMongoResponse._doc
    : cancellationMongoResponse;
  const { _id } = cancellationMongo;
  const formatted: any = { ...cancellationMongo, _id: _id.toString() };
  delete formatted.__v;
  const cancellation: CancellationQuery = { ...formatted };
  return cancellation;
};
