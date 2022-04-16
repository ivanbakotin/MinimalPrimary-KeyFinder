import { createTableContainer } from "./displayTables.js";
import {
  displayInputDependencies,
  displayInputEntities,
  setTable,
} from "./displayForm.js";

createTableContainer();

document
  .querySelector("#btn-entities-num")
  .addEventListener("click", displayInputEntities);

document
  .querySelector("#btn-dependencies-num")
  .addEventListener("click", displayInputDependencies);

document.querySelector("#btn-submit").addEventListener("click", setTable);
