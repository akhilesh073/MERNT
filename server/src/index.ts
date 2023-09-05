import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";

const PORT = 4000;
const app = express();
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await Deck.find();
  console.log(decks);
  res.json(decks);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
