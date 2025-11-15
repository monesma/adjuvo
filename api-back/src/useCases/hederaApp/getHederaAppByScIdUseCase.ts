import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";

export default (dependencies: any) => {
    const {
      repositories: {
        hederaAppRepository
      },
    } = dependencies;
    
    const execute = async (smartcontract_id: string): Promise<ResponseRequest> => {
        const app = await hederaAppRepository.getByScId(smartcontract_id);

        if (!app) {
            return new ResponseRequest({
              status: 404,
              error: new ResponseError({
                error: "App undefined",
                msg: "App doesn't exist",
              }),
              content: null,
            });
        } else {
          let hederaAppByScId: any = {};
          if (app._doc) {
            hederaAppByScId = { ...app._doc };
          } else {
            hederaAppByScId = { ...app };
          }

            return new ResponseRequest({
                status: 200,
                content: {
                    app: hederaAppByScId,
                },
                error: null,
            });
        }
    }

    return { execute };
}