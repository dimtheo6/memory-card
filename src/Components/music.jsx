import { useState, useEffect, useRef } from "react";

function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.1);
  const audioRef = useRef(null); // Initialize ref with null

  useEffect(() => {
    audioRef.current = new Audio("public/sounds/theme.mp3");

    audioRef.current.volume = volume;
    audioRef.current.loop = true;

    if (isPlaying) {
      audioRef.current.play();
    }

    return () => {
      // Clean up the audio instance when component unmounts
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-icon-wrapper" onClick={togglePlay}>
      <img src="/images/music.png" className="music-icon" alt="Music Icon" />
      {!isPlaying && <div className="strikethrough"></div>}
    </div>
  );
}

export default MusicButton;
