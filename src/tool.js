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

function submitQuestion(keyText, questionText) {
    return new Promise((resolve, reject) => {
        fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key: keyText, question: questionText })
        })
            .then(response => response.json())
            .then(data => resolve(data.answer))
            .catch(error => {
                console.error('Error:', error);
            })
    }
    )
}

export default submitQuestion;