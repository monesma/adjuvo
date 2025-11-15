import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";
import { Request, Response, NextFunction } from "express";

export default function (dependencies: any) {
  const { useCases } = dependencies;
  const { getScSubmissionForBuilderUseCase } = useCases;

  const getScSubmissionForBuilderController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const readMissions = await getScSubmissionForBuilderUseCase(dependencies).execute;
      const response = await readMissions(req.params.id);
      res.json(response);
    } catch (err) {
      res.json(
        new ResponseRequest({
          status: 500,
          content: null,
          error: new ResponseError({
            error: err,
            msg: "Request error",
          }),
        }),
      );
    }
  };

  return { getScSubmissionForBuilderController };
}
