import * as React from 'react';
import About from "./components/About"
import ContentDetail from "./components/ContentDetail"
import ContentAudio from "./components/ContentAudio"
import { BrowserRouter, Route, Routes} from "react-router-dom";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import ContentText from "./components/ContentText";
import UserContent from "./components/UserContent";
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';
import EditContent from './components/EditContent';
import DeleteContent from './components/DeleteContent';
import VersionText from './components/VersionText';
import VersionAudio from './components/VersionAudio';
import CreateContent from './components/CreateContent';
import { useState } from 'react';

function App() {
  
  return (
    <BrowserRouter>  
      <NavigationBar/>   
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/LogIn" element={<LogIn/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/DeleteContent/:contentId" element={<DeleteContent/>} />
        <Route path="/EditContent/:contentId" element={<EditContent/>} />
        <Route path="/ContentText/:versionId" element={<ContentText/>} />
        <Route path="/ContentAudio/:versionId" element={<ContentAudio/>} />
        <Route path="/UserContent" element={<UserContent/>} />
        <Route path="/VersionText/:contentId/:versionId" element={<VersionText/>} />
        <Route path="/VersionAudio/:contentId/:versionId" element={<VersionAudio/>} />
        <Route path="/CreateContent" element={<CreateContent/>} />
        <Route path="/ContentDetail/:contentId" element={<ContentDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
