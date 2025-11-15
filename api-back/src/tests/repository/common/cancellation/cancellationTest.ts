import { crudTestCreator } from "../crudTestCreator";
import Cancellation from "../../../../entities/cancellation/Cancellation";
import { CancellationDtoQuery, CancellationQuery } from "../../../../types/cancellation/cancellation-types";

export const cancellationRepositoryTests = (repositories: any) => {
  const { cancellationRepository } = repositories;

  const smartContract1 = new Cancellation({
    app_id: "kjrfekgnfjg1345",
    builder_id: "kjrfFDekgnfjg1345",
    reason: "Test description",
    mission_id: "bfsbsfsf455",
    status: "free",
    creation_timestamp: 1732801928,
  });

  const smartContract2 = new Cancellation({
    app_id: "kjrfekgnfjgz345",
    builder_id: "efdg332",
    reason: "Test description",
    mission_id: "bfsbsfsf455",
    status: "free",
    creation_timestamp: 1732901928,
  });

  crudTestCreator<CancellationDtoQuery, CancellationQuery>(
    cancellationRepository,
    smartContract1,
    smartContract2,
    "cancellation"
  );
};
