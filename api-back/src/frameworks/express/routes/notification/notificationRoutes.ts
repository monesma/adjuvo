import express from 'express';
import dependencies from '../../../../config/dependencies';
import { crudRouteCreator } from '../crudRouteCreator';
import { withAuthHederaAppOrBuilder } from '../../middlewares/withAuthHederaAppOrBuilder';
import getNotificationForAppController from '../../../../controllers/notification/getNotificationForApp.controller';
import { withAuthHederaApp } from '../../middlewares/withAuthHederaApp';
import getNotificationForBuilderController from '../../../../controllers/notification/getNotificationForBuilder.controller';
import { withAuthBuilder } from '../../middlewares/withAuthBuilder';

export const notificationRouter = express.Router();

crudRouteCreator({
    entityRouter: notificationRouter,
    dependencies,
    useCaseName: "Notification",
    withAuthRoute: {
        add: true,
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

notificationRouter.get('/builder/:id',withAuthBuilder, getNotificationForBuilderController(dependencies).getNotificationForBuilderController)

notificationRouter.get('/app/:id',withAuthHederaApp, getNotificationForAppController(dependencies).getNotificationForAppController)