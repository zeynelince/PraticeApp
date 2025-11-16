// DOSYA ADI: app.js (GARSON)

const checkButton = document.getElementById('checkButton');
const sentenceInput = document.getElementById('sentenceInput');
const feedbackDiv = document.getElementById('feedbackResult');

checkButton.addEventListener('click', async () => {
    const sentence = sentenceInput.value.trim();

    if (sentence.length === 0) {
        feedbackDiv.innerText = "Lütfen bir cümle yazın.";
        return;
    }

    checkButton.disabled = true;
    checkButton.innerText = "Mutfaktan cevap bekleniyor...";
    feedbackDiv.innerText = "";

    try {
        // DİKKAT: Adres "http://127.0.0.1:3000" ile başlamalı!
        const response = await fetch('http://127.0.0.1:3000/api/check-sentence', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sentence: sentence })
        });

        if (!response.ok) {
            throw new Error(`Sunucu Hatası: ${response.status}`);
        }

        const data = await response.json();
        const feedbackText = data.feedback.trim();

        // Cevabı işle
        if (feedbackText.startsWith("DOGRU:")) {
            feedbackDiv.innerText = `✅ ${feedbackText.substring(6).trim()}`;
            feedbackDiv.style.color = "green";
        } else if (feedbackText.startsWith("YANLIS:")) {
            feedbackDiv.innerText = `❌ ${feedbackText.substring(7).trim()}`;
            feedbackDiv.style.color = "red";
        } else {
            feedbackDiv.innerText = `🤔 ${feedbackText}`;
            feedbackDiv.style.color = "black";
        }

    } catch (error) {
        console.error("Hata:", error);
        feedbackDiv.innerText = "❌ Bağlantı hatası! 'node example.js' çalışıyor mu?";
        feedbackDiv.style.color = "red";
    } finally {
        checkButton.disabled = false;
        checkButton.innerText = "Kontrol Et";
    }
});