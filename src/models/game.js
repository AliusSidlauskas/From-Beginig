import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  price: { type: Number, required: true },
  coverUrl:{type: String, required: true }
});

export default mongoose.model("Game", gameSchema);
