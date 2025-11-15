import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";

export default (dependencies: any) => {
  const {
    repositories: { notificationRepository },
  } = dependencies;

  if (!notificationRepository) {
    throw new Error(
      "the notification repository should be exist in dependencies"
    );
  }

  const execute = async (builderScId: string): Promise<ResponseRequest> => {
    if (builderScId === "") {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: "It miss some information to get the notification",
          msg: "You need to have this minimum information: builderId",
        }),
        content: null,
      });
    }
    try {
      const response = await notificationRepository.getNotificationsByBuilderScId(builderScId);
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
          notification: response,
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
          msg: `Could not get notification infos!`,
        }),
        content: null,
      });
    }
  };

  return { execute };
};
