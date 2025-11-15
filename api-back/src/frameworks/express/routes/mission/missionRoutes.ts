import express from 'express';
import dependencies from '../../../../config/dependencies';
import { crudRouteCreator } from '../crudRouteCreator';
import { withAuthHederaApp } from '../../middlewares/withAuthHederaApp';
import { withAuthBuilder } from '../../middlewares/withAuthBuilder';
import createMissionController from '../../../../controllers/mission/createMission.controller';
import getScMissionForBuilderController from '../../../../controllers/mission/getScMissionForBuilder.controller'
import getScMissionForAppController from '../../../../controllers/mission/getScMissionForApp.controller'
import { withAuthHederaAppOrBuilder } from '../../middlewares/withAuthHederaAppOrBuilder';

export const missionRouter = express.Router();

crudRouteCreator({
    entityRouter: missionRouter,
    dependencies,
    useCaseName: "Mission",
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
missionRouter.post('/createMission',withAuthHederaApp, createMissionController(dependencies).createMissionController)

//@ts-ignore
missionRouter.get('/getScMissionForBuilder/:id',withAuthBuilder, getScMissionForBuilderController(dependencies).getScMissionForBuilderController)
//@ts-ignore
missionRouter.get('/getScMissionForApp/:id',withAuthHederaApp, getScMissionForAppController(dependencies).getScMissionForAppController)