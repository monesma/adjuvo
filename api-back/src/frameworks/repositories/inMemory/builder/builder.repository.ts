import { BuilderQuery, BuilderDtoQuery } from "../../../../types/builder/builder-types";
import inMemoryDb from "../../../database/inMemory";
import { crudInMemoryCreator } from "../crudInMemoryCreator";

export default {
    ...crudInMemoryCreator<BuilderDtoQuery, BuilderQuery>({
        collectionName: "builder",
        inMemoryDb,
    }),
    getByWalletId: async (wallet_id: string): Promise<BuilderQuery | null> => {
        const entity = inMemoryDb["builder"].find((u: BuilderQuery) => {
          if (u.wallet_id) {
            return u.wallet_id === wallet_id;
          }
        });
        return entity ? entity : null;
      },
      getByScId: async (smartcontract_id: string): Promise<BuilderQuery | null> => {
      const entity = inMemoryDb["builder"].find((u: BuilderQuery) => {
        if (u.smartcontract_id) {
          return u.smartcontract_id === smartcontract_id;
        }
      });
      return entity ? entity : null;
    }
};
