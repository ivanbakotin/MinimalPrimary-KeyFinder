export const TABLE = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export const funcdep1 = new Map();
export const funcdep2 = new Map();

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
