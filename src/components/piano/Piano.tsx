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
    note,
    isPlaying,
  }: any) => {
  
    return audioPlayer && (
      <button 
        className={`piano-${note.type}-key ${isPlaying && "active"}`}
        onMouseDown={() => audioPlayer.startNote(note.str)}
        onMouseUp={() => audioPlayer.stopNote()}
      >
        <span className="piano-text">{note.shortcut}</span>
      </button>
    )
  }
  console.log(Key.getKeysInBetween("C2", "D2"))
  return (
    <div>
      {renderKey({
        note: { type: "natural", shortcut: "A", str: "C#9" },
        isPlaying: true,
      })}
    </div>
  )
}
