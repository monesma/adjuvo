import { Types } from "mongoose";
import { ReportQuery } from "../../../../types/report/report-types";
    
export type mongoReportResponse = {
  app_id: string;
  builder_id: string | null;
  reason: string | null;
  mission_id: string | null;
  status: string;
  creation_timestamp: number;
    _id: Types.ObjectId;
    __v: number;
}

export const reportTypeFormatter = (
  reportMongoResponse: any
): ReportQuery => {
  const reportMongo: mongoReportResponse = reportMongoResponse._doc
    ? reportMongoResponse._doc
    : reportMongoResponse;
  const { _id } = reportMongo;
  const formatted: any = { ...reportMongo, _id: _id.toString() };
  delete formatted.__v;
  const report: ReportQuery = { ...formatted };
  return report;
};
