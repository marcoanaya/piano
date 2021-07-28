import React from "react";
import { Key } from "../piano/Key";
import { Instrument } from "./constants";
import { Sampler } from "./Sampler";

export default class AudioPlayer {
  synth: Sampler;

  constructor(setAudioPlayer: React.Dispatch<React.SetStateAction<AudioPlayer | null>>) {
    const onload = () => setAudioPlayer(this);
    this.synth = new Sampler(onload);
  }

  startNote(key: Key, instrument: Instrument) {
    this.synth[instrument].triggerAttack(key.toString());
  }

  stopNote(key: Key, instrument: Instrument) {
    this.synth[instrument].triggerRelease(key.toString());
  }
}

