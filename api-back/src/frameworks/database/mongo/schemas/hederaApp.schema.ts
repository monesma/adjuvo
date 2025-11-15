import mongoose from "mongoose";

const hederaAppSchema = new mongoose.Schema(
  {
    app_name: { type: String, required: true },
    app_twitter: { type: String, required: true },
    email: { type: String, required: true },
    wallet_id: { type: String, required: false },
    smartcontract_id: { type: String, required: true },
    level: { type: String, required: false },
    score: { type: Number, required: false },
    missionsCompleted: { type: Number, required: false},
    avatar: { type: String, required: false },
    topic_id: { type: String, required: false},
    created_at: { type: Number, required: false },
    last_login: { type: Number, required: false }
  },
  { collection: "hederaApp" }
);

const HederaAppModel = mongoose.model("HederaApp", hederaAppSchema);

export default HederaAppModel;