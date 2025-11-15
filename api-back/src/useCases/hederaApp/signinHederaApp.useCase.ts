import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";
import { HederaAppSigninQuery } from "../../types/hederaApp/hederaApp-types";
import { createTokenHederaApp } from "../../services/utils/token";

export default (dependencies: any) => {
  const {
    repositories: { hederaAppRepository },
  } = dependencies;

  if (!hederaAppRepository) {
    throw new Error("the hedera app repository should be exist in dependencies");
  }

  const execute = async (
    hederaAppData: HederaAppSigninQuery
  ): Promise<ResponseRequest> => {
    try {

    if ("wallet_id" in hederaAppData === false) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: "It miss some information to login your hedera app",
          msg: "Your wallet need to be connected",
        }),
        content: null,
      });
    }

    const existApp = await hederaAppRepository.getByWalletId(hederaAppData.wallet_id);
    if (!existApp ) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: "Wallet account is wrong",
          msg: "You need to use an existing hedera app account",
        }),
        content: null,
      });
    } else {
      let hederaAppWithoutWalletId: any = {};
      if (existApp._doc) {
        hederaAppWithoutWalletId = { ...existApp._doc };
      } else {
        hederaAppWithoutWalletId = { ...existApp };
      }
      delete hederaAppWithoutWalletId["wallet_id"];
    
      const token = await createTokenHederaApp(existApp._id);
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
          app: hederaAppWithoutWalletId,
          token,
        },
      });
    }
    } catch(err) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: "internal error",
          msg: "a problem occured",
        }),
        content: null,
      });
    }
  };

  return { execute };
};
