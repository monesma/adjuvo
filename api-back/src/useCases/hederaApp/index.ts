import { crudUseCase } from "../crudUseCaseCreator";
import { HederaAppDtoQuery } from "../../types/hederaApp/hederaApp-types";
import signupHederaAppUseCase from "./signupHederaApp.useCase";
import signinHederaAppUseCase from "./signinHederaApp.useCase";
import getHederaAppWithAuthUseCase from "./getHederaAppWithAuth.useCase";
import getHederaAppByScIdUseCase from "./getHederaAppByScIdUseCase";

export default {
  ...crudUseCase<HederaAppDtoQuery, HederaAppDtoQuery>({
    repositoryName: "hederaAppRepository",
    useCaseName: "hederaApp",
  }),
  signupHederaAppUseCase,
  signinHederaAppUseCase,
  getHederaAppWithAuthUseCase,
  getHederaAppByScIdUseCase
};
