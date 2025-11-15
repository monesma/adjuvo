import useCase from "../../../useCases/notification/getNotificationForApp.useCase";
import ResponseError from "../../../frameworks/common/ResponseError";

describe("useCase", () => {
  let notificationRepositoryMock: any;
  let execute: any;

  beforeEach(() => {
    notificationRepositoryMock = {
      getNotificationByAppScId: jest.fn(),
    };

    execute = useCase({
      repositories: { notificationRepository: notificationRepositoryMock },
    }).execute;
  });

  it("should return an error if appScId is empty", async () => {
    const result = await execute("");

    expect(result.status).toBe(500);
    expect(result.error).toBeInstanceOf(ResponseError);
    expect(result.error.error).toBe(
      "It miss some information to get the notification"
    );
    expect(result.error.msg).toBe(
      "You need to have this minimum information: appId"
    );
    expect(result.content).toBeNull();
  });

  it("should return an error if the repository throws an error", async () => {
    notificationRepositoryMock.getNotificationByAppScId.mockRejectedValue(
      new Error("Database error")
    );

    const result = await execute("validAppScId");

    expect(result.status).toBe(500);
    expect(result.error).toBeInstanceOf(ResponseError);
    expect(result.error.error).toBeInstanceOf(Error);
    expect(result.error.msg).toBe("Could not get notification infos!");
    expect(result.content).toBeNull();
  });

  it("should return the notification if the repository succeeds", async () => {
    const mockResponse = { id: "sc1", name: "Notification" };
    notificationRepositoryMock.getNotificationByAppScId.mockResolvedValue(mockResponse);
  
    const result = await execute("validAppScId");
    expect(result.status).toBe(200);
    expect(result.error).toBeNull();
    expect(result.content.notification).toEqual(mockResponse);
  });
  
});
