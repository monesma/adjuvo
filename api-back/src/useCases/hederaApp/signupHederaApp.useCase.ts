import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";
import { HederaAppDtoQuery } from "../../types/hederaApp/hederaApp-types";
import { createTokenHederaApp } from "../../services/utils/token";
import HederaApp from "../../entities/hederaApp/HederaApp";

export default (dependencies: any) => {
  const {
    repositories: { hederaAppRepository },
  } = dependencies;

  if (!hederaAppRepository) {
    throw new Error("the hedera app repository should be exist in dependencies");
  }

  const execute = async (
    hederaAppData: HederaAppDtoQuery
  ): Promise<ResponseRequest> => {
    if (
      "app_name" in hederaAppData === false ||
      "app_twitter" in hederaAppData === false ||
      "email" in hederaAppData === false ||
      "wallet_id" in hederaAppData === false
    ) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: "It miss some information to create a hedera app account",
          msg: "You need to have this minimum information: name, twitter url, email, wallet id",
        }),
        content: null,
      });
    }

    const existHederaAppWalletId = await hederaAppRepository.getByWalletId(
      hederaAppData.wallet_id
    );
    if (existHederaAppWalletId) {
      return new ResponseRequest({
        status: 401,
        error: new ResponseError({
          error: "App already exist",
          msg: "You can't use a wallet already use in an other app",
        }),
        content: null,
      });
    }

    const existEmail = await hederaAppRepository.getByEmail(hederaAppData.email);
    if (existEmail !== null ) {
      return new ResponseRequest({
        status: 401,
        error: new ResponseError({
          error: "Email already exist",
          msg: "You can't use an email already use in an other app",
        }),
        content: null,
      });
    }

    const now = new Date().getTime();

    const {
      app_name,
      app_twitter,
      email,
      wallet_id,
      smartcontract_id,
    } = hederaAppData;

    const newApp = new HederaApp({
      app_name,
      app_twitter,
      email,
      wallet_id,
      smartcontract_id,
      level: "Beginner",
      score: 0,
      missionsCompleted: 0,
      avatar: null,
      topic_id: null,
      created_at: now,
      last_login: now
    });

    const appResponseDB = await hederaAppRepository.add(newApp);
    if (!appResponseDB) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: "Problem to save app",
          msg: "a problem occured during creation of app",
        }),
        content: null,
      });
    } else {
      const validationToken = await createTokenHederaApp(
        appResponseDB._id,
        "3d"
      );

      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
          app: appResponseDB,
          validationToken,
        },
      });
    }
  };

  return { execute };
};
