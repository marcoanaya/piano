import * as Tone from "tone";
import samples from "./samples.json";

export class Sampler {
  [k: string]: Tone.Sampler;

  constructor(selectedInstruments: Sampler.Instrument[], onload: () => void) {

    // if an array of instruments is passed...
    // const samples = setExt(".mp3")
    for (const instrument of selectedInstruments) {
      const urls: {[k:string]: string}= samples[instrument];
      //Minimize the number of samples to load
      // if (false) {
      //     let minBy = 1;
      //     if (Object.keys(newT).length >= 17) {
      //         minBy = 2
      //     }
      //     if (Object.keys(newT).length >= 33) {
      //         minBy = 4
      //     }
      //     if (Object.keys(newT).length >= 49) {
      //         minBy = 6
      //     }

      //     const filtered = Object.keys(newT).filter((_, i) => i % minBy !== 0)
      //     filtered.forEach((f) => delete newT[f])
      // }

      this[instrument] = new Tone.Sampler({
        urls, 
        onload, 
        baseUrl: `${process.env.PUBLIC_URL}/samples/${instrument}/`,
      }).toDestination();
    }
  }
}

export declare namespace Sampler {
  export type Instrument = keyof typeof samples;
}