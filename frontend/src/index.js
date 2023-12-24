//index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Box, Button, Grid, TextField, Container, Paper, Typography } from '@mui/material';
import Showdown from 'showdown';
import { submitQuestion, getCommitId } from "./tool.js"

function Index() {
  const [inputValue, setInputValue] = useState('');
  const [htmlText, setHtmlText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [commitId, setCommitId] = useState('unknown commit');
  const [isBusy,setIsBusy] = useState(false)

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const sendMessage = () => {
    setIsBusy(true)
    submitQuestion(apiKey, inputValue).then
      ((answer) => {
        const converter = new Showdown.Converter();
        const htmlText = converter.makeHtml(answer);
        setHtmlText(htmlText)
        setIsBusy(false)
      }
      )
  }
  useEffect(() => {
    getCommitId().then(
      (id) => {
        setCommitId(id)
      }
    )
  }
  )

  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField fullWidth label="Key" value={apiKey}
            onChange={handleApiKeyChange}
            type="password" id="gpt_key"></TextField>
          <Box sx={{ position: 'fixed', bottom: 0, left: 0, m: 2, p: 1 }}>
            {commitId}
          </Box>
        </Grid>
        <Grid item xs={9} >
          <TextField value={inputValue}
            onChange={handleInputChange}
            fullWidth multiline rows={4} variant="outlined" />
          <Paper fullWidth elevation={3} >
            <Typography
              component="div"
              dangerouslySetInnerHTML={{ __html: htmlText }}
            />
          </Paper>
           <Button type="submit" onClick={sendMessage} disabled={isBusy}>
              {isBusy ? 'Submitting...' : 'Submit'}
            </Button>      
        </Grid>
      </Grid>
    </Container>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Index />
  );
});

export default Index;