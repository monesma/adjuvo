import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";
import { Request, Response, NextFunction } from "express";
import generateSmartContractId from "../../services/utils/generateSmBuilderId";

export default function (dependencies: any) {
  const { useCases } = dependencies;
  const { signupBuilderUseCase } = useCases;

  const signupBuilderController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        firstname, 
        lastname, 
        nickname,
        wallet_id
      } = req.body;
      const smartContractId = generateSmartContractId({ firstname, lastname, nickname });
      const signupBuilder = await signupBuilderUseCase(dependencies).execute;
      const response = await signupBuilder({
        firstname, 
        lastname, 
        nickname,
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

  return { signupBuilderController };
}
