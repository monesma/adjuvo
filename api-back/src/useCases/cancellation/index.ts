import { CancellationDtoQuery, CancellationQuery } from "../../types/cancellation/cancellation-types";
import { crudUseCase } from "../crudUseCaseCreator";
export default {
  ...crudUseCase<CancellationDtoQuery, CancellationQuery>({
    repositoryName: "cancellationRepository",
    useCaseName: "cancellation",
  })
};
