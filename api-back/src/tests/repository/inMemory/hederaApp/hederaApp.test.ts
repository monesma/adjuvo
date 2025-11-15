import repositories from '../../../../frameworks/repositories/inMemory';
import { hederaAppRepositoryTests } from '../../common/hederaApp/hederaAppTests';

describe("Hedera app repository", () => {
    hederaAppRepositoryTests(repositories);
});