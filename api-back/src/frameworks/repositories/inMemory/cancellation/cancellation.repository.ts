import { CancellationDtoQuery, CancellationQuery } from "../../../../types/cancellation/cancellation-types";
import inMemoryDb from "../../../database/inMemory";
import { crudInMemoryCreator } from "../crudInMemoryCreator";

export default {
  ...crudInMemoryCreator<CancellationDtoQuery,CancellationQuery>({
    collectionName: "cancellation",
    inMemoryDb,
  }),
};
