import { useEffect, useRef, useState } from "react";

function SoundClick({ playSound, src }) {
  const [volume, setVolume] = useState(0.1);
  const audioRef = useRef(new Audio(src));

  audioRef.current.volume = volume;

  useEffect(() => {
    if (playSound) {
      audioRef.current.play();
    }
  }, [playSound]);

  return null; // No visible output
}

export default SoundClick;
