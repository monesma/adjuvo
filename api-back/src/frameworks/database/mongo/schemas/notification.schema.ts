import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    app_id: { type: String, required: true },
    builder_id: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
    who: { type: String, required: true},
    mission_id: { type: String, required: false },
    cancellation_id: { type: String, required: false},
    status: { type: String, required: true },
    creation_date: { type: Number, required: false },
  },
  { collection: "notification" }
);

const NotificationModel = mongoose.model("Notification", notificationSchema);

export default NotificationModel;