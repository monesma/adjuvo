import mongoose from "mongoose";

const cancellationSchema = new mongoose.Schema(
  {
    app_id: { type: String, required: true },
    builder_id: { type: String, required: false },
    reason: { type: String, required: false },
    mission_id: { type: String, required: false },
    status: { type: String, required: true },
    creation_date: { type: Number, required: true },
  },
  { collection: "cancellation" }
);

const CancellationModel = mongoose.model("Cancellation", cancellationSchema);

export default CancellationModel;