// import express from "express";
// import dotenv from "dotenv";
// import blogRoutes from "./routes/blog.js";
// import { createClient } from "redis";
// import { startCacheConsumer } from "./utils/consumer.js";
// import cors from "cors";
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE,PATCH",
//     allowedHeaders: "Authorization,Content-Type",
//     credentials: true,
//   })
// );
// const port = process.env.PORT;
// startCacheConsumer();
// export const redisClient = createClient({
//   url: process.env.REDIS_URL!
// });
// redisClient
//   .connect()
//   .then(() => console.log("Connected to redis"))
//   .catch(console.error);
// app.use("/api/v1", blogRoutes);
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
import express from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes/blog.js";
import aiRoutes from "./routes/ai.js";
import { createClient } from "redis";
import { startCacheConsumer } from "./utils/consumer.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Authorization,Content-Type",
    credentials: true,
}));
const port = process.env.PORT;
startCacheConsumer();
export const redisClient = createClient({
    url: process.env.REDIS_URL,
});
redisClient
    .connect()
    .then(() => console.log("Connected to redis"))
    .catch(console.error);
// ✅ REGISTER ROUTES BEFORE LISTEN
app.use("/api/v1", blogRoutes);
app.use("/api/v1/ai", aiRoutes);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map