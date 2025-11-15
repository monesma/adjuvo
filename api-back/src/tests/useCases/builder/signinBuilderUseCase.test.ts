import useCases from "../../../useCases";
const {signinBuilderUseCase, signupBuilderUseCase} = useCases;
import { BuilderDtoQuery, BuilderSigninQuery } from "../../../types/builder/builder-types";
import repositories from "../../../frameworks/repositories/inMemory";
const { builderRepository } = repositories;
import Builder from "../../../entities/builder/Builder";


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


describe("Signup Google tests", () => {
  const dependencies = {
    repositories: { builderRepository },
  };

  const signinBuilder = signinBuilderUseCase(dependencies).execute;
  const signupBuilder = signupBuilderUseCase(dependencies).execute;

  it("Should have minimum signin query", async () => {
    const testCompleteDataIncomplete = {};
    //@ts-ignore
    const addedBuilder = await signinBuilder(testCompleteDataIncomplete);
    expect(addedBuilder).toEqual({
      status: 500,
      error: {
        error: "It miss some information to login a builder",
        msg: "Your wallet need to be connected",
      },
      content: null,
    });
  });

  it("signin with wallet_id if wallet_id is wrong", async () => {
    process.env.SECRET_TOKEN_COMPANY = "mytokentest";

    const builderComplete1 = {
        ...builderComplete
    }

    const addedBuilder1 = await signupBuilder(builderComplete1);

    const testSigninBuilder: BuilderSigninQuery = {
      wallet_id: "444-444"
    };

    const signinUserTest = await signinBuilder(testSigninBuilder);

    expect(signinUserTest).toEqual({
      status: 500,
        error: {
          error: "Wallet account is wrong",
          msg: "You need to use an existing builder account",
        },
        content: null,
    });
  });

  it("signin with email if wallet_id is good", async () => {
    process.env.SECRET_TOKEN_COMPANY = "mytokentest";
    const builderComplete2 = {
        ...builderComplete,
        wallet_id: "444-444"
    }

    const addedBuilder2 = await signupBuilder(builderComplete2);

    const testSigninUser: BuilderSigninQuery = {
      wallet_id: "444-444"
    };

    const signinBuilderTest = await signinBuilder(testSigninUser);
    const { builder, token } = signinBuilderTest?.content;

    expect(token).toBeDefined();
    expect(builder.smartcontract_id).toBe(builderComplete2.smartcontract_id);
  });
});
