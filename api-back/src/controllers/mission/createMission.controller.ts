import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";
import { Request, Response, NextFunction } from "express";

export default function (dependencies: any) {
  const { useCases } = dependencies;
  const { createMissionUseCase } = useCases;

  const createMissionController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        app_id,
        title,
        description,
        reward,
        currency
      } = req.body;

      const createMission = await createMissionUseCase(dependencies).execute;
      const response = await createMission({
        app_id,
        title,
        description,
        reward,
        currency
      });

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

  return { createMissionController };
}
