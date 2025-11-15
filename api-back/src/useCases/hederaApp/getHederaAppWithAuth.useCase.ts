import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";

export default (dependencies: any) => {
    const {
      repositories: {
        hederaAppRepository
      },
    } = dependencies;
    
    const execute = async (id: string): Promise<ResponseRequest> => {
        const app = await hederaAppRepository.getById(id);

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
          let hederaAppWithoutWalletId: any = {};
          if (app._doc) {
            hederaAppWithoutWalletId = { ...app._doc };
          } else {
            hederaAppWithoutWalletId = { ...app };
          }

            return new ResponseRequest({
                status: 200,
                content: {
                    app: hederaAppWithoutWalletId,
                },
                error: null,
            });
        }
    }

    return { execute };
}