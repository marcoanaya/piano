import * as Tone from "tone";

export default class AudioPlayer {
  synth: Tone.Synth;

  constructor() {
    this.synth = new Tone.Synth().toDestination();
    this.synth.oscillator.type = "sine";
  }

  startNote(note: any) {
    this.synth.triggerAttack(note);
  }

  stopNote() {
    this.synth.triggerRelease();
  }
}

