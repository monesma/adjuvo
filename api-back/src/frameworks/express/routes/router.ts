
import express from 'express';
import { hederaAppRouter } from './hederaApp/hederaAppRoutes'
import { authRouter } from './auth/authRoutes';
import { builderRouter } from './builder/builderRoutes'
import { missionRouter } from './mission/missionRoutes'
import { submissionRouter } from './submission/submissionRoutes';
import { notificationRouter } from './notification/notificationRoutes';
import { cancellationRouter } from './cancellation/cancellationRoutes';
import { reportRouter } from './report/reportRoutes'

export const router = express.Router()
router.use('/builder', builderRouter)
router.use('/hedera-app', hederaAppRouter)
router.use('/auth', authRouter)
router.use('/mission', missionRouter)
router.use('/submission', submissionRouter)
router.use('/notification', notificationRouter)
router.use('/cancellation', cancellationRouter)
router.use('/report', reportRouter)