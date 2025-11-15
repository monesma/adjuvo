import useCases from "../../../useCases";
const { signupBuilderUseCase } = useCases;
import Chance from "chance";
import { BuilderDtoQuery } from "../../../types/builder/builder-types";
const chance = new Chance();
import repositories from "../../../frameworks/repositories/inMemory";
const { builderRepository } = repositories;
import ResponseError from "../../../frameworks/common/ResponseError";
import Builder from "../../../entities/builder/Builder";

const badBuilder = {
  firstname: "Jean",
  lastname: "Valjean",
  wallet_id: "wallet-fr-503",
  smartcontract_id: "smartcontract-fr-479",
  created_at: 1672531200, // Timestamp : 01/01/2023
  last_login: 1704067200, // Timestamp : 01/01/2024
}

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

describe("Signup Builder tests", () => {
  const dependencies = {
    repositories: { builderRepository },
  };

  const signupBuilder = signupBuilderUseCase(dependencies).execute;

  it("Should have minimum signup query", async () => {

    //@ts-ignore
    const addedBuilder = await signupBuilder(badBuilder);
    expect(addedBuilder).toEqual({
        status: 500,
        error: new ResponseError({
          error: "It miss some information to create a builder account",
          msg: "You need to have this minimum information: firstname, lastname, nickname, wallet id",
        }),
        content: null,
      });
  });

  it("New user and user wallet_id connexion should be added and return after signup", async () => {
    process.env.SECRET_TOKEN_COMPANY = "mytokentest";

    const addedBuilder = await signupBuilder(builderComplete);
    const { builder } = addedBuilder.content;

    expect(builder).toBeDefined();
    expect(builder.wallet_id).toBe(builderComplete.wallet_id);

  });

  it("Wallet_id can't have double", async () => {
    const builderComplete2 = {
        ...builderComplete,
        wallet_id: "555-555"
    }
    const addedBuilder2 = await signupBuilder(builderComplete2);

    const builderComplete3 = {
        ...builderComplete,
        wallet_id: "555-555"
    }
    const addedBuilder3 = await signupBuilder(builderComplete3);

    expect(addedBuilder3).toEqual({
      status: 401,
      error: new ResponseError({
        error: "Builer already exist",
        msg: "You can't use a wallet already use in a builder",
      }),
      content: null,
    });
  });

});
