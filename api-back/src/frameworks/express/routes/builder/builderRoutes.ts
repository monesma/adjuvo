import express from 'express';
import dependencies from '../../../../config/dependencies';
import { crudRouteCreator } from '../crudRouteCreator';
import signupBuilderController from '../../../../controllers/builder/signupBuilder.controller';
import signinBuilderController from '../../../../controllers/builder/signinBuilder.controller';
import getBuilderByScIdController from '../../../../controllers/builder/getBuilderBySc.controller';
import getAllCustomersByBuilderIdController from '../../../../controllers/builder/getAllCustomersByBuilderId.controller';
import { withAuthBuilder } from '../../middlewares/withAuthBuilder';
import { withAuthHederaAppOrBuilder } from '../../middlewares/withAuthHederaAppOrBuilder';

export const builderRouter = express.Router();

crudRouteCreator({
    entityRouter: builderRouter,
    dependencies,
    useCaseName: "Builder",
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
    withAuth: withAuthHederaAppOrBuilder
})

builderRouter.get('/customers', (req,res,next):any=>withAuthBuilder(req,res,next), getAllCustomersByBuilderIdController(dependencies).getAllCustomersByBuilderIdController)
builderRouter.post('/signup', signupBuilderController(dependencies).signupBuilderController)
builderRouter.post('/signin', signinBuilderController(dependencies).signinBuilderController)
builderRouter.get('/getByScId/:smartcontract_id', getBuilderByScIdController(dependencies).getBuilderByScIdController)
