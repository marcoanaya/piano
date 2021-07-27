import { useEffect } from 'react';
import { useState } from 'react';
import AudioPlayer from '../audio/AudioPlayer';
import { Key } from './Key';
import './piano.css';

export default function Piano() {
  const [audioPlayer, setAudioPlayer] = useState<AudioPlayer | null>(null)

  useEffect(() => {
    setAudioPlayer(new AudioPlayer());
    console.clear();
  }, [])
  

  const renderKey = ({
    key,
    isPlaying,
  }: { key: Key, isPlaying: boolean}) => {
  
    return audioPlayer && (
      <button 
        className={`piano-${key.getType()}-key ${isPlaying && "active"}`}
        onMouseDown={() => audioPlayer.startNote(key)}
        onMouseUp={() => audioPlayer.stopNote()}
      >
        <span className="piano-text">{key.toString()}</span>
      </button>
    )
  }

  return (
    <div>
      {
        Key.getKeysInBetween("C4", "B6").map((key) => renderKey({ key, isPlaying: false }))
      }
    </div>
  )
}
