import express from 'express';
import dependencies from '../../../../config/dependencies';
import { crudRouteCreator } from '../crudRouteCreator';
import signupHederaAppController from '../../../../controllers/hederaApp/signupHederaApp.controller';
import signinHederaAppController from '../../../../controllers/hederaApp/signinHederaApp.controller';
import getByAppScIdController from '../../../../controllers/hederaApp/getByAppScId.controller';
import { withAuthHederaApp } from '../../middlewares/withAuthHederaApp';


export const hederaAppRouter = express.Router();

crudRouteCreator({
    entityRouter: hederaAppRouter,
    dependencies,
    useCaseName: "HederaApp",
    withAuthRoute: {
        add: false,
        delete: true,
        getAll: false,
        getById: false,
        update: true,
    },
    neededRoute: {
        add: false,
        delete: true,
        getAll: true,
        getById: true,
        update: true,
    },
    withAuth: withAuthHederaApp
})

hederaAppRouter.post('/signup', signupHederaAppController(dependencies).signupHederaAppController)
hederaAppRouter.post('/signin', signinHederaAppController(dependencies).signinHederaAppController)
hederaAppRouter.get('/getByScId/:smartcontract_id', getByAppScIdController(dependencies).getAppByScIdController)