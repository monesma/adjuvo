import {
  HederaAppDtoQuery,
  HederaAppQuery,
} from "../../../../types/hederaApp/hederaApp-types";
import { crudTestCreator } from "../crudTestCreator";
import HederaApp from "../../../../entities/hederaApp/HederaApp";

export const hederaAppRepositoryTests = (repositories: any) => {
  const { hederaAppRepository } = repositories;

  const hederaApp1 = new HederaApp({
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

  const hederaApp2 = new HederaApp({
    app_name: "Hbidule",
    app_twitter: "https://x.com/Hbidule",
    email: "hbidule@gmail.com",
    wallet_id: "wallet-fr-002",
    smartcontract_id: "fdfgf84734ed34",
    level: "Beginner",
    score: 0,
    missionsCompleted: 0,
    avatar: null,
    topic_id: null
  });

  crudTestCreator<HederaAppDtoQuery, HederaAppQuery>(
    hederaAppRepository,
    hederaApp1,
    hederaApp2,
    "hederaApp"
  );

  it(`app should get by email`, async () => {
    const addedApp = await hederaAppRepository.add(hederaApp1);
    expect(addedApp).toBeDefined();

    const app = await hederaAppRepository.getByEmail(hederaApp1.email);
    expect(app.email).toBe(hederaApp1.email);

    if (addedApp._id) {
      await hederaAppRepository.delete(addedApp._id);
    }
  });
  it(`app should get by wallet_id`, async ()=>{
    const addedApp = await hederaAppRepository.add(hederaApp1);
    expect(addedApp).toBeDefined();

    const app = await hederaAppRepository.getByWalletId(hederaApp1.wallet_id);
    expect(app.wallet_id).toBe(hederaApp1.wallet_id);

    if (addedApp._id) {
        await hederaAppRepository.delete(addedApp._id);
    }
})

it(`app should get by smartcontract_id`, async ()=>{
        const addedApp = await hederaAppRepository.add(hederaApp1);
        expect(addedApp).toBeDefined();

        const app = await hederaAppRepository.getByScId(hederaApp1.smartcontract_id);
        expect(app.smartcontract_id).toBe(hederaApp1.smartcontract_id);

        if (addedApp._id) {
            await hederaAppRepository.delete(addedApp._id);
        }
    })
};
