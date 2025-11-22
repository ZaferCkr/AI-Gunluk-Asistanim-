import axios from "axios";

const API_URL = "https://router.huggingface.co/hf-inference/models/nlptown/bert-base-multilingual-uncased-sentiment";
const API_TOKEN = "BURAYA_KENDI_HUGGING_FACE_TOKENINIZI_YAZIN";

export const analyzeMood = async (text) => {
  try {
    const response = await axios.post(
      API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data[0][0];
    const stars = parseInt(result.label.replace("star", "").trim()); // 1–5 arası

    let mood = "";
    let summary = "";
    let suggestion = "";

    if (stars >= 4) {
      mood = "positive";
      summary = "Harika hissetmişsin! ✨";
      suggestion = "Bu enerjiyi koru!";
    } else if (stars === 3) {
      mood = "neutral";
      summary = "Orta halli bir ruh hali.";
      suggestion = "Kendine biraz zaman ayırabilirsin.";
    } else {
      mood = "negative";
      summary = "Biraz düşük bir moddasın.";
      suggestion = "Dinlenmek iyi gelebilir.";
    }

    return { mood, summary, suggestion };
  } catch (error) {
    console.error("AI Hatası:", error.response?.data || error);
    alert("Bağlantı Hatası: " + (error.response?.status || error.message));
    return null;
  }
};
