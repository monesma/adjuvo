import useCase from "../../../useCases/submission/getScSubmissionForBuilder.useCase";
import ResponseError from "../../../frameworks/common/ResponseError";

describe("useCase", () => {
  let submissionRepositoryMock: any;
  let execute: any;

  beforeEach(() => {
    submissionRepositoryMock = {
      getScSubmissionByBuilderScId: jest.fn(),
    };

    execute = useCase({
      repositories: { submissionRepository: submissionRepositoryMock },
    }).execute;
  });

  it("should return an error if builderScId is empty", async () => {
    const result = await execute("");

    expect(result.status).toBe(500);
    expect(result.error).toBeInstanceOf(ResponseError);
    expect(result.error.error).toBe(
      "It miss some information to get the submission"
    );
    expect(result.error.msg).toBe(
      "You need to have this minimum information: builderId"
    );
    expect(result.content).toBeNull();
  });

  it("should return an error if the repository throws an error", async () => {
    submissionRepositoryMock.getScSubmissionByBuilderScId.mockRejectedValue(
      new Error("Database error")
    );

    const result = await execute("validBuilderScId");

    expect(result.status).toBe(500);
    expect(result.error).toBeInstanceOf(ResponseError);
    expect(result.error.error).toBeInstanceOf(Error);
    expect(result.error.msg).toBe("Could not get submission infos!");
    expect(result.content).toBeNull();
  });

  it("should return the submission if the repository succeeds", async () => {
    const mockResponse = { id: "sc1", name: "Submission" };
    submissionRepositoryMock.getScSubmissionByBuilderScId.mockResolvedValue(
      mockResponse
    );

    const result = await execute("validBuilderScId");
      
    expect(result.status).toBe(200);
    expect(result.error).toBeNull();
    expect(result.content.submission).toEqual(mockResponse);
  });
});
