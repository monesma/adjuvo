import { Request, Response } from "express";

export default function (dependencies: any) {
  const { useCases } = dependencies;
  const { getHederaAppWithAuthUseCase } = useCases;

  const getHederaAppWithAuthController = async (req: Request, res: Response) => {
    //@ts-ignore
    const { id } = req;
    const getHederaAppWithAuth = getHederaAppWithAuthUseCase(dependencies).execute;
    const response = await getHederaAppWithAuth(id);

    res.json(response);
  };

  return { getHederaAppWithAuthController };
}
