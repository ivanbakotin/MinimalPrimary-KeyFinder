import { tables } from "./constants.js";
import { Candidate } from "./algorithm.js";

const CONTAINER = document.querySelector(".tables");

let counter = 7;

function createContainer() {
  CONTAINER.innerHTML = "";

  tables.forEach((table) => {
    const TABLE_DIV = document.createElement("DIV");
    CONTAINER.appendChild(TABLE_DIV);

    const ENTITIES = document.createElement("DIV");
    TABLE_DIV.appendChild(ENTITIES);

    table.TABLE.forEach((entity) => {
      ENTITIES.textContent += entity + ",";
    });

    const DEPENDENCIES = document.createElement("DIV");
    TABLE_DIV.appendChild(DEPENDENCIES);

    for (const [key, value] of table.DEPENDENCIES) {
      const DEPENDENCY = document.createElement("DIV");
      DEPENDENCY.textContent = `${key}-->${value}`;
      DEPENDENCIES.appendChild(DEPENDENCY);
    }

    const SET_BUTTON = document.createElement("BUTTON");
    SET_BUTTON.textContent = "GET KEYS";
    SET_BUTTON.dataset.id = table.id;
    TABLE_DIV.appendChild(SET_BUTTON);
    SET_BUTTON.addEventListener("click", getKeysAndDisplayKeys);
  });
}

function getKeys(table_id) {
  let index = -1;

  for (let i = 0; i < tables.length; i++) {
    if (tables[i].id == table_id) {
      index = i;
      break;
    }
  }

  tables[index].getCandidateKeys();

  return tables[index].MINIMAL_KEYS;
}

function displayKeys(keys, e) {
  keys.forEach((key) => {
    e.srcElement.insertAdjacentHTML("afterend", "<div>" + key + "</div>");
  });
}

function getKeysAndDisplayKeys(e) {
  const keys = getKeys(e.target.dataset.id);
  displayKeys(keys, e);
}

createContainer();

let entitiesMain = [];

const btnNumEntites = document.querySelector("#btn-entities-num");
btnNumEntites.addEventListener("click", displayInputEntities);

function displayInputEntities(e) {
  const entities = document.querySelector(".entities");
  const numEntities = document.querySelector("#num-entities").value;
  const btnEntities = document.querySelector("#btn-entities");

  for (let i = 0; i < numEntities; i++) {
    const inputNode = document.createElement("INPUT");
    inputNode.classList.add("entity");
    entities.insertBefore(inputNode, btnEntities);
  }
}

const btnEntities = document.querySelector("#btn-entities");
btnEntities.addEventListener("click", setEntities);

function setEntities() {
  const entities = document.querySelectorAll(".entity");
  for (let i = 0; i < entities.length; i++) {
    entitiesMain.push(entities[i].value);
  }
}

const btnNumDependencies = document.querySelector("#btn-dependencies-num");
btnNumDependencies.addEventListener("click", displayInputDependencies);

function displayInputDependencies(e) {
  const dependencies = document.querySelector(".dependencies");
  const numDependencies = document.querySelector("#num-dependencies").value;
  const btnDependencies = document.querySelector("#btn-dependencies");

  for (let i = 0; i < numDependencies; i++) {
    const div = document.createElement("DIV");
    dependencies.insertBefore(div, btnDependencies);

    const inputNodeLeft = document.createElement("INPUT");
    inputNodeLeft.classList.add("left");
    const inputNodeRight = document.createElement("INPUT");
    inputNodeRight.classList.add("right");

    div.appendChild(inputNodeLeft);
    div.append(" --> ");
    div.appendChild(inputNodeRight);
  }
}

const btnDependencies = document.querySelector("#btn-dependencies");
btnDependencies.addEventListener("click", setDependencies);

function setDependencies() {
  const dependenciesLeft = document.querySelectorAll(".left");
  const dependenciesRight = document.querySelectorAll(".right");
  const newMap = new Map();

  for (let i = 0; i < dependenciesLeft.length; i++) {
    const arrLeft = dependenciesLeft[i].value.split(",");
    const arrRight = dependenciesRight[i].value.split(",");
    newMap.set(arrLeft, arrRight);
  }

  setTable(newMap);
}

function setTable(newMap) {
  tables.push(new Candidate(entitiesMain, newMap, counter));
  counter++;
  createContainer();
}
