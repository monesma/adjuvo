import express, {Request, Response} from 'express';
import dependencies from '../../../../config/dependencies';
import getBuilderWithAuthController from '../../../../controllers/builder/getBuilderWithAuth.controller'
import ResponseRequest from '../../../common/ResponseRequest';
import getHederaAppWithAuthController from '../../../../controllers/hederaApp/getHederaAppWithAuth.controller';
import { withAuthBuilder } from '../../middlewares/withAuthBuilder';
import { withAuthHederaApp } from '../../middlewares/withAuthHederaApp'
export const authRouter = express.Router();
//@ts-ignore
authRouter.get('/builder/checkToken', withAuthBuilder, getBuilderWithAuthController(dependencies).getBuilderWithAuthController)
//@ts-ignore
authRouter.get('/hedera-app/checkToken', withAuthHederaApp, getHederaAppWithAuthController(dependencies).getHederaAppWithAuthController)