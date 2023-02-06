import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function ContentText(){
    const { versionId } = useParams();
    const [post, setPost] = React.useState(null);
    React.useEffect(() => {
        if(versionId && versionId!==""){
                axios.get(`/api/v1/version/${versionId}`).then((response) => {
                    setPost(response.data);
                  });
      }}, []);

    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
          toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
          },
        }),
        [],
      );
    
    const theme = React.useMemo(
        () =>
          createTheme({
            typography: {
              fontFamily: 'Cormorant Infant',
                  },
            palette: {
              mode,
            },
          }),
        [mode],
      );

    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <Container component="Contentext">
                <CssBaseline />
                    <Box
                        sx={{
                        marginTop: 2,
                        display: 'flex',
                        direction: 'row',
                        alignItems: 'center',
                        }}
                    >   
                    
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton> 
                    {theme.palette.mode} mode                   
                    </Box>
                    
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom >
                    {post &&("Хувилбар: "+post.versionName)}
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph >
                        {post && post.text}
                    </Typography>
            </Container>
        </ThemeProvider>
    </ColorModeContext.Provider>
)
}