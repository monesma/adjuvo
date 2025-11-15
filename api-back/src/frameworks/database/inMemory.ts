import { BuilderQuery } from "../../types/builder/builder-types";
import { CancellationQuery } from "../../types/cancellation/cancellation-types";
import { HederaAppQuery } from "../../types/hederaApp/hederaApp-types"
import { MissionQuery } from "../../types/mission/mission-types";
import { NotificationQuery } from "../../types/notifications/notifications-types";
import { SubmissionQuery } from "../../types/submission/submission-types";
import { ReportQuery } from "../../types/report/report-types"

const database: {
    builder: BuilderQuery[],
    hederaApp: HederaAppQuery[],
    mission: MissionQuery[],
    submission: SubmissionQuery[],
    notification: NotificationQuery[],
    cancellation: CancellationQuery[],
    report: ReportQuery[]
} = {
    builder: [],
    hederaApp: [],
    mission: [],
    submission: [],
    notification: [],
    cancellation: [],
    report: []
};

export default database;