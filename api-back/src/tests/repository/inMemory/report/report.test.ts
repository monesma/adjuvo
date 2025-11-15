import repositories from '../../../../frameworks/repositories/inMemory';
import { reportRepositoryTests } from '../../common/report/reportTest';

describe("Report repository", () => {
    reportRepositoryTests(repositories);
});