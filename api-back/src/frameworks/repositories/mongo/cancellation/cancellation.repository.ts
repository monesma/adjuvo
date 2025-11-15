import { crudMongoCreator } from "../crudMongoCreator";
import { CancellationDtoQuery, CancellationQuery } from "../../../../types/cancellation/cancellation-types";
import { cancellationTypeFormatter } from "../../../common/adapter/cancellation/CancellationAdapter";
import CancellationModel from "../../../database/mongo/schemas/cancellation.schema";


export default {
  ...crudMongoCreator<CancellationDtoQuery, CancellationQuery>({
    entityModel: CancellationModel,
    entityTypeFormatter: cancellationTypeFormatter,
  })
};
