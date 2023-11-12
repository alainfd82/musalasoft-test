import dbConnect from "../libs/mongoose/database.mjs";
import Gateway from "../models/gateways.mjs";

export const createGateway = async (data) => {
  try {
    await dbConnect();
    return await Gateway.create(data);
  } catch (error) {
    throw error;
  }
};

export const listGateways = async (fields, page, perPage) => {
  try {
    await dbConnect();
    return await Gateway.find({}, fields, {
      limit: perPage,
      skip: perPage * (page - 1),
    });
  } catch (error) {
    throw error;
  }
};

export const countGateways = async () => {
  try {
    await dbConnect();
    return await Gateway.countDocuments({});
  } catch (error) {
    throw error;
  }
};

export const getGateway = async (gatewayId, fields = "") => {
  try {
    await dbConnect();
    return await Gateway.findById(gatewayId, fields).exec();
  } catch (error) {
    throw error;
  }
};

export const updateGateway = async (gatewayId, data) => {
  try {
    await dbConnect();
    await Gateway.validate(data);
    return await Gateway.updateOne({ _id: gatewayId }, data);
  } catch (error) {
    throw error;
  }
};

export const deleteGateway = async (gatewayId) => {
  try {
    await dbConnect();
    return await Gateway.deleteOne({ _id: gatewayId });
  } catch (error) {
    throw error;
  }
};
