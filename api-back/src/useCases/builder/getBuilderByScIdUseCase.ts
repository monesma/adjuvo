import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";

export default (dependencies: any) => {
    const {
      repositories: {
        builderRepository
      },
    } = dependencies;
    
    const execute = async (smartcontract_id: string): Promise<ResponseRequest> => {
        const app = await builderRepository.getByScId(smartcontract_id);

        if (!app) {
            return new ResponseRequest({
              status: 404,
              error: new ResponseError({
                error: "Builder undefined",
                msg: "Builder doesn't exist",
              }),
              content: null,
            });
        } else {
          let builderByScId: any = {};
          if (app._doc) {
            builderByScId = { ...app._doc };
          } else {
            builderByScId = { ...app };
          }

            return new ResponseRequest({
                status: 200,
                content: {
                    builder: builderByScId,
                },
                error: null,
            });
        }
    }

    return { execute };
}