import { crudMongoCreator } from "../crudMongoCreator";
import { SubmissionDtoQuery, SubmissionQuery } from "../../../../types/submission/submission-types";
import SubmissionModel from "../../../database/mongo/schemas/submission.schema";
import { submissionTypeFormatter } from "../../../common/adapter/submission/SubissionAdapter";

export default {
  ...crudMongoCreator<SubmissionDtoQuery, SubmissionQuery>({
    entityModel: SubmissionModel,
    entityTypeFormatter: submissionTypeFormatter,
  }),
  getScSubmissionByBuilderScId: async (
    builder_id: string
  ): Promise<SubmissionQuery[] | null> => {
    const response: any = await SubmissionModel.find({
      builder_id: builder_id,
    });
    try {
      if (response.length !== 0) {
        return response.map((submission: SubmissionDtoQuery) =>
          submissionTypeFormatter(submission)
        );
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
  getScSubmissionByAppScId: async (
    app_id: string
  ): Promise<SubmissionQuery[] | null> => {
    const response: any = await SubmissionModel.find({
      app_id: app_id,
    });
    try {
      if (response.length !== 0) {
        return response.map((submission: SubmissionDtoQuery) =>
          submissionTypeFormatter(submission)
        );
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
};
