import { HederaAppDtoQuery, HederaAppQuery } from "../../../../types/hederaApp/hederaApp-types";
import inMemoryDb from "../../../database/inMemory";
import { crudInMemoryCreator } from "../crudInMemoryCreator";

export default {
    ...crudInMemoryCreator<HederaAppDtoQuery, HederaAppQuery>({
        collectionName: "hederaApp",
        inMemoryDb,
    }),
    getByWalletId: async (wallet_id: string): Promise<HederaAppQuery | null> => {
      const entity = inMemoryDb["hederaApp"].find((u: HederaAppQuery) => {
        if (u.wallet_id) {
          return u.wallet_id === wallet_id;
        }
      });
      return entity ? entity : null;
    },
    getByEmail: async (email: string): Promise<HederaAppQuery | null> => {
        const entity = inMemoryDb["hederaApp"].find((u: HederaAppQuery) => {
          if (u.email) {
            return u.email === email;
          }
        });
        return entity ? entity : null;
      },
    getByScId: async (smartcontract_id: string): Promise<HederaAppQuery | null> => {
      const entity = inMemoryDb["hederaApp"].find((u: HederaAppQuery) => {
        if (u.smartcontract_id) {
          return u.smartcontract_id === smartcontract_id;
        }
      });
      return entity ? entity : null;
    }
};
