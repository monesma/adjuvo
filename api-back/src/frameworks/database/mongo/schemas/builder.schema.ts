import mongoose from "mongoose";

const builderSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    nickname: { type: String, required: true },
    wallet_id: { type: String, required: false },
    smartcontract_id: { type: String, required: false },
    level: { type: String, required: false },
    score: { type: Number, required: false },
    missionsCompleted: { type: Number, required: false},
    avatar: { type: String, required: false },
    created_at: { type: Number, required: false },
    last_login: { type: Number, required: false }
  },
  { collection: "builder" }
);

const BuilderModel = mongoose.model("Builder", builderSchema);

export default BuilderModel;