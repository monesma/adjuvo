import useCases from "../../../useCases";
const { signupHederaAppUseCase } = useCases;
import Chance from "chance";
const chance = new Chance();
import repositories from "../../../frameworks/repositories/inMemory";
const { builderRepository } = repositories;
import bcrypt from "bcrypt";
import ResponseError from "../../../frameworks/common/ResponseError";
import hederaAppRepository from "../../../frameworks/repositories/inMemory/hederaApp/hederaApp.repository";
import HederaApp from "../../../entities/hederaApp/HederaApp";

const badApp = {
    app_name: "Paul",
    app_twitter: "Dupont",
    email:  "M"
}

const completehederaApp = new HederaApp({
  app_name: "Hbidon",
  app_twitter: "https://x.com/hbidon",
  email: "hbidouille3@gmail.com",
  wallet_id: "wallet-fr-001",
  smartcontract_id: "fdfgf8473cfd34",
  level: "Beginner",
  score: 0,
  missionsCompleted: 0,
  avatar: null,
  topic_id: null
});

describe("Signup Email tests", () => {
  const dependencies = {
    repositories: { hederaAppRepository },
  };

  const signupApp = signupHederaAppUseCase(dependencies).execute;

  it("Should have minimum signup query", async () => {

    //@ts-ignore
    const addedApp = await signupApp(badApp);
    expect(addedApp).toEqual({
        status: 500,
        error: new ResponseError({
          error: "It miss some information to create a hedera app account",
          msg: "You need to have this minimum information: name, twitter url, email, wallet id",
        }),
        content: null,
      });
  });

  it("New user and user wallet_id connexion should be added and return after signup", async () => {
    process.env.SECRET_TOKEN_COMPANY = "mytokentest";

  const addedApp = await signupApp(completehederaApp);
    const { app } = addedApp.content;

    expect(app).toBeDefined();
    expect(app.wallet_id).toBe(completehederaApp.wallet_id);

  });

  it("Wallet_id can't have double", async () => {
    const appComplete2 = {
        ...completehederaApp,
        email: "baby@gmail.com",
        wallet_id: "555-555"
    }
    const addedApp2 = await signupApp(appComplete2);

    const appComplete3 = {
        ...completehederaApp,
        email: "baby2@gmail.com",
        wallet_id: "555-555"
    }
    const addedApp3 = await signupApp(appComplete3);

    expect(addedApp3).toEqual({
      status: 401,
      error: new ResponseError({
        error: "App already exist",
        msg: "You can't use a wallet already use in an other app",
      }),
      content: null,
    });
  });

  it("Email can't have double", async () => {
    const appComplete4 = {
        ...completehederaApp,
        wallet_id: "walletNet",
        email: 'ant@gmail.com'
    }
    await signupApp(appComplete4);

    const appComplete5 = {
        ...completehederaApp,
        wallet_id: "walletNet3",
        email: 'ant@gmail.com'
    }
    const addedApp5 = await signupApp(appComplete5);

    expect(addedApp5).toEqual({
      status: 401,
      error: {
        error: "Email already exist",
        msg: "You can't use an email already use in an other app",
      },
      content: null,
    });
  });

});

