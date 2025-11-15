import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";

export default (dependencies: any) => {
  const {
    repositories: { submissionRepository },
  } = dependencies;

  if (!submissionRepository) {
    throw new Error(
      "the submission repository should be exist in dependencies"
    );
  }
  
  const execute = async (appScId: string): Promise<ResponseRequest> => {
    if (appScId === "") {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: "It miss some information to get the submission",
          msg: "You need to have this minimum information: appId",
        }),
        content: null,
      });
    }
    try {
      const response = await submissionRepository.getScSubmissionByAppScId(appScId);
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
          submission: response,
        },
      });
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : "An unknown error occurred";

      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: err,
          msg: `Could not get submission infos!`,
        }),
        content: null,
      });
    }
  };

  return { execute };
};
