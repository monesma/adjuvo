import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    app_id: { type: String, required: true },
    builder_id: { type: String, required: false },
    mission_id: { type: String, required: true },
    status: { type: String, required: true },
    creation_timestamp: { type: Number, required: true },
  },
  { collection: "submission" }
);

const SubmissionModel = mongoose.model("Submission", submissionSchema);

export default SubmissionModel;