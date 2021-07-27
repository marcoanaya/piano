import { Key } from "./Key";

test('init', () => {
  expect(new Key("A1")).toMatchObject({ note: "A", octave: 1 });
})

test('getType', () => {
  expect(new Key("F8").getType()).toBe("natural");
  expect(new Key("F#8").getType()).toBe("accidental");
})

test('getNextKey', () => {
  expect(new Key("E8").getNextKey()).toMatchObject({ note: "F", octave: 8 });
  expect(new Key("B4").getNextKey()).toMatchObject({ note: "C", octave: 5 });
})

test('compare', () => {
  const keys = ["A8", "A8", "A#7", "C9", "G#8"].map((v) => new Key(v as `${Key.Note}${number}`));
  expect(Key.compare(keys[0], keys[1])).toBe(0);
  expect(Key.compare(keys[2], keys[0])).toBe(-1);
  expect(Key.compare(keys[0], keys[2])).toBe(1);
  expect(Key.compare(keys[3], keys[0])).toBe(1);
  expect(Key.compare(keys[0], keys[4])).toBe(1);
})

test('getKeysInBetween', () => {
  expect(Key.getKeysInBetween("A8", "A8")).toMatchObject([{ note: "A", octave: 8 }]);
  expect(Key.getKeysInBetween("A8", "G#8")).toMatchObject([]);
  expect(Key.getKeysInBetween("B8", "C9")).toMatchObject(
    [{ note: "B", octave: 8 }, {note: "C", octave: 9 }]
  );
  expect(Key.getKeysInBetween("C1", "B5").length).toBe(60);
})
