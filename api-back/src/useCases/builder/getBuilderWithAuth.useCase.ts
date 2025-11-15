import ResponseError from "../../frameworks/common/ResponseError";
import ResponseRequest from "../../frameworks/common/ResponseRequest";

export default (dependencies: any) => {
    const {
      repositories: {
        builderRepository
      },
    } = dependencies;
    
    const execute = async (id: string): Promise<ResponseRequest> => {
        const builder = await builderRepository.getById(id);

        if (!builder) {
            return new ResponseRequest({
              status: 404,
              error: new ResponseError({
                error: "Builder undefined",
                msg: "Builder doesn't exist",
              }),
              content: null,
            });
        } else {
            let builderWithoutWalletId: any = {};
            if (builder._doc) {
              builderWithoutWalletId = { ...builder._doc };
            } else {
              builderWithoutWalletId = { ...builder };
            }

            return new ResponseRequest({
                status: 200,
                content: {
                    builder: builderWithoutWalletId,
                },
                error: null,
            });
        }
    }

    return { execute };
}