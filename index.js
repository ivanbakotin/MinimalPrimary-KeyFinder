const TABLE = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const PRIMARY_KEYS = [];

const functionalDependencies1 = new Map();
const functionalDependencies2 = new Map();

functionalDependencies1.set(["A"], ["E", "F"]);
functionalDependencies1.set(["F"], ["C", "H"]);
functionalDependencies1.set(["I"], ["D", "B"]);
functionalDependencies1.set(["C", "J"], ["I"]);
functionalDependencies1.set(["B", "F"], ["J", "E"]);
functionalDependencies1.set(["E"], ["C", "D"]);

functionalDependencies2.set(["D", "I"], ["B"]);
functionalDependencies2.set(["A", "J"], ["F"]);
functionalDependencies2.set(["G", "B"], ["F", "J", "E"]);
functionalDependencies2.set(["A", "J"], ["H", "D"]);
functionalDependencies2.set(["I"], ["C", "G"]);

const functionalDependencies = functionalDependencies1;

function expandKey(firstKey, rightAttributes, helpers) {
  for (let i = 0; i < TABLE.length; i++) {
    if (!rightAttributes.includes(TABLE[i])) {
      if (!helpers) {
        helpers = [];
      }

      const newHelpers = [...helpers];
      const newAttributes = [...rightAttributes];

      newHelpers.push(TABLE[i]);
      newAttributes.push(TABLE[i]);

      getDependencies(firstKey, newAttributes, 0, newHelpers);
    }
  }
}

function check3rdAxiom(keyDependency, rightAttributes) {
  return keyDependency.every((key) => {
    return rightAttributes.indexOf(key) !== -1;
  });
}

function getDependencies(firstKey, rightAttributes, currentRuns, helpers) {
  if (TABLE.length === rightAttributes.length) {
    PRIMARY_KEYS.push([...firstKey, ...helpers]);
  }

  if (rightAttributes.length == currentRuns) {
    return expandKey(firstKey, rightAttributes, helpers);
  }

  for (const [leftDependency, rightDependency] of functionalDependencies) {
    if (check3rdAxiom(leftDependency, rightAttributes)) {
      rightDependency.forEach((value) => {
        if (!rightAttributes.includes(value)) {
          rightAttributes.push(value);
        }
      });
    }
  }

  return getDependencies(firstKey, rightAttributes, ++currentRuns, helpers);
}

function getCandidateKeys() {
  for (const [keyDepen] of functionalDependencies) {
    const rightAttributes = [];
    //first axiom
    keyDepen.forEach((key) => {
      rightAttributes.push(key);
    });

    getDependencies(keyDepen, rightAttributes, 0);
  }
}

getCandidateKeys();

function filterPrimaryKeys() {
  PRIMARY_KEYS.sort((a, b) => a.length - b.length);
  const MIN_KEY_SIZE = PRIMARY_KEYS[0].length;

  return PRIMARY_KEYS.filter((key) => key.length == MIN_KEY_SIZE);
}

console.log(filterPrimaryKeys());
