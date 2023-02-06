import React, { useState } from "react";
import useRecorder from "./useRecorder"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import {useEffect } from 'react';
import axios from 'axios';

export default function VersionAudio(){

  const theme = createTheme();

  const { contentId } = useParams();
  const { versionId } = useParams();

const [text, setText] = React.useState(null)
const [content, setContent] = React.useState(null)
const [version, setVersion] = React.useState(null)


  const fetchContentDetail = async () => {
    const response = await axios
    .get(`/api/v1/content/${contentId}`)
    .catch((err) => {
      console.log("Err", err)
    });
    setContent(response.data);
    console.log(response.data);
  }

  const fetchVersionDetail = async () => {
    const response = await axios
    .get(`/api/v1/version/${versionId}`)
    .catch((err) => {
      console.log("Err", err)
    });
    setText(response.data.text);
    setVersion(response.data);
    console.log(response.data);
  }

  useEffect(() => 
  {
    if(contentId && contentId!=="") fetchContentDetail();
    if(versionId && versionId!=="") fetchVersionDetail();
  } , [contentId]);

  let [audioLink, audioURL, isRecording, startRecording, stopRecording] = useRecorder();
   const styles = {
    audio: {
      backgroundColor: "#f1f1f1",
      width: "50%",
    },
    inputText: {
      padding: "10px",
      color: "red",
    },
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="contentDetail" >
        <CssBaseline />
            <Box
                sx={{
                marginTop: 10,
                display: 'fixed',
                flexDirection: 'column',
                alignItems: 'center',
                }}
              >

              <Grid container spacing={8} columns={{ xs: 4, md: 12 }}   direction="row">
                <Grid item xs={6}>
                  <Box  sx={{display: "flex",
                      flexDirection: "column",
                      height: 500,
                      overflow: "hidden",
                      overflowY: "scroll"}}>
                    <Typography variant="h5" color="inherit" paragraph  >
                      {text}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2} columns={{ xs: 4, md: 12 }}   direction="column">
                    <Grid item>
                    <audio id="myAudio" src={audioURL} preload controls className="audio" />
                    </Grid>
                    <Grid item xs={6}>
                      <Button onClick={startRecording} disabled={isRecording} variant="contained" color="success">
                        start 
                      </Button>
                      <Button onClick={stopRecording} disabled={!isRecording} variant="contained" color="error">
                        stop 
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
             </Box>
        </Container>
    </ThemeProvider>  
  );
};