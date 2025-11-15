import express from 'express';
import dependencies from '../../../../config/dependencies';
import { crudRouteCreator } from '../crudRouteCreator';
import { withAuthHederaAppOrBuilder } from '../../middlewares/withAuthHederaAppOrBuilder';

export const cancellationRouter = express.Router();

crudRouteCreator({
    entityRouter: cancellationRouter,
    dependencies,
    useCaseName: "Cancellation",
    withAuthRoute: {
        add: false,
        delete: true,
        getAll: true,
        getById: false,
        update: true,
    },
    neededRoute: {
        add: true,
        delete: true,
        getAll: true,
        getById: true,
        update: true,
    },
    withAuth: withAuthHederaAppOrBuilder
})