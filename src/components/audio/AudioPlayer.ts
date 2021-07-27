import * as Tone from "tone";
import { Key } from "../piano/Key";

export default class AudioPlayer {
  synth: Tone.Synth;

  constructor() {
    this.synth = new Tone.Synth().toDestination();
    this.synth.oscillator.type = "sine";
  }

  startNote(key: Key) {
    this.synth.triggerAttack(key.toString());
  }

  stopNote() {
    this.synth.triggerRelease();
  }
}

