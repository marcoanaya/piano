import React from "react";
import { Key } from "../piano/Key";
import { Sampler } from "./Sampler";

export default class AudioPlayer {
  synth: Sampler;

  constructor(setAudioPlayer: React.Dispatch<React.SetStateAction<AudioPlayer | null>>) {
    const onload = () => setAudioPlayer(this);
    this.synth = new Sampler(["piano", "clarinet", "bass-electric"], onload);
  }

  startNote(key: Key, instrument: Sampler.Instrument) {
    this.synth[instrument].triggerAttack(key.toString());
  }

  stopNote(key: Key, instrument: Sampler.Instrument) {
    this.synth[instrument].triggerRelease(key.toString());
  }
}

