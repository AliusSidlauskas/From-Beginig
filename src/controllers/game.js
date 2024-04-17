import { v4 as uuidv4 } from 'uuid';
import GameModel from "../models/game.js";

export const GET_ALL_GAMES = async (req, res) => {
    try{
    const games = await GameModel.find();
  return res.status(200).json({games:games});
    } catch(err){
        console.log(err)
    }
};

export const GET_GAME_BY_ID = async (req, res) => {
    try{
    const game = await GameModel.findOne({id: req.params.id});
  return res.status(200).json({game: game});
    } catch(err){
        console.log(err)
    }
};

export const INSERT_GAME = async (req, res) => {
  try{ 
  console.log("req.body", req.body);
  const game = new GameModel({
    id: uuidv4(),
    title: req.body.title,
    releaseYear: req.body.releaseYear,
    price: req.body.price,
    coverUrl: req.body.coverUrl,
  });

  const response = await game.save();

  return res
    .status(200)
    .json({ game: response, message: "Game was added successfully" });
} catch(err){
    console.log(err)
}
};
