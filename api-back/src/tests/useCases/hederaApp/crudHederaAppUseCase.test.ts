import repositories from "../../../frameworks/repositories/inMemory";
import useCases from "../../../useCases";
import { crudUseCaseTests } from "../crudUseCaseTestCreator";
import HederaApp from "../../../entities/hederaApp/HederaApp";
import { HederaAppDtoQuery } from "../../../types/hederaApp/hederaApp-types";

describe("Hedera app crud test", () => {
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

  crudUseCaseTests<HederaAppDtoQuery>({
    repositories,
    useCases,
    newEntity1: hederaApp1,
    newEntity2: hederaApp2,
    useCaseName: "hederaApp",
  });
});
