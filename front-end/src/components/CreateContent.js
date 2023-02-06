import React, { useState } from "react";
import useRecorder from "./useRecorder"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import EdiText from 'react-editext'
import ImageUpload from "./ImageUpload";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect } from 'react';

export default function CreateContent(){

  const theme = createTheme();  
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

  const [categorySelected, setCategorySelected] = useState(1);

  const categorySelectionChangeHandler = (event) => {
    setCategorySelected(event.target.value);
    let name;
    switch(event.target.value) {
      case 1:
         name = "Монгол ардын үлгэр"
        break;
      case 2:
        name = "Орос үлгэр"
        break;
      case 3:
        name = "Бусад орны үлгэр"
      default:
        break;
    }

    let newCategory = message.category;
    newCategory = {
      ...newCategory,
      id: event.target.value,
      categoryName: name
      //text: contentText
    };
    setMessage({
      ...message,
      category: newCategory
    });
  };

  let [audioLink,audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  const [user, setUser] = useState(null)
  useEffect(() => {
    const userString = localStorage.getItem("user")
    if(userString){
      setUser(JSON.parse(userString))
    }
  });
 
  const [message, setMessage] = useState({
    title: null,
    imageUrl: "http://localhost:8080/api/v1/photo/",
    likeNumber: 0,
    author:
    {
        id: null,
        firstName: "Мөнх-Амгалан",
        lastName: "Мөнхбат",
        email: "munkhamgalan1234@gmail.com",
        password: "93139222",
        ip: null,
        userType: "free",
        roles: [
        ]
    }
    ,
    category: {
        id: 1,
        categoryName: "Монгол ардын үлгэр"
    },
    versions: [
        {
            versionName:null,
            text: null,
            audioUrl: null,
            isDefault: true
        }       
    ],
});


  const [selectedPhoto, setSelectedPhoto] = useState();
  const [selectedAudio, setSelectedAudio] = useState();
  const [contentText, setContentText] = useState(null);
  const [currentVersionName, setCurrentVersionName] = useState(null);
  const [title, setTitle] = useState(null);

  //text
  const handleSave = (val) => {
    console.log('Edited Value -> ', val);
    setContentText(val);

    const newVersions = [...message.versions];
    newVersions[0] = {
      ...newVersions[0],
      text: val
    };
    setMessage({
      ...message,
      versions: newVersions
    });

  };

  //title
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
    setMessage({
      ...message,
      title: event.target.value
    });
  };


  //versionName
  const handleChangeVersionName = (event) => {
    setCurrentVersionName(event.target.value);

    const newVersions = [...message.versions];
    newVersions[0] = {
      ...newVersions[0],
      versionName: event.target.value,
      //text: contentText
    };
    setMessage({
      ...message,
      versions: newVersions
    });
  };

  const handleChangeCreate =  async() => {

    
    
    if(!title) alert("Үлгэрийн нэр оруулаагүй байна")
    else{
        if(!currentVersionName) alert("Хувилбарын нэр оруулаагүй байна")
        else{
          if(!contentText) alert("Үлгэрийн текстийн талбар хоосон байна")
          else{
            if(!selectedPhoto) alert("Үлгэрийн зураг оруулаагүй байна")
            else{
              if(!audioLink) alert("Үлгэрийн аудио оруулаагүй байна")
              else{

                let newAuthor = message.author;
                newAuthor = {
                  ...newAuthor,
                  id: user.id,
                  //text: contentText
                };
            
                message.author = newAuthor

                const newVersions = [...message.versions];
                newVersions[0] = {
                  ...newVersions[0],
                  audioUrl: audioLink
                  //text: contentText
                };

                message.versions = newVersions;
                // console.log("newVersion 186", newVersions)
                // setMessage({
                //   ...message,
                //   author: newAuthor,
     
                // });
                // setMessage({
                //   ...message,
                  
                //   versions: newVersions
                // });
                console.log(newVersions)
            
                console.log(message)
            
                const data = JSON.stringify(message);
                const result = await axios.post("/api/v1/create-content", message);  
                alert("Үлгэр амжилттай үүслээ");
              }}}}}
        
    
    


  }

  // function handlePhotoSelect(e) {
  //       console.log("image",e.target.files);
  //       setSelectedPhoto(URL.createObjectURL(e.target.files[0]));
  //   }
  let photoId;
  const handleSubmit = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    
    setSelectedPhoto(URL.createObjectURL(event.target.files[0]));
    formData.append("image",event.target.files[0]);
    try {
      const response = await axios({
        method: "post",
        url: "/api/v1/create-photo",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }      
      );
      photoId = response.data;

      setMessage({
        ...message,
        imageUrl: `http://localhost:8080/api/v1/photo/${photoId}`
      });
    } catch(error) {
      console.log(error)
      alert("error")
    }
    
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="contentDetail" >
        <CssBaseline />
            <Box
                sx={{
                marginTop: 2,
                display: 'fixed',
                flexDirection: 'column',
                alignItems: 'center',
                }}
              >

              <Grid container spacing={8} columns={{ xs: 4, md: 12 }}   direction="row">
                
                <Grid item xs={6}>
                  <Grid container spacing={2} columns={{ xs: 4, md: 12 }}   direction="column">
                    <Grid item xs={2}>
                    <TextField
                        id="outlined-name"
                        label="Үлгэрийн нэр"
                        value={title}
                        onChange={handleChangeTitle}
                      />
                      </Grid>
                      <Grid item xs={2}>
                      <TextField
                        id="outlined-name"
                        label="Хувилбарын нэр"
                        value={currentVersionName}
                        onChange={handleChangeVersionName}
                      />
                    </Grid>
                    <Grid item xs={2}>
                    <FormControl  variant="outlined"  sx={{width: 210, mb:2,
                      display: { xs: 'none', md: 'flex' }}}>
                      <Select value={categorySelected} onChange={categorySelectionChangeHandler} disableUnderline 
                            style={{color: 'black'}} >
                              <MenuItem value={1}>Монгол ардын үлгэр</MenuItem>
                              <MenuItem value={2}>Орос үлгэр</MenuItem>
                              <MenuItem value={3}>Бусад орны үлгэр</MenuItem>
                      </Select>
                    </FormControl>                     
                      <div >           
                              <img
                                  
                                  width="300px"         
                                  src={selectedPhoto}
                                  loading="lazy"
                                  alt=""
                              />
                              <input type="file" onChange={handleSubmit} />
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <audio id="myAudio" src={audioURL} preload controls className="audio" style={styles.audio}/>
                    </Grid>
                    <Grid item xs={6} style={{ flexGrow: "1" }}>
                      <Button onClick={startRecording} disabled={isRecording} variant="contained" color="success">
                        start 
                      </Button>
                      <Button onClick={stopRecording} disabled={!isRecording} variant="contained" color="error">
                        stop 
                      </Button>
                    </Grid>
                    <Grid item xs={2} marginTop="10px" >
                      <Button onClick={handleChangeCreate} variant="contained" color="primary">
                          Үлгэр үүсгэх 
                      </Button>
                </Grid>
                </Grid>      
                </Grid>
                <Grid item xs={6}>
                    <div style={{ width: "100%" , marginBottom: '50px'}}>
                        {/*  Apply your changes below */}
                        <EdiText
                            viewContainerClassName='my-custom-view-wrapper'
                            placeholder='Эрт урьд цагт...'
                            type='textarea'
                            //  buttonsAlign='after'
                            inputProps={{
                            className: 'textarea',
                            placeholder: 'Type your content here',
                            style: {
                                outline: 'none',
                                minWidth: '90%',
                                
                            },
                            rows: 30
                            }}
                            saveButtonContent='Хадгалах'
                            cancelButtonContent={<strong>Цуцлах</strong>}
                            editButtonContent='Үлгэрийн текст оруулах'
                            value={contentText}
                            onSave={handleSave}
                        />
                    </div>
                </Grid>
              </Grid>
             </Box>
        </Container>
    </ThemeProvider>  
  );
};