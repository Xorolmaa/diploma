import { useEffect, useState } from "react";
import axios from 'axios';

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [audioLink, setAudioLink] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    // const handleData = e => {
    //   setAudioURL(URL.createObjectURL(e.data));
    //   setAudioFile(e.data);
    // };

    const handleData = async(event) => {
      event.preventDefault()
      const formData = new FormData();
      
      setAudioURL(URL.createObjectURL(event.data));
      formData.append("audio",event.data);
      try {
        const response = await axios({
          method: "post",
          url: "/api/v1/create-audio",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }      
        );
        setAudioLink(response.data);
        console.log("audioLink",audioLink)
        //audioId = response.data;
        // setMessage({
        //   ...message,
        //   imageUrl: `http://localhost:8080/api/v1/audio/${audioId}`
        // });
      } catch(error) {
        console.log(error)
        alert("error")
      }
      
    }

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return [audioLink,audioURL, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
export default useRecorder;
