import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";
import { BuilderSigninQuery } from "../../types/builder/builder-types";
import { createTokenBuilder } from "../../services/utils/token";

export default (dependencies: any) => {
  const {
    repositories: { builderRepository },
  } = dependencies;

  if (!builderRepository) {
    throw new Error("the builder repository should be exist in dependencies");
  }

  const execute = async (
    builderData: BuilderSigninQuery
  ): Promise<ResponseRequest> => {
    try {

    if ("wallet_id" in builderData === false) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: "It miss some information to login a builder",
          msg: "Your wallet need to be connected",
        }),
        content: null,
      });
    }

    const existBuilder = await builderRepository.getByWalletId(builderData.wallet_id);

    if (!existBuilder ) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: "Wallet account is wrong",
          msg: "You need to use an existing builder account",
        }),
        content: null,
      });
    } else {
      let builderWithoutWalletId: any = {};
      if (existBuilder._doc) {
        builderWithoutWalletId = { ...existBuilder._doc };
      } else {
        builderWithoutWalletId = { ...existBuilder };
      }
      delete builderWithoutWalletId["wallet_id"];
    
      const token = await createTokenBuilder(existBuilder._id);
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
          builder: builderWithoutWalletId,
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
