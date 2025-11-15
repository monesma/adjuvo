import { crudMongoCreator } from "../crudMongoCreator";
import { HederaAppDtoQuery, HederaAppQuery } from "../../../../types/hederaApp/hederaApp-types";
import HederaAppModel from "../../../database/mongo/schemas/hederaApp.schema";
import { hederaAppTypeFormatter } from "../../../common/adapter/hederaApp/hederaAppAdapter";

export default {
    ...crudMongoCreator<HederaAppDtoQuery, HederaAppQuery>({
        entityModel: HederaAppModel,
        entityTypeFormatter: hederaAppTypeFormatter,
    }),
    getByEmail: async (
        email: string,
      ): Promise<HederaAppQuery | null> => {
        try {
          const response: any = await HederaAppModel.findOne({ email: email });
          if (response._id) {
            return hederaAppTypeFormatter(response);
          } else {
            return null;
          }
        } catch (e) {
          return null;
        }
    },
    getByWalletId: async (
      wallet_id: string,
    ): Promise<HederaAppQuery | null> => {
      try {
        const response: any = await HederaAppModel.findOne({ wallet_id: wallet_id });
        if (response._id) {
          return hederaAppTypeFormatter(response);
        } else {
          return null;
        }
      } catch (e) {
        return null;
      }
  },
  getByScId: async (
    smartcontract_id: string
  ): Promise<HederaAppQuery | null>  => {
    try {
        const response: any = await HederaAppModel.findOne({ smartcontract_id: smartcontract_id });
        if (response._id) {
          return hederaAppTypeFormatter(response);
        } else {
          return null;
        }
      } catch (e) {
        return null;
      }
  }
};

