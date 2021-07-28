import { useEffect } from 'react';
import { useState } from 'react';
import { OrderedMap } from 'immutable';
import AudioPlayer from '../audio/AudioPlayer';
import { Key } from './Key';
import { instruments, Instrument } from "../audio/constants";
import './piano.css';


export default function Piano() {
  const [audioPlayer, setAudioPlayer] = useState<AudioPlayer | null>(null);
  const [notesPlaying, setNotesPlaying] = useState<OrderedMap<Key, boolean> | null>(null);
  const [shortcutToKeyMap, setShortcutToKeyMap] = useState<Map<string, Key> | null>(null);
  const [instrument, setInstrument] = useState<Instrument>("bass-electric");

  useEffect(() => {
    const keys = Key.getKeysInBetween("C2", "B5")
    setShortcutToKeyMap(Key.addShortcuts(keys));
    setNotesPlaying(OrderedMap(keys.map((k) => [k, false])));

    new AudioPlayer(setAudioPlayer);    
  }, [])

  useEffect(() => {
    const listener = (handler: (key: Key) => void) => ((e: KeyboardEvent) => {
      if (!e.repeat){
        const key = shortcutToKeyMap?.get(e.key);
        if (key) handler(key);
      }
    });
    const [onDownListener, onUpListener] = [onDownHandler, onUpHandler].map(listener)
    window.addEventListener("keydown", onDownListener);
    window.addEventListener("keyup", onUpListener);
    return () => {
      window.removeEventListener("keydown", onDownListener);
      window.removeEventListener("keyup", onUpListener);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortcutToKeyMap, audioPlayer, instrument])
  
  const onDownHandler = (key: Key) => {
    setNotesPlaying((prev) => prev!.set(key, true));
    audioPlayer?.startNote(key, instrument);
  }

  const onUpHandler = (key: Key) => {
    setNotesPlaying((prev) => prev!.set(key, false));
    audioPlayer?.stopNote(key, instrument);
  }

  const renderKey = (key: Key, isPlaying: boolean) => {
    const wrapper = (button: JSX.Element) => (
      key.getType() === "accidental"
      ?  <div className={`piano-${key.getType()}-key-wrapper`}>{button}</div>
      : button
    )
    return wrapper(
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
        (audioPlayer && notesPlaying) 
        ? <>
          <select onChange={(e) => setInstrument(e.target.value as Instrument)}>
            {instruments.map((instrument, i) => (
              <option 
                value={instrument}
                key={i}
              >{instrument}</option>
            ))}
          </select>
          {Array.from(notesPlaying, ([key, isPlaying]) => renderKey(key, isPlaying))}
        </>
        : "LOADING"
      }
    </div>
  )
}
