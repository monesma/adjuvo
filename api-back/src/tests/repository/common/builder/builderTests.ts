import { BuilderDtoQuery, BuilderQuery } from "../../../../types/builder/builder-types";
import { crudTestCreator } from "../crudTestCreator";
import Builder from "../../../../entities/builder/Builder";

export const builderRepositoryTests = (repositories: any) => {
    const { builderRepository } = repositories;

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
    
    crudTestCreator<BuilderDtoQuery, BuilderQuery>(
        builderRepository,
        builder1,
        builder2,
        "builder"
    );

    it(`builder should get by wallet_id`, async ()=>{
        const addedBuilder = await builderRepository.add(builder1);
        expect(addedBuilder).toBeDefined();

        const company = await builderRepository.getByWalletId(builder1.wallet_id);
        expect(company.wallet_id).toBe(builder1.wallet_id);

        if (addedBuilder._id) {
            await builderRepository.delete(addedBuilder._id);
        }
    })

    it(`builder should get by smartcontract_id`, async ()=>{
        const addedBuilder = await builderRepository.add(builder1);
        expect(addedBuilder).toBeDefined();

        const builder = await builderRepository.getByScId(builder1.smartcontract_id);
        expect(builder.smartcontract_id).toBe(builder1.smartcontract_id);

        if (addedBuilder._id) {
            await builderRepository.delete(addedBuilder._id);
        }
    })
}