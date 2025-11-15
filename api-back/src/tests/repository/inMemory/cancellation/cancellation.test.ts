import repositories from '../../../../frameworks/repositories/inMemory';
import { cancellationRepositoryTests } from '../../common/cancellation/cancellationTest';

describe("Cancellation repository", () => {
    cancellationRepositoryTests(repositories);
});