import { Request, Response  } from "express";

export default function (dependencies: any) {
  const { useCases } = dependencies;
  const { getAllCustomersByBuilderIdUseCase } = useCases;

  const getAllCustomersByBuilderIdController= async (req: Request, res: Response) => {
    //@ts-ignore
    const { id } = req;
    const getAllCustomersByBuilderId=
    getAllCustomersByBuilderIdUseCase(dependencies).execute;
    const response = await getAllCustomersByBuilderId(id);

    res.json(response);
  };

  return { getAllCustomersByBuilderIdController };
}

