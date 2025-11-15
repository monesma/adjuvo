import { ReportDtoQuery, ReportQuery } from "../../../../types/report/report-types";
import inMemoryDb from "../../../database/inMemory";
import { crudInMemoryCreator } from "../crudInMemoryCreator";

export default {
  ...crudInMemoryCreator<ReportDtoQuery,ReportQuery>({
    collectionName: "report",
    inMemoryDb,
  }),
};
