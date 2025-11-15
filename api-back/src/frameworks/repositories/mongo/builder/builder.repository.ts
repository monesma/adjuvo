import { crudMongoCreator } from "../crudMongoCreator";
import { BuilderDtoQuery, BuilderQuery } from "../../../../types/builder/builder-types";
import BuilderModel from "../../../database/mongo/schemas/builder.schema";
import { builderTypeFormatter } from "../../../common/adapter/builder/builderAdapter";

export default {
    ...crudMongoCreator<BuilderDtoQuery, BuilderQuery>({
        entityModel: BuilderModel,
        entityTypeFormatter: builderTypeFormatter,
    }),
    getByWalletId: async (
        wallet_id: string,
      ): Promise<BuilderQuery | null> => {
        try {
          const response: any = await BuilderModel.findOne({ wallet_id: wallet_id });
          if (response._id) {
            return builderTypeFormatter(response);
          } else {
            return null;
          }
        } catch (e) {
          return null;
        }
    },
    getByScId: async (
      smartcontract_id: string
    ): Promise<BuilderQuery | null>  => {
      try {
          const response: any = await BuilderModel.findOne({ smartcontract_id: smartcontract_id });
          if (response._id) {
            return builderTypeFormatter(response);
          } else {
            return null;
          }
        } catch (e) {
          return null;
        }
    }
};
