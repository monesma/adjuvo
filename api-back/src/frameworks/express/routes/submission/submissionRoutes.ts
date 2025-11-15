import express from 'express';
import dependencies from '../../../../config/dependencies';
import { crudRouteCreator } from '../crudRouteCreator';
import { withAuthHederaApp } from '../../middlewares/withAuthHederaApp';
import { withAuthBuilder } from '../../middlewares/withAuthBuilder';
import getScSubmissionForBuilderController from '../../../../controllers/submission/getScSubmissionForBuilder.controller'
import getScSubmissionForAppController from '../../../../controllers/submission/getScSubmissionForApp.controller'
import { withAuthHederaAppOrBuilder } from '../../middlewares/withAuthHederaAppOrBuilder';

export const submissionRouter = express.Router();

crudRouteCreator({
    entityRouter: submissionRouter,
    dependencies,
    useCaseName: "Submission",
    withAuthRoute: {
        add: true,
        delete: true,
        getAll: false,
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

//@ts-ignore
submissionRouter.get('/getScSubmissionForBuilder/:id',withAuthBuilder, getScSubmissionForBuilderController(dependencies).getScSubmissionForBuilderController)
//@ts-ignore
submissionRouter.get('/getScSubmissionForApp/:id',withAuthHederaApp, getScSubmissionForAppController(dependencies).getScSubmissionForAppController)