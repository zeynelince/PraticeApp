// DOSYA ADI: example.js
// GÖREVİ: Mutfak (Backend Sunucusu)

import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// ----------------------------------------------------
// 1. AYARLAR
// ----------------------------------------------------
const app = express();
const port = 3000; // Mutfak 3000 portunda çalışacak
app.use(cors()); // Garsonun (port 5500) mutfağa girmesine izin ver
app.use(express.json()); // Gelen siparişleri (JSON) anla

// ----------------------------------------------------
// 2. GİZLİ TARİF (API ANAHTARI VE SABİT PROMPT)
// ----------------------------------------------------
const API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// SİZİN İSTEDİĞİNİZ SABİT PROMPT
const SABIT_PROMPT = `Sen bir A1 İngilizce öğretmenisin.
Cevabına HER ZAMAN şu iki kelimeden biriyle başla:
1. Eğer cümle doğruysa, cevabına 'DOGRU:' diye başla.
2. Eğer cümle yanlışsa, cevabına 'YANLIS:' diye başla.

Örnek 1: 'DOGRU: Harika! Bu cümle mükemmel.'
Örnek 2: 'YANLIS: Doğrusu 'I am happy.' olmalı. 'I' öznesi ile 'am' kullanılır.'`;

// ----------------------------------------------------
// 3. SİPARİŞ ALMA YERİ (API YOLU)
// ----------------------------------------------------
// Garson (app.js) bu adrese POST isteği atacak
app.post('/api/check-sentence', async (req, res) => {
    try {
        // Garsonun getirdiği dinamik cümleyi al
        const { sentence } = req.body;
        console.log(`İstek geldi: "${sentence}"`);

        // Sabit prompt ile dinamik cümleyi birleştir
        const finalPrompt = `${SABIT_PROMPT}\n\nKullanıcı Cümlesi: "${sentence}"`;

        // Gemini (Aşçı) ile konuş
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
        const result = await model.generateContent(finalPrompt);
        const responseText = await result.response.text();

        // Cevabı garsona (app.js) geri ver
        res.status(200).json({ feedback: responseText });

    } catch (error) {
        console.error("API Hatası:", error);
        res.status(500).json({ feedback: "Mutfakta bir hata oldu (API Sunucusu)." });
    }
});

// ----------------------------------------------------
// 4. MUTFAĞI AÇ
// ----------------------------------------------------
app.listen(port, () => {
    console.log(`✅ MUTFAK (Backend) http://127.0.0.1:${port} adresinde çalışıyor`);
    console.log(`Garson (Frontend) '/api/check-sentence' adresine istek atabilir.`);
});