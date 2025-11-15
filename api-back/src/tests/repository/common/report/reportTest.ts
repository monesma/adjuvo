import { crudTestCreator } from "../crudTestCreator";
import Report from "../../../../entities/report/Report";
import { ReportDtoQuery, ReportQuery } from "../../../../types/report/report-types";

export const reportRepositoryTests = (repositories: any) => {
  const { reportRepository } = repositories;

  const smartContract1 = new Report({
    app_id: "kjrfekgnfjg1345",
    builder_id: "kjrfFDekgnfjg1345",
    reason: "Test description",
    mission_id: "bfsbsfsf455",
    status: "free",
    creation_timestamp: 1732801928,
  });

  const smartContract2 = new Report({
    app_id: "kjrfekgnfjgz345",
    builder_id: "efdg332",
    reason: "Test description",
    mission_id: "bfsbsfsf455",
    status: "free",
    creation_timestamp: 1732901928,
  });

  crudTestCreator<ReportDtoQuery, ReportQuery>(
    reportRepository,
    smartContract1,
    smartContract2,
    "report"
  );
};
