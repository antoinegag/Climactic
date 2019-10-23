import { Station } from "./Station";

let station1: Station;
let station2: Station;

beforeEach(() => {
  station1 = new Station(1, "localhost:3020", "Mock station 1");
  station2 = new Station(2, "localhost:3021", "Mock station 2");
});

test("Test constructor ip check", () => {
  expect(() => new Station(1, "google.com", "Google")).toThrowError();
  expect(() => new Station(1, "432.100.1.2", "Invalid ip")).toThrowError();
});

test("Test constructor", () => {
  const st1Copy = new Station(1, "localhost:3020", "Mock station 1");
  expect(st1Copy).toEqual(station1);
});

test("Test url", () => {
  expect(station1.url).toBe("http://localhost:3020");
});
