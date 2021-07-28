import * as Tone from "tone";
import { samples, instruments, Instrument } from "./constants";


export class Sampler {
  [k: string]: Tone.Sampler;

  constructor(onload: () => void, selectedInstruments: Instrument[] = instruments) {

    for (const instrument of selectedInstruments) {
      const urls: {[k:string]: string} = samples[instrument];

      this[instrument] = new Tone.Sampler({
        urls, 
        onload, 
        baseUrl: `${process.env.PUBLIC_URL}/samples/${instrument}/`,
      }).toDestination();
    }
  }
}
