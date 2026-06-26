import express from "express";
import { fixBlogGrammar } from "../controllers/ai.js";
const router = express.Router();
router.post("/blog", fixBlogGrammar);
export default router;
//# sourceMappingURL=ai.js.map