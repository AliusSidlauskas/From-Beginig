import { v4 as uuidv4 } from "uuid";
import GameModel from "../models/game.js";

export const GET_ALL_GAMES = async (req, res) => {
  try {
    const games = await GameModel.find();
    return res.status(200).json({ games: games });
  } catch (err) {
    console.log(err);
  }
};

export const GET_GAME_BY_ID = async (req, res) => {
  try {
    const game = await GameModel.findOne({ id: req.params.id });
    return res.status(200).json({ game: game });
  } catch (err) {
    console.log(err);
  }
};

export const INSERT_GAME = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const game = new GameModel({
      id: uuidv4(),
      // userId: req.body.userId,
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      price: req.body.price,
      coverUrl: req.body.coverUrl,
    });

    const response = await game.save();

    return res
      .status(200)
      .json({ game: response, message: "Game was added successfully" });
  } catch (err) {
    console.log(err);
  }
};

export const GET_ALL_GAMES_BY_USER = async (req, res) => {
  try {
    const games = await GameModel.find({ userId: req.body.userId });
    if (!games.length) {
      return res.status(404).json({ message: "user do not have games" });
    }
    return res.status(200).json({ games: games });
  } catch (err) {
    console.log(err);
  }
};

// export const GAME_DELETE_BY_ID = async (req, res) => {
//   try{
//     const response = await GameModel.deleteOne({id: req.params.id})
//      return res.status(200).json({response:response})
//   } catch (err){
//     console.log(err)
//   }
// }

export const GAME_DELETE_BY_ID = async (req, res) => {
  try {
    const game = await GameModel.findOne({ id: req.params.id });

    if (game.userId !== req.body.userId) {
      return res
        .status(401)
        .json({ message: "this game does not belong to you" });
    }

    const response = await GameModel.deleteOne({ id: req.params.id });

    return res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
  }
};