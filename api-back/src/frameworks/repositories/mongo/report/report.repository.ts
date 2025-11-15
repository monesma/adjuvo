import { crudMongoCreator } from "../crudMongoCreator";
import { ReportDtoQuery, ReportQuery } from "../../../../types/report/report-types";
import { reportTypeFormatter } from "../../../common/adapter/report/ReportAdapter";
import ReportModel from "../../../database/mongo/schemas/report.schema";


export default {
  ...crudMongoCreator<ReportDtoQuery, ReportQuery>({
    entityModel: ReportModel,
    entityTypeFormatter: reportTypeFormatter,
  })
};
