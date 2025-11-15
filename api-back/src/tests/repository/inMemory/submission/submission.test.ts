import repositories from '../../../../frameworks/repositories/inMemory';
import { submissionRepositoryTests } from '../../common/submission/submissionTests';

describe("Submission repository", () => {
    submissionRepositoryTests(repositories);
});