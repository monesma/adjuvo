import useCase from "../../../useCases/notification/getNotificationForBuilder.useCase";
import ResponseError from "../../../frameworks/common/ResponseError";

describe("useCase", () => {
  let notificationRepositoryMock: any;
  let execute: any;

  beforeEach(() => {
    notificationRepositoryMock = {
      getNotificationByBuilderScId: jest.fn(),
    };

    execute = useCase({
      repositories: { notificationRepository: notificationRepositoryMock },
    }).execute;
  });

  it("should return an error if builderScId is empty", async () => {
    const result = await execute("");

    expect(result.status).toBe(500);
    expect(result.error).toBeInstanceOf(ResponseError);
    expect(result.error.error).toBe(
      "It miss some information to get the notification"
    );
    expect(result.error.msg).toBe(
      "You need to have this minimum information: builderId"
    );
    expect(result.content).toBeNull();
  });

  it("should return an error if the repository throws an error", async () => {
    notificationRepositoryMock.getNotificationByBuilderScId.mockRejectedValue(
      new Error("Database error")
    );

    const result = await execute("validBuilderScId");

    expect(result.status).toBe(500);
    expect(result.error).toBeInstanceOf(ResponseError);
    expect(result.error.error).toBeInstanceOf(Error);
    expect(result.error.msg).toBe("Could not get notification infos!");
    expect(result.content).toBeNull();
  });

  it("should return the notification if the repository succeeds", async () => {
    const mockResponse = { id: "sc1", name: "Notification" };
    notificationRepositoryMock.getNotificationByBuilderScId.mockResolvedValue(
      mockResponse
    );

    const result = await execute("validBuilderScId");
      
    expect(result.status).toBe(200);
    expect(result.error).toBeNull();
    expect(result.content.notification).toEqual(mockResponse);
  });
});
