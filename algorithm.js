export class Candidate {
  constructor(table, dependencies, id) {
    this.id = id;
    this.TABLE = table;
    this.DEPENDENCIES = dependencies;
    this.MINIMAL_KEYS = [];
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

  filterMinimalKeys() {
    this.MINIMAL_KEYS.sort((a, b) => a.length - b.length);
    this.MINIMAL_KEYS = this.MINIMAL_KEYS.filter(
      (key) => key.length == this.MINIMAL_KEYS[0].length
    );
    return this.MINIMAL_KEYS.filter(
      (key) => key.length == this.MINIMAL_KEYS[0].length
    );
  }

  getCandidateKeys() {
    this.MINIMAL_KEYS = [];

    for (const [leftAttributes] of this.DEPENDENCIES) {
      const rightAttributes = [];

      leftAttributes.forEach((key) => {
        rightAttributes.push(key);
      });

      this.thirdAxiom(leftAttributes, rightAttributes, 0, []);
    }

    this.filterMinimalKeys();
  }
}
