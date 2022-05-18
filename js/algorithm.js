export class Candidate {
  constructor(table, dependencies, id) {
    this.id = id;
    this.TABLE = table;
    this.DEPENDENCIES = dependencies;
    this.MINIMAL_KEYS = [];
    this.nf3 = [];
  }

  expandKey(firstKey, rightAttributes, helpers) {
    for (let i = 0; i < this.TABLE.length; i++) {
      if (!rightAttributes.includes(this.TABLE[i])) {
        const newHelpers = [...helpers, this.TABLE[i]];
        const newAttributes = [...rightAttributes, this.TABLE[i]];

        this.thirdAxiom(firstKey, newAttributes, 0, newHelpers);
      }
    }
  }

  check3rdAxiom(leftAttributes, rightAttributes) {
    return leftAttributes.every((key) => {
      return rightAttributes.indexOf(key) !== -1;
    });
  }

  thirdAxiom(firstKey, rightAttributes, currentRuns, helpers) {
    if (this.TABLE.length === rightAttributes.length) {
      this.MINIMAL_KEYS.push([...firstKey, ...helpers]);
      return;
    }

    if (rightAttributes.length == currentRuns) {
      return this.expandKey(firstKey, rightAttributes, helpers);
    }

    for (const [leftDependency, rightDependency] of this.DEPENDENCIES) {
      if (this.check3rdAxiom(leftDependency, rightAttributes)) {
        rightDependency.forEach((value) => {
          if (!rightAttributes.includes(value)) {
            rightAttributes.push(value);
          }
        });
      }
    }

    return this.thirdAxiom(firstKey, rightAttributes, ++currentRuns, helpers);
  }

  removeDuplicates() {
    for (let i = 0; i < this.MINIMAL_KEYS.length; i++) {
      for (let j = 0; j < this.MINIMAL_KEYS.length; j++) {
        if (i === j) {
          continue;
        }

        let keyCounter = 0;

        this.MINIMAL_KEYS[i]?.forEach((key) => {
          if (this.MINIMAL_KEYS[j].includes(key)) {
            keyCounter++;
          }
        });

        if (keyCounter == this.MINIMAL_KEYS[j].length) {
          this.MINIMAL_KEYS.splice(j, 1);
          i = 0;
        }
      }
    }
  }

  filterMinimalKeys() {
    const MIN_LENGTH = this.MINIMAL_KEYS.reduce((prev, next) =>
      prev.length > next.length ? next : prev
    );

    this.MINIMAL_KEYS = this.MINIMAL_KEYS.filter(
      (key) => key.length == MIN_LENGTH.length
    );

    this.removeDuplicates();
  }

  calculateMinimalKeys() {
    this.MINIMAL_KEYS = [];

    for (const [leftAttributes] of this.DEPENDENCIES) {
      const rightAttributes = [];

      leftAttributes.forEach((key) => {
        rightAttributes.push(key);
      });

      this.thirdAxiom(leftAttributes, rightAttributes, 0, []);
    }

    this.filterMinimalKeys();

    return this;
  }

  checkIfIn(string) {
    for (const dep of this.nf3) {
      let i = 0;
      for (const letter of string) {
        if (dep.includes(letter)) {
          i++;
        }
      }
      if (i == string.length) {
        return false;
      }
    }
    return true;
  }

  joinArray(array) {
    let joinedKey = "";

    for (const k of array) {
      if (k != ",") {
        joinedKey += k;
      }
    }

    return joinedKey;
  }

  decompositionTo3nf(key) {
    this.nf3 = [];
    let joinedKey = this.joinArray(key);

    for (const [left, right] of this.DEPENDENCIES) {
      const new_dep = this.joinArray(left + right);
      if (this.checkIfIn(new_dep)) {
        this.nf3.push(new_dep);
      }
    }

    if (this.checkIfIn(joinedKey)) {
      this.nf3.push(joinedKey);
    }
    console.log(this.nf3);
    return this.nf3;
  }
}
