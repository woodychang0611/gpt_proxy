function updateCommitId(id) {
    fetch('/commit_id', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            document.getElementById(id).innerHTML = data.commit_id;
        })
        .catch(error => {
            console.error('Error:', error);
        })
}

function submitQuestion() {
    let questionText = document.getElementById('question').value;
    let keyText = document.getElementById('key').value;
    document.getElementById('answer').innerHTML = '<img src="img/loading.svg"/>'
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key: keyText, question: questionText })
    })
        .then(response => response.json())
        .then(data => {
            const converter = new showdown.Converter();
            let htmlOutput = converter.makeHtml(data.answer);
            if (htmlOutput == undefined) {
                htmlOutput = '<p class="text-danger">Failed</p>'
            }

            document.getElementById('answer').innerHTML = htmlOutput;
        })
        .catch(error => {
            console.error('Error:', error);
        })
}