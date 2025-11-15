import inMemoryDb from "../../../database/inMemory";
import { crudInMemoryCreator } from "../crudInMemoryCreator";
import { SubmissionDtoQuery, SubmissionQuery } from "../../../../types/submission/submission-types";

export default {
  ...crudInMemoryCreator<SubmissionDtoQuery, SubmissionQuery>({
    collectionName: "submission",
    inMemoryDb,
  }),
  getScSubmissionByBuilderScId: async (
    id: string
  ): Promise<SubmissionQuery | null> => {
    const entity = inMemoryDb["submission"].find(
      (u: SubmissionQuery) => {
        if (u.builder_id) {
          return u.builder_id === id;
        }
      }
    );
    return entity ? entity : null;
  },
  getScSubmissionByAppScId: async (
    id: string
  ): Promise<SubmissionQuery | null> => {
    const entity = inMemoryDb["submission"].find(
      (u: SubmissionQuery) => {
        if (u.app_id) {
          return u.app_id === id;
        }
      }
    );
    return entity ? entity : null;
  },
};
