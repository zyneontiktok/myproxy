import express from "express";
import fetch from "node-fetch"; // se Node 18+ puoi usare fetch nativo

const app = express();
const PORT = process.env.PORT || 3000; // usa la porta di Railway

app.use(express.json());

app.post("/send", async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Nessun testo ricevuto" });

  try {
    const response = await fetch("https://api.freegptjs.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: text }]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices?.[0]?.message?.content || "Nessuna risposta" });
  } catch (err) {
    res.status(500).json({ error: "Errore FreeGPT3: " + err });
  }
});

app.listen(PORT, () => console.log(`Server attivo su http://localhost:${PORT}`));
