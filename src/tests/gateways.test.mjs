import mongoose from "mongoose";
import app from "../app";
import request from "supertest";
import "../loadEnvironment.mjs";

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

describe("GET /api/gateways", () => {
  it("Should return an error when receiving data in a format other than JSON.", async () => {
    const res = await request(app).get("/api/gateways");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
  });
});

describe("POST /api/gateways", () => {
  it("Should return an error when the IP field is invalid", async () => {
    const res = await request(app)
      .post("/api/gateways")
      .send({
        name: "GATEWAY 01",
        ipv4: "255.255.255",
        devices: [
          {
            vendor: "SAMSUNG",
            status: "offline",
          },
        ],
      })
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(406);
  });
  it("Should return an error when there are more than 10 devices.", async () => {
    const res = await request(app)
      .post("/api/gateways")
      .send({
        name: "GATEWAY 01",
        ipv4: "255.255.255.0",
        devices: [
          {
            vendor: "SAMSUNG1",
            status: "offline",
          },
          {
            vendor: "SAMSUNG2",
            status: "offline",
          },
          {
            vendor: "SAMSUNG2",
            status: "offline",
          },
          {
            vendor: "SAMSUNG2",
            status: "offline",
          },
          {
            vendor: "SAMSUNG2",
            status: "offline",
          },
          {
            vendor: "SAMSUNG2",
            status: "offline",
          },
          {
            vendor: "SAMSUNG2",
            status: "offline",
          },
          {
            vendor: "SAMSUNG2",
            status: "offline",
          },
          {
            vendor: "SAMSUNG2",
            status: "offline",
          },
          {
            vendor: "SAMSUNG2",
            status: "offline",
          },
          {
            vendor: "SAMSUNG2",
            status: "offline",
          },
        ],
      })
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(406);
  });
  it("Should return an error when sending data in a format other than JSON.", async () => {
    const res = await request(app)
      .post("/api/gateways")
      .set("Content-Type", "text/plain")
      .send("Not a JSON");
    expect(res.statusCode).toBe(406);
  });
});

describe("PUT /api/gateways/:gatewayId", () => {
  it("Should return an error when the status value of a device is neither online nor offline.", async () => {
    const res = await request(app)
      .put("/api/gateways/654dd8159f332237feab6c14")
      .send({
        name: "GATEWAY 01",
        ipv4: "255.255.255.0",
        devices: [
          {
            vendor: "SAMSUNG1",
            status: "other",
          },
        ],
      })
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(406);
  });
});

describe("DEL /api/gateways/:gatewayId", () => {
  it("Should return 404 when gateway id is not defined.", async () => {
    const res = await request(app).delete("/api/gateways");
    expect(res.statusCode).toBe(404);
  });
});

afterEach(async () => {
  await mongoose.connection.close();
});
