//index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {Box, Button, Grid, TextField, Container, Paper, Typography } from '@mui/material';
import Showdown from 'showdown';
import { submitQuestion, getCommitId } from "./tool.js"

function Index() {
  const [inputValue, setInputValue] = useState('');
  const [htmlText, setHtmlText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [commitId, setCommitId] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const sendMessage = () => {
    submitQuestion(apiKey, inputValue).then
      ((answer) => {
        const converter = new Showdown.Converter();
        const htmlText = converter.makeHtml(answer);
        setHtmlText(htmlText)
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
        <Grid item xs={3} >
          <TextField fullWidth label="Key" value={apiKey}
            onChange={handleApiKeyChange}
            type="password" id="gpt_key"></TextField>
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
          <Button type="submit" onClick={sendMessage}>Submit</Button>
        </Grid>
      </Grid>
      <Box sx={{position:'fixed',bottom:0,right:0,m:2,p:1}}>
        {commitId}
      </Box>
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