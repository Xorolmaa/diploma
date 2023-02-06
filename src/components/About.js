import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import zurag from '../images/tseej-zurag.png';
import Avatar from '@mui/material/Avatar';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { CenterFocusStrong } from '@mui/icons-material';


  export default function About() {
    useEffect(() => 
       {
         console.log("BREADDDD");
       } , []);
    return (
      <Container component="about" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Grid container direction='row' spacing={2} marginLeft="30px">
            <Grid item xs={2.5}>
            <Avatar alt="Remy Sharp" src={zurag} sx={{ width: 180, height: 180 }} />
            </Grid>
            <Grid item xs={8}>
            <Typography >
                      Энэхүү системийг ашигласнаар цахим орчинд цагаа зөв боловсон өнгөрүүлээд зогсохгүй
            сургамж, хүмүүжил хийгээд мэдлэгийг олж авч чадна.Эх хэл (Монгол хэл) дээрээ чанартай
            контент бүтээх нь хойч үед эх хэлээ сурч эзэмшихэд тустай. Мөн үлгэр домгуудаас суралцах,
            төсөөллөө нэмэх боломжийг олгох давуу талуудтай гэж харж байна.Мөн энэхүү системээр дамжуулан цэцэрлэгийн болон бага ангийн сурагчдад цахим орчинд
            цагаа зөв боловсон өнгөрүүлэх боломж олгохийг машид хичээсэн бөгөөд монголынхоо ирээдүй
            хойч үед бага ч гэсэн хувь нэмэр оруулна гэж итгэж байна
          </Typography>
          <Typography sx={{fontWeight: 'bold', fontSize: 15}} >
                      <LocalPhoneIcon sx={{fontSize: 15}}/>Утас: 93139222
          </Typography >
          <Typography sx={{fontWeight: 'bold', fontSize: 15}} >
                      <EmailIcon sx={{fontSize: 15}}/>И-мейл: munkhamgalan1234@gmail.com
          </Typography>
            </Grid>
          </Grid>
          
          
        </Box>
      </Container>
  );
}