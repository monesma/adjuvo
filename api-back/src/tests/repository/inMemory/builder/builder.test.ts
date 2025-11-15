import repositories from '../../../../frameworks/repositories/inMemory';
import { builderRepositoryTests } from '../../common/builder/builderTests';

describe("Builder repository", () => {
    builderRepositoryTests(repositories);
});