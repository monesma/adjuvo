import useCases from "../../../useCases";
const { signinHederaAppUseCase, signupHederaAppUseCase } = useCases;

import { HederaAppSigninQuery } from "../../../types/hederaApp/hederaApp-types";

import repositories from "../../../frameworks/repositories/inMemory";
const { hederaAppRepository } = repositories;

import HederaApp from "../../../entities/hederaApp/HederaApp";

const completehederaApp = new HederaApp({
  app_name: "Hbidon",
  app_twitter: "https://x.com/hbidon",
  email: "hbidon@gmail.com",
  wallet_id: "wallet-fr-001",
  smartcontract_id: "fdfgf8473cfd34",
  level: "Beginner",
  score: 0,
  missionsCompleted: 0,
  avatar: null,
  topic_id: null
});

describe("Signup Google tests", () => {
  const dependencies = {
    repositories: { hederaAppRepository },
  };

  const signinApp = signinHederaAppUseCase(dependencies).execute;
  const signupApp = signupHederaAppUseCase(dependencies).execute;

  it("Should have minimum signin query", async () => {
    const testCompleteDataIncomplete = {
      email: "thibaut.monesma@gmail.com",
    };

    //@ts-ignore
    const addedApp = await signinApp(testCompleteDataIncomplete);
    expect(addedApp).toEqual({
      status: 500,
      error: {
        error: "It miss some information to login your hedera app",
        msg: "Your wallet need to be connected",
      },
      content: null,
    });
  });

  it("signin with wallet_id if wallet_id is wrong", async () => {
    process.env.SECRET_TOKEN_COMPANY = "mytokentest";

    const appComplete1 = {
        ...completehederaApp
    }

    const addedBuilder1 = await signupApp(appComplete1);

    const testSigninApp: HederaAppSigninQuery = {
      wallet_id: "444-444"
    };

    const signinUserTest = await signinApp(testSigninApp);

    expect(signinUserTest).toEqual({
      status: 500,
        error: {
          error: "Wallet account is wrong",
          msg: "You need to use an existing hedera app account",
        },
        content: null,
    });
  });
});
