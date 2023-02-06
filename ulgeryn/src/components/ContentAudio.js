import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';

const theme = createTheme({
    typography: {
      fontFamily: 'Cormorant Infant',
    }, 
  });

export default function ContentText(){
    const { versionId } = useParams();

  //   const [isRecording, startRecording, stopRecording] = useRecorder(
  //     (url, duration) => getCallback(url, duration)
  //   );
  
  // const getCallback = (url, duration) => {
  // //url, duration-iig avaad backruu esvel state-d hadgalah
  //   };

      const [post, setPost] = React.useState(null);

      React.useEffect(() => {
        if(versionId && versionId!==""){
                axios.get(`/api/v1/version/${versionId}`).then((response) => {
                    setPost(response.data);
                  });
      }}, []);

    return (
        // <div style={{backgroundImage: `url(${image})`}}>
        <ThemeProvider theme={theme} >
            <Container component="Contentext" >
            
                <CssBaseline />
                    <Box
                        sx={{
                        marginTop: 8,
                        display: 'flex',
                        direction: 'row',
                        alignItems: 'center',
                        }}
                    >                       
                    </Box>
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom >
                    {post &&("Хувилбар: "+post.versionName)}
                    </Typography>
                    <div>
                    {post && <AudioPlayer id="myAudio" src={`http://localhost:8080/api/v1/audio/${post.audioUrl}`} preload controls className="audio"/>}
                    </div>
                    
            </Container>
        </ThemeProvider>
)
}