import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import gateways from "./routes/gateways.mjs";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Load the /gateways routes
app.use("/api/gateways", gateways);

// Global error handling
app.use((err, _, res, next) => {
  res.status(500).json({ message: err.message });
});

// start the Express server
process.env.NODE_ENV !== "test" &&
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

export default app;
