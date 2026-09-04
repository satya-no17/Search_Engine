import e from "express";
import { handleSearch } from "../controllers/index.js";
const router = e.Router()

router.get('/search', handleSearch)

export default router