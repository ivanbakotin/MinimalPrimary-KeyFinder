import { Candidate } from "./algorithm.js";

const ENTITES1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const ENTITES2 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const ENTITES3 = ["A", "B", "C", "D", "E", "F"];
const ENTITES4 = ["E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
const ENTITES5 = ["A", "B", "C"];

const funcdep1 = new Map();
const funcdep2 = new Map();
const funcdep3 = new Map();
const funcdep4 = new Map();
const funcdep5 = new Map();

funcdep1.set(["A"], ["E", "F"]);
funcdep1.set(["F"], ["C", "H"]);
funcdep1.set(["I"], ["D", "B"]);
funcdep1.set(["C", "J"], ["I"]);
funcdep1.set(["B", "F"], ["J", "E"]);
funcdep1.set(["E"], ["C", "D"]);

funcdep2.set(["D", "I"], ["B"]);
funcdep2.set(["A", "J"], ["F"]);
funcdep2.set(["G", "B"], ["F", "J", "E"]);
funcdep2.set(["A", "J"], ["H", "D"]);
funcdep2.set(["I"], ["C", "G"]);

funcdep3.set(["C"], ["F"]);
funcdep3.set(["E"], ["A"]);
funcdep3.set(["E", "C"], ["D"]);
funcdep3.set(["A"], ["B"]);

funcdep4.set(["E", "F"], ["G"]);
funcdep4.set(["F"], ["I", "J"]);
funcdep4.set(["E", "H"], ["K", "L"]);
funcdep4.set(["K"], ["M"]);
funcdep4.set(["L"], ["N"]);

funcdep5.set(["A"], ["C"]);
funcdep5.set(["C"], ["A"]);

const TABLE1 = new Candidate(ENTITES1, funcdep1, 1);
const TABLE2 = new Candidate(ENTITES2, funcdep2, 2);
const TABLE3 = new Candidate(ENTITES3, funcdep3, 3);
const TABLE4 = new Candidate(ENTITES4, funcdep4, 4);
const TABLE5 = new Candidate(ENTITES5, funcdep5, 5);

export const tables = [TABLE1, TABLE2, TABLE3, TABLE4, TABLE5];
