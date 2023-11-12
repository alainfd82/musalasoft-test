import express from "express";
const router = express.Router();
import {
  countGateways,
  createGateway,
  deleteGateway,
  getGateway,
  listGateways,
  updateGateway,
} from "../handlers/gateways.mjs";
import mongoose from "mongoose";

// CREATE A GATEWAY
router.post("/", async (req, res, next) => {
  try {
    if (!req.is("application/json")) {
      res
        .status(406)
        .json({ message: "Only body in JSON format is accepted" })
        .end();
    } else {
      const data = req.body;
      const response = await createGateway(data);
      res.json(response);
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res
        .status(406)
        .json({ ...error.errors })
        .end();
    } else next(error);
  }
});

// GET ALL GATEWAYS AND THEIR DEVICES
router.get("/", async (req, res, next) => {
  try {
    const fields = req.query.fields || "";
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;
    const items = await listGateways(fields, page, perPage);
    const count = await countGateways();
    const pages = Math.round(count / perPage);
    res.json({
      items,
      pagination: {
        page,
        prevPage: page === 1 ? null : page - 1,
        nextPage: page === pages ? null : page + 1,
        pages,
        perPage,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET A SINGLE GATEWAY
router.get("/:gatewayId", async (req, res, next) => {
  try {
    const { gatewayId } = req.params;
    const { fields } = req.query;
    const item = await getGateway(gatewayId, fields || "");
    res.json(item);
  } catch (error) {
    next(error);
  }
});

//UPDATE A GATEWAY
router.put("/:gatewayId", async (req, res, next) => {
  try {
    if (!req.is("application/json")) {
      res
        .status(406)
        .json({ message: "Only body in JSON format is accepted" })
        .end();
    } else {
      const { gatewayId } = req.params;
      const data = req.body;
      const item = await updateGateway(gatewayId, data);
      res.json(item);
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res
        .status(406)
        .json({ ...error.errors })
        .end();
    } else next(error);
  }
});

//DELETE A GATEWAY
router.delete("/:gatewayId", async (req, res) => {
  try {
    const { gatewayId } = req.params;
    const item = await deleteGateway(gatewayId);
    res.json(item);
  } catch (error) {
    next(error);
  }
});

export default router;
