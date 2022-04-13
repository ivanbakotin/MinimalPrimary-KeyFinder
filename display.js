import { TABLE, funcdep1, funcdep2 } from "./constants.js";
import { Candidate } from "./algorithm.js";

const tables = [];
tables.push(new Candidate(TABLE, funcdep1, []));
tables.push(new Candidate(TABLE, funcdep2, []));

const TABLES_DIV = document.querySelector(".tables");

function createContainers() {
  tables.forEach((table) => {
    console.log(table.MINIMAL_KEYS);
    const TABLE_DIV = document.createElement("DIV");
    TABLES_DIV.appendChild(TABLE_DIV);

    const TABLE_TABLE = document.createElement("DIV");
    TABLE_DIV.appendChild(TABLE_TABLE);

    table.TABLE.forEach((elem) => {
      const TABLE_ELEM = document.createElement("DIV");
      TABLE_ELEM.textContent = elem;
      TABLE_TABLE.appendChild(TABLE_ELEM);
    });

    const TABLE_FUNC = document.createElement("DIV");
    TABLE_DIV.appendChild(TABLE_FUNC);

    //table.dependencies.forEach((elem) => {
    //  const TABLE_ELEM = document.createElement("DIV");
    //  TABLE_ELEM.textContent = elem;
    //  TABLE_FUNC.appendChild(TABLE_ELEM);
    //});
  });
}

createContainers();
