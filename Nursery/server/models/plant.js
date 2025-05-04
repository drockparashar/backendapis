import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    species: {
      type: String,
      required: true,
    },
    plantingDate: {
      type: Date,
      default: Date.now(),
    },
    lastWateredDate: {
      type: Date,
      default: Date.now(),
    },
    health: {
      type: Number,
      default: 100,
    },
    growthStage: {
      type: String,
      enum: ["seed", "seedling", "young", "mature"],
      default: "seed",
    },
    isAlive: {
      type: Boolean,
      default: true,
    },
    isHarvested: {
      type: Boolean,
      default: false,
    },
    growthProgress: {
      type: Number,
      default: 0,
    },
    growthRate: {
      type: Number,
      default: 1,
    },
    lastGrowthStage: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Plant = mongoose.model("plant", plantSchema);
export default Plant;
