function getCommitId(id) {
    return new Promise((resolve, reject) => {
        fetch('/commit_id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => resolve(data.commit_id))
            .catch(error => {
                reject(error)
            })
    }
    )
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
            .then(response => {
                if (response.ok) {
                    return response.json()
                }else{
                    console.log(response)                    
                    console.log(response.statusText)
                    reject(response)
                }
            })
            .then(data => resolve(data.answer))
            .catch(error => {
                console.error('Error:', error);
                reject(error)
            })
    }
    )
}

export { submitQuestion, getCommitId };