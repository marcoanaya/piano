import { useEffect } from 'react';
import { useState } from 'react';
import { OrderedMap } from 'immutable';
import AudioPlayer from '../audio/AudioPlayer';
import { Key } from './Key';
import './piano.css';

export default function Piano() {
  const [audioPlayer, setAudioPlayer] = useState<AudioPlayer | null>(null);
  const [notesPlaying, setNotesPlaying] = useState<OrderedMap<Key, boolean> | null>(null);
  const [shortcutToKeyMap, setShortcutToKeyMap] = useState<Map<string, Key> | null>(null);

  useEffect(() => {
    const keys = Key.getKeysInBetween("C1", "B6")
    setShortcutToKeyMap(Key.addShortcuts(keys));
    setNotesPlaying(OrderedMap(keys.map((k) => [k, false])));

    new AudioPlayer(setAudioPlayer);    
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (!e.repeat){
        const key = shortcutToKeyMap?.get(e.key);
        if (key) onDownHandler(key);
      }
    });
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (!e.repeat){
        const key = shortcutToKeyMap?.get(e.key);
        if (key) onUpHandler(key);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortcutToKeyMap, audioPlayer])
  
  const onDownHandler = (key: Key) => {
    setNotesPlaying((prev) => prev!.set(key, true));
    audioPlayer?.startNote(key, "bass-electric");
  }

  const onUpHandler = (key: Key) => {
    setNotesPlaying((prev) => prev!.set(key, false));
    audioPlayer?.stopNote(key, "bass-electric");
  }

  const renderKey = (key: Key, isPlaying: boolean) => {
    return (
      <button 
        className={`piano-${key.getType()}-key ${isPlaying && "active"}`}
        onMouseDown={() => onDownHandler(key)}
        onMouseUp={() => onUpHandler(key)}
        key={key.toString()}
      >
        <span className="piano-text">{key.toString()}</span>
      </button>
    )
  }

  return (
    <div className="piano-container">
      {
       audioPlayer && notesPlaying && Array.from(notesPlaying, ([key, isPlaying]) => renderKey(key, isPlaying))
      }
    </div>
  )
}
