require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB verbunden"))
  .catch((err) => console.error("❌ MongoDB Fehler:", err));

// Challenge-Modell
const challengeSchema = new mongoose.Schema({
  text: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 }
});
const Challenge = mongoose.model("Challenge", challengeSchema);

// Routen
app.get("/api/challenges", async (req, res) => {
  const challenges = await Challenge.find();
  res.json(challenges);
});

app.post("/api/challenges", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Text darf nicht leer sein" });
    }
    const newChallenge = new Challenge({ text });
    await newChallenge.save();
    res.status(201).json(newChallenge);
  } catch (err) {
    console.error("❌ Fehler beim Hinzufügen:", err.message);
    res.status(500).json({ message: "Serverfehler" });
  }
});


app.post("/api/vote/:id", async (req, res) => {
  const { vote } = req.body;
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) return res.sendStatus(404);

  if (vote === "up") challenge.upvotes += 1;
  if (vote === "down") challenge.downvotes += 1;

  if (challenge.downvotes >= 10) {
    await Challenge.findByIdAndDelete(req.params.id);
    return res.json({ deleted: true });
  }

  await challenge.save();
  res.json(challenge);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend läuft auf Port ${PORT}`));
