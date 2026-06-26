const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API Gateway is running");
});

// Blog routes (proxy style – simple version)
app.get("/api/v1/blog/all", async (req, res) => {
  res.json({ blogs: [] }); // temporary response
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
