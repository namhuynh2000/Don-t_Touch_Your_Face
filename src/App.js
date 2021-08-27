import './App.css';
import {useEffect, useRef} from 'react';
// import {Howl} from 'howler';
// import soundURL from './assets/hey_sondn.mp3';
// const mobilenet = require('@tensorflow-models/mobilenet');
// const knnClassifier = require('@tensorflow-models/knn-classifier');


// var sound = new Howl({
//   src: [soundURL]
// });

// sound.play();


function App() {
  const video = useRef();

  const init = async()=>{
    console.log('init...');
    await setupCamera();
  }

  const setupCamera = () =>{
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = navigator.getUserMedia || 
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
      if(navigator.getUserMedia){
        navigator.getUserMedia(
          {video: true},
          stream =>{
            video.current.srcObject = stream;
            video.current.addEventListener('loadeddata', resolve);
          },
          error => reject(error)
        );
      }else{
        reject();
      }
    });
  }

  useEffect(()=>{
    init();

    //cleanup
    return ()=>{

    }
  }, []);

  return (
    <div className="main">
      <video 
        ref={video}
        className="video"
        autoPlay
      />
      <div className="control">
        <button className="btn">Train 1</button>
        <button className="btn">Train 2</button>
        <button className="btn">Run</button>
      </div>
    </div>
  );
}

export default App;
