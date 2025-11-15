import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";
import { Request, Response, NextFunction } from "express";

export default function (dependencies: any) {
  const { useCases } = dependencies;
  const { signinBuilderUseCase } = useCases;

  const signinBuilderController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { wallet_id } = req.body;

      const signinCompany = await signinBuilderUseCase(dependencies).execute;
      const response = await signinCompany({
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

  return { signinBuilderController };
}
