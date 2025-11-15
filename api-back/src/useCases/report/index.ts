import { ReportDtoQuery, ReportQuery } from "../../types/report/report-types";
import { crudUseCase } from "../crudUseCaseCreator";
export default {
  ...crudUseCase<ReportDtoQuery, ReportQuery>({
    repositoryName: "reportRepository",
    useCaseName: "report",
  })
};
