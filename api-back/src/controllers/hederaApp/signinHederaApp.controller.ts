import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";
import { Request, Response, NextFunction } from "express";

export default function (dependencies: any) {
  const { useCases } = dependencies;
  const { signinHederaAppUseCase } = useCases;

  const signinHederaAppController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { wallet_id } = req.body;

      const signinApp = await signinHederaAppUseCase(dependencies).execute;
      const response = await signinApp({
        wallet_id
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

  return { signinHederaAppController };
}
