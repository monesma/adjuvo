import Builder from "../../entities/builder/Builder";
import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";
import { BuilderDtoQuery } from "../../types/builder/builder-types";
import { createTokenBuilder } from "../../services/utils/token";

export default (dependencies: any) => {
  const {
    repositories: { builderRepository },
  } = dependencies;

  if (!builderRepository) {
    throw new Error("the builder repository should be exist in dependencies");
  }

  const execute = async (
    builderData: BuilderDtoQuery
  ): Promise<ResponseRequest> => {
    if (
      "firstname" in builderData === false ||
      "lastname" in builderData === false ||
      "nickname" in builderData === false ||
      "wallet_id" in builderData === false
    ) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: "It miss some information to create a builder account",
          msg: "You need to have this minimum information: firstname, lastname, nickname, wallet id",
        }),
        content: null,
      });
    }

    const existBuilderWalletId = await builderRepository.getByWalletId(
      builderData.wallet_id
    );

    if (existBuilderWalletId) {
      return new ResponseRequest({
        status: 401,
        error: new ResponseError({
          error: "Builer already exist",
          msg: "You can't use a wallet already use in a builder",
        }),
        content: null,
      });
    }

    const now = new Date().getTime();

    const {
      firstname,
      lastname,
      nickname,
      wallet_id,
      smartcontract_id,
    } = builderData;

    const newBuilder = new Builder({
      firstname,
      lastname,
      nickname,
      wallet_id,
      smartcontract_id,
      level: 'Beginner',
      score: 0,
      missionsCompleted: 0,
      created_at: now,
      last_login: now,
    });

    const builderResponseDB = await builderRepository.add(newBuilder);
    
    if (!builderResponseDB) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: "Problem to save builder",
          msg: "a problem occured during creation of builder",
        }),
        content: null,
      });
    } else {
      const validationToken = await createTokenBuilder(
        builderResponseDB._id,
        "3d"
      );

      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
          builder: builderResponseDB,
          validationToken,
        },
      });
    }
  };

  return { execute };
};
