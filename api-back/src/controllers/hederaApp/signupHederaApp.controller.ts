import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";
import { Request, Response, NextFunction } from "express";
import generateSmartContractId from "../../services/utils/generateSmHederaAppId";

export default function (dependencies: any) {
  const { useCases } = dependencies;
  const { signupHederaAppUseCase } = useCases;

  const signupHederaAppController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        app_name, 
        app_twitter, 
        email,
        wallet_id
      } = req.body;
      const smartContractId = generateSmartContractId({ app_name, app_twitter, email });
      const signupApp = await signupHederaAppUseCase(dependencies).execute;
      const response = await signupApp({
        app_name, 
        app_twitter, 
        email,
        wallet_id,
        smartcontract_id: smartContractId
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

  return { signupHederaAppController };
}
