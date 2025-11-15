import repositories from '../../../../frameworks/repositories/inMemory';
import { notificationRepositoryTests } from '../../common/notification/notificationTest';

describe("Notification repository", () => {
    notificationRepositoryTests(repositories);
});