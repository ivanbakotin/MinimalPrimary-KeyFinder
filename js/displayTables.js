import { tables } from "./constants.js";
import { getKeysAndDisplayKeys } from "./displayKeys.js";
//delete button
export function createTableContainer() {
  const CONTAINER = document.querySelector(".tables");

  CONTAINER.innerHTML = "";

  tables.forEach((table) => {
    // add if to not render already on screen
    const TABLE_DIV = document.createElement("DIV");
    TABLE_DIV.classList.add("tables__table");
    CONTAINER.appendChild(TABLE_DIV);

    const ENTITIES = createEntities(table.TABLE);
    TABLE_DIV.appendChild(ENTITIES);

    const DEPENDENCIES = document.createElement("UL");
    DEPENDENCIES.classList.add("table__dependencies");
    TABLE_DIV.appendChild(DEPENDENCIES);

    for (const [key, value] of table.DEPENDENCIES) {
      const DEPENDENCY = createDependency(key, value);
      DEPENDENCIES.appendChild(DEPENDENCY);
    }

    createDelButton(TABLE_DIV, table.id);
    createGetButton(TABLE_DIV, table.id);
  });
}

function deleteTable() {}

function createDelButton(container, table_id) {
  const DEL_BUTTON = document.createElement("BUTTON");
  DEL_BUTTON.classList.add("tables__btn-del");
  DEL_BUTTON.textContent = "DELETE";
  DEL_BUTTON.dataset.id = table_id;
  DEL_BUTTON.addEventListener("click", deleteTable);
  container.appendChild(DEL_BUTTON);
}

function createGetButton(container, table_id) {
  const SET_BUTTON = document.createElement("BUTTON");
  SET_BUTTON.classList.add("tables__btn-get");
  SET_BUTTON.textContent = "GET KEYS";
  SET_BUTTON.dataset.id = table_id;
  SET_BUTTON.addEventListener("click", getKeysAndDisplayKeys);
  container.appendChild(SET_BUTTON);
}

function createEntities(table) {
  const ENTITIES = document.createElement("DIV");
  ENTITIES.classList.add("tables__entities");
  ENTITIES.textContent = table;
  return ENTITIES;
}

function createDependency(key, value) {
  const DEPENDENCY = document.createElement("LI");
  DEPENDENCY.classList.add("tables__dependency");
  DEPENDENCY.textContent = `${key}-->${value}`;
  return DEPENDENCY;
}
