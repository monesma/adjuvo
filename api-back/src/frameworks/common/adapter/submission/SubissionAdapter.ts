import { Types } from "mongoose";
import { SubmissionQuery } from "../../../../types/submission/submission-types";
    
export type mongoSubmissionResponse = {
  app_id: string;
  builder_id: string | null;
  mission_id: string;
  status: string;
  creation_timestamp: number;
    _id: Types.ObjectId;
    __v: number;
}

export const submissionTypeFormatter = (
  submissionMongoResponse: any
): SubmissionQuery => {
  const submissionMongo: mongoSubmissionResponse = submissionMongoResponse._doc
    ? submissionMongoResponse._doc
    : submissionMongoResponse;
  const { _id } = submissionMongo;
  const formatted: any = { ...submissionMongo, _id: _id.toString() };
  delete formatted.__v;
  const submission: SubmissionQuery = { ...formatted };
  return submission;
};
