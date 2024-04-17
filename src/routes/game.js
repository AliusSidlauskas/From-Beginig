import express from "express";
import {
  GET_ALL_GAMES,
  INSERT_GAME,
  GET_GAME_BY_ID,
} from "../controllers/game.js";
import {auth} from "../middlewares/auth.js";

const router = express.Router();

router.get("/games", GET_ALL_GAMES);
router.get("/games/:id", GET_GAME_BY_ID);
router.post("/games", auth, INSERT_GAME);

export default router;
