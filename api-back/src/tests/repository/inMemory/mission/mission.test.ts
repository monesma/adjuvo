import repositories from '../../../../frameworks/repositories/inMemory';
import { missionRepositoryTests } from '../../common/mission/missionTests';

describe("Mission repository", () => {
    missionRepositoryTests(repositories);
});