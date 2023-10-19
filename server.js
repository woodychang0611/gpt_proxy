const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const PORT = 80;
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/ask', async (req, res) => {
    try {
        const question = req.body.question;
        const key = req.body.key.slice(0, -1);
        const body = {
            model: "gpt-4",
            messages: [{ role: "user", content: question }]
        }
        console.log(body)
        const headers = {
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            }
        }
        console.log(headers)
        const response = await axios.post(OPENAI_URL, body, headers);
        answer = response.data.choices[0].message.content
        res.json({ answer });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to fetch response" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
