import { model, Schema } from "mongoose";
import models from "mongoose";
import { DeviceSchema } from "./devices.mjs";
import net from "net";

const GatewaySchema = new Schema({
  name: { type: String, required: true },
  ipv4: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return net.isIPv4(v);
      },
      message: (props) => `${props.value} is not a valid Ipv4!`,
    },
  },
  devices: {
    type: [DeviceSchema],
    validate: {
      validator: (v) => {
        return v.length <= 10;
      },
      message: (props) => `Only up to 10 devices per gateway are supported!`,
    },
    required: true,
  },
});

const Gateway = models.Gateway || model("Gateway", GatewaySchema);

export default Gateway;
