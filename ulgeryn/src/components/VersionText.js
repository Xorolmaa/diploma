import React, { Component } from 'react'
import StyledEdiText from 'react-editext'
import EdiText from 'react-editext'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/joy';
import {useEffect } from 'react';
import axios from 'axios';



export default function VersionText (){

const theme = createTheme();
const { contentId } = useParams();
const { versionId } = useParams();

const onSave = (val) => {
  let newVersions = content.versions.map(v => {
    if (v.id === versionId) {
      setVersion({
          ...v,
          text: val
      });
      console.log("v", v)
      return version               
    } else {
      return v;
    }
  });
  const foundVersion = newVersions.find(element => {
    return element.id === versionId;
  });
  
  console.log(foundVersion)
  setContent({
    ...content,
      versions: newVersions
  })
  console.log(content)
}

const [text, setText] = React.useState(null)
const [content, setContent] = React.useState(null)
const [version, setVersion] = React.useState(null)
const [message, setMessage] = React.useState(null)

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

  useEffect(() => {
    // PUT request using axios inside useEffect React hook
    const article = { title: 'React Hooks PUT Request Example' };
    axios.put(`/api/v1/update-version/${versionId}`, version);

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, [version]);

useEffect(() => {
  // PUT request using axios inside useEffect React hook
  const article = { title: 'React Hooks PUT Request Example' };
  axios.put(`/api/v1/update-content/${contentId}`, content);

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, [content]);

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" >
      <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            }}
          >
            <div style={{ width: "100%" , marginBottom: '50px'}}>
               {/*  Apply your changes below */}
              <EdiText
                viewContainerClassName='my-custom-view-wrapper'
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
                editButtonContent='Үлгэрийг засварлах'
                value={text}
                onSave={onSave}
              />
            </div>
            {/* <Button onClick={changeVersionText}>Save</Button> */}
        </Box>
      </Container>
    </ThemeProvider>
  )
}