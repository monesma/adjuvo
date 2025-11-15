import useCases from "../../../useCases";
const {
    signupHederaAppUseCase,
    getHederaAppByScIdUseCase
}= useCases;

import repositories from "../../../frameworks/repositories/inMemory";
const {
  hederaAppRepository,
} = repositories;
import HederaApp from "../../../entities/hederaApp/HederaApp";

describe("Signup with token", () => {
  const dependencies = {
    repositories: {
      hederaAppRepository,
    },
  };


  const signupApp = signupHederaAppUseCase(dependencies).execute;
  const getAppByScId = getHederaAppByScIdUseCase(dependencies).execute;

  test("Should get data with smart contract id", async () => {
    process.env.SECRET_TOKEN_CUSTOMER = "mytokentest";
  
    const completehederaApp = new HederaApp({
      app_name: "Hbidon",
      app_twitter: "https://x.com/hbidon",
      email: "hbidon2@gmail.com",
      wallet_id: "wallet-fr-001",
      smartcontract_id: "fdfgf8473cfd34",
      level: "Beginner",
      score: 0,
      missionsCompleted: 0,
      avatar: null,
    topic_id: null
    });
    const addedApp = await signupApp(completehederaApp);
    const { app } = addedApp.content;

     expect(addedApp.status).toBe(200);

     const appDataToken = await getAppByScId(app.smartcontract_id);

    expect(appDataToken.content.app).toBeDefined();
    expect(appDataToken.content.app.email).toBe("hbidon2@gmail.com");

  });


});
