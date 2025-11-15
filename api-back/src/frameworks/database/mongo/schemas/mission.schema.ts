import mongoose from "mongoose";

const missionSchema = new mongoose.Schema(
  {
    contract_address: { type: String, required: false },
    app_id: { type: String, required: true },
    builder_id: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
    reward: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
    creation_timestamp: { type: Number, required: true },
    nftReceipt: {
      tokenId: { type: String, required: false },
      serialNumber: { type: Number, required: false },
      transactionId: { type: String, required: false },
      metadata: { type: String, required: false }
    },
    nftReward: {
      tokenId: { type: String, required: false },
      serialNumber: { type: Number, required: false },
      transactionId: { type: String, required: false },
      metadata: { type: String, required: false }
    }
  },
  { collection: "mission" }
);

const MissionModel = mongoose.model("Mission", missionSchema);

export default MissionModel;