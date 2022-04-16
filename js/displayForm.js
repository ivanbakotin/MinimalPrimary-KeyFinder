import { createTableContainer } from "./displayTables.js";
import { Candidate } from "./algorithm.js";
import { tables } from "./constants.js";

let counter = tables.length + 1;

export function displayInputEntities() {
  const entities = document.querySelector(".entities");
  const numEntities = document.querySelector("#num-entities").value;
  const btnEntities = document.querySelector("#btn-entities");

  for (let i = 0; i < numEntities; i++) {
    const inputNode = document.createElement("INPUT");
    inputNode.classList.add("entity");
    entities.insertBefore(inputNode, btnEntities);
  }
}

export function displayInputDependencies() {
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

export function setTable() {
  const entitiesMain = [];

  const entities = document.querySelectorAll(".entity");
  for (let i = 0; i < entities.length; i++) {
    entitiesMain.push(entities[i].value);
  }

  const dependenciesLeft = document.querySelectorAll(".left");
  const dependenciesRight = document.querySelectorAll(".right");
  const newMap = new Map();

  for (let i = 0; i < dependenciesLeft.length; i++) {
    const arrLeft = dependenciesLeft[i].value.split(",");
    const arrRight = dependenciesRight[i].value.split(",");
    newMap.set(arrLeft, arrRight);
  }

  tables.push(new Candidate(entitiesMain, newMap, counter));
  counter++;
  createTableContainer();
}
