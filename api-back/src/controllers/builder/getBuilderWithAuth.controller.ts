import { Request, Response } from "express";

export default function (dependencies: any) {
  const { useCases } = dependencies;
  const { getBuilderWithAuthUseCase } = useCases;

  const getBuilderWithAuthController = async (req: Request, res: Response) => {
    //@ts-ignore
    const { id } = req;
    const getBuilderWithAuth =
    getBuilderWithAuthUseCase(dependencies).execute;
    const response = await getBuilderWithAuth(id);

    res.json(response);
  };

  return { getBuilderWithAuthController };
}
