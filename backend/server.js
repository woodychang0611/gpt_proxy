const express = require('express');
const fs = require('fs')
const process = require('process')
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const PORT = 80;
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";


const argv = yargs(hideBin(process.argv))
    .option('api-only', {
        alias: 's',
        type: 'boolean',
        description: 'Run the API only without hosting host serve static files',
        default: false
    })
    .option('host-location', {
        alias: 'w',
        type: 'string',
        description: 'Web locations to host',
        default:'build',
    })
    .argv;

//make Docker "gracefully exit" a node container  
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
}


app.use(bodyParser.json());
if (argv.apiOnly){
    console.log("API only, do not host serve static files")
}else{
    console.log("Host serve static files")    
    app.use(express.static('build'));
}

app.get('/commit_id', async (req, res) => {
    console.log("GET commit_id")
    try {
        let filePath = "commit_id.json"
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let json = JSON.parse(fileContent)
        res.send(json);
    } catch (error) {
        console.log(error)
        res.send({ "commit_id": "unknown" })
    }
});

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
        console.log(response)
        answer = response.data.choices[0].message.content
        res.json({ answer });
    } catch (error) {
        console.log(error)
        var status = error.response.status
        var text = error.response.statusText
        res.status(status).json({ error: "Failed to fetch response", text: text });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
