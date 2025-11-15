import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";
import { Request, Response, NextFunction } from "express";

export default function (dependencies: any) {
  const { useCases } = dependencies;
  const { getScMissionForAppUseCase } = useCases;

  const getScMissionForAppController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const readContracts = await getScMissionForAppUseCase(dependencies).execute;
      const response = await readContracts(req.params.id);
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

  return { getScMissionForAppController };
}
