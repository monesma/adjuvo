import useCases from "../../../useCases";
const {
    signupBuilderUseCase,
    getBuilderByScIdUseCase
}= useCases;

import repositories from "../../../frameworks/repositories/inMemory";
const {
  builderRepository,
} = repositories;
import { BuilderDtoQuery } from "../../../types/builder/builder-types";
import Builder from "../../../entities/builder/Builder";


describe("Signup with token", () => {
  const dependencies = {
    repositories: {
        builderRepository,
    },
  };


  const signupBuilder = signupBuilderUseCase(dependencies).execute;
  const getBuilderByScId = getBuilderByScIdUseCase(dependencies).execute;

  test("Should get data with smart contract id", async () => {
    process.env.SECRET_TOKEN_COMPANY = "mytokentest";

    const builderComplete: BuilderDtoQuery = new Builder({
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

    const addedBuilder = await signupBuilder(builderComplete);

    const { builder } = addedBuilder.content;

    expect(addedBuilder.status).toBe(200);
   
    const builderDataToken = await getBuilderByScId(builder.smartcontract_id);

    expect(builderDataToken.content.builder).toBeDefined();
    expect(builderDataToken.content.builder.smartcontract_id).toBe("smartcontract-fr-789");
  });
});
