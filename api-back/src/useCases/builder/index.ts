import { crudUseCase } from "../crudUseCaseCreator";
import { BuilderDtoQuery } from "../../types/builder/builder-types";
import signupBuilderUseCase from "./signupBuilder.useCase";
import signinBuilderUseCase from "./signinBuilder.useCase";
import getBuilderWithAuthUseCase from "./getBuilderWithAuth.useCase";
import getBuilderByScIdUseCase from "./getBuilderByScIdUseCase";

export default {
  ...crudUseCase<BuilderDtoQuery, BuilderDtoQuery>({
    repositoryName: "builderRepository",
    useCaseName: "builder",
  }),
  signupBuilderUseCase,
  signinBuilderUseCase,
  getBuilderWithAuthUseCase,
  getBuilderByScIdUseCase
};
