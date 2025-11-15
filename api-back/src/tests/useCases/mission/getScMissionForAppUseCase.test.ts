import useCase from "../../../useCases/mission/getScMissionForApp.useCase";
import ResponseError from "../../../frameworks/common/ResponseError";

describe("useCase", () => {
  let missionRepositoryMock: any;
  let execute: any;

  beforeEach(() => {
    missionRepositoryMock = {
      getScMissionByAppScId: jest.fn(),
    };

    execute = useCase({
      repositories: { missionRepository: missionRepositoryMock },
    }).execute;
  });

  it("should return an error if appScId is empty", async () => {
    const result = await execute("");

    expect(result.status).toBe(500);
    expect(result.error).toBeInstanceOf(ResponseError);
    expect(result.error.error).toBe(
      "It miss some information to get the mission"
    );
    expect(result.error.msg).toBe(
      "You need to have this minimum information: appId"
    );
    expect(result.content).toBeNull();
  });

  it("should return an error if the repository throws an error", async () => {
    missionRepositoryMock.getScMissionByAppScId.mockRejectedValue(
      new Error("Database error")
    );

    const result = await execute("validAppScId");

    expect(result.status).toBe(500);
    expect(result.error).toBeInstanceOf(ResponseError);
    expect(result.error.error).toBeInstanceOf(Error);
    expect(result.error.msg).toBe("Could not get mission infos!");
    expect(result.content).toBeNull();
  });

  it("should return the mission if the repository succeeds", async () => {
    const mockResponse = { id: "sc1", name: "Mission" };
    missionRepositoryMock.getScMissionByAppScId.mockResolvedValue(mockResponse);
  
    const result = await execute("validAppScId");
    expect(result.status).toBe(200);
    expect(result.error).toBeNull();
    expect(result.content.mission).toEqual(mockResponse);
  });
  
});
