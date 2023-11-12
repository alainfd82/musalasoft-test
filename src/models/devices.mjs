import { model, Schema } from "mongoose";
import models from "mongoose";

export const DeviceSchema = new Schema(
  {
    vendor: { type: String, required: true },
    status: {
      type: String,
      enum: ["online", "offline"],
      required: true,
      message: "{VALUE} is not supported",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Device = models.Device || model("Device", DeviceSchema);

export default Device;
