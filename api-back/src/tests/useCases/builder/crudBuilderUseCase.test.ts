import Builder from "../../../entities/builder/Builder";
import repositories from "../../../frameworks/repositories/inMemory";
import { BuilderDtoQuery } from "../../../types/builder/builder-types";
import useCases from "../../../useCases";
import { crudUseCaseTests } from "../crudUseCaseTestCreator";

describe("Builder crud test", () => {
    const builder1: BuilderDtoQuery = new Builder({
        firstname: "Bob",
        lastname: "Maurane",
        nickname: "Bobby",
        wallet_id: "wallet-fr-001",
        smartcontract_id: "smartcontract-fr-789",
        level: "Beginner",
        score: 0,
        missionsCompleted: 0,
        created_at: 1672531200, // Timestamp : 01/01/2023
        last_login: 1704067200, // Timestamp : 01/01/2024
    });

    const builder2: BuilderDtoQuery = new Builder({
        firstname: "Jean-claude",
        lastname: "Vandamme",
        nickname: "JCVD",
        wallet_id: null,
        smartcontract_id: null,
        level: "Beginner",
        score: 0,
        missionsCompleted: 0,
        created_at: 1667260800, // Timestamp : 01/11/2022
        last_login: 1705459200, // Timestamp : 15/01/2024
    });


  crudUseCaseTests<BuilderDtoQuery>({
    repositories,
    useCases,
    newEntity1: builder1,
    newEntity2: builder2,
    useCaseName: "builder",
  });
});
