const notes = ["C", "C#", "D", "D#", "E" , "F", "F#", "G", "G#", "A", "A#", "B"] as const;



export class Key {
  note: Key.Note;
  octave: number;
  
  constructor(val: `${Key.Note}${number}`) {
    console.log(val.match(/([A-G][#]?)([1-9])/))
    const [, note, octave] = val.match(/([A-G][#]?)([1-9])/)!
    this.note = note as Key.Note;
    this.octave = Number(octave);
  }

  getType(): Key.Type {
    return (this.note.length > 1)? "accidental" : "natural";
  }

  getNextKey(): Key {
    const i = (notes.indexOf(this.note) + 1) % notes.length;
    return new Key(`${notes[i]}${this.octave + Number(i === 0)}`)
    
  }

  static compare(a: Key, b: Key): number {
    const i = notes.indexOf(a.note);
    const j = notes.indexOf(b.note);
    return a.octave === b.octave && i === j
      ? 0
      : a.octave < b.octave || (a.octave === b.octave && i > j)
      ? 1
      : -1;
  }

  static getKeysInBetween(
    start: `${Key.Note}${number}`,
    end: `${Key.Note}${number}`,
  ): Key[] {
    console.log(start, end)
    let [startKey, endKey] = [new Key(start), new Key(end)]
    
    if (Key.compare(startKey, endKey) > 0)
      return []

    const keys = [startKey];
    do {
      startKey = startKey.getNextKey();
      keys.push(startKey);
    } while (Key.compare(startKey, endKey));
    return keys;
  }
}

declare namespace Key {
  export type Note = typeof notes[number];
  export type Type = ("accidental" | "natural");
}
