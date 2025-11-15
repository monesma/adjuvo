import { crudUseCase } from "../crudUseCaseCreator";
import getScSubmissionForBuilderUseCase from "./getScSubmissionForBuilder.useCase";
import getScSubmissionForAppUseCase from "./getScSubmissionForApp.useCase";
import { SubmissionDtoQuery, SubmissionQuery } from "../../types/submission/submission-types";
export default {
  ...crudUseCase<SubmissionDtoQuery, SubmissionQuery>({
    repositoryName: "submissionRepository",
    useCaseName: "submission",
  }),
  getScSubmissionForBuilderUseCase,
  getScSubmissionForAppUseCase
};
