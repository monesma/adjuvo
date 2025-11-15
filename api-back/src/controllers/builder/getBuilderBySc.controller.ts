import { Request, Response } from "express";

export default function (dependencies: any) {
  const { useCases } = dependencies;
  const { getBuilderByScIdUseCase } = useCases;

  const getBuilderByScIdController = async (req: Request, res: Response) => {
    //@ts-ignore
    const { smartcontract_id } = req.params;
    const getByScId = getBuilderByScIdUseCase(dependencies).execute;
    const response = await getByScId(smartcontract_id);

    res.json(response);
  };

  return { getBuilderByScIdController };
}
