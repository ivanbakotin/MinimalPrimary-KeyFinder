import { tables } from "./constants.js";
import { findIndexOfTable } from "./utils.js";

export function getKeysAndDisplayKeys(e) {
  const index = findIndexOfTable(tables, e.target.dataset.id);
  const keys = getKeys(index);
  displayKeys(keys, e);
}

function getKeys(table_id) {
  return tables[table_id].calculateMinimalKeys().MINIMAL_KEYS;
}

function getNf3(table_id, key) {
  return tables[table_id].decompositionTo3nf(key);
}

function displayKeys(keys, e) {
  let keysDiv = e.srcElement.nextSibling;
  const index = findIndexOfTable(tables, e.target.dataset.id);
  if (!keysDiv) {
    keysDiv = document.createElement("UL");
    e.srcElement.insertAdjacentElement("afterend", keysDiv);
  }

  keysDiv.innerHTML = "";

  keys.forEach((key) => {
    const keyNode = document.createElement("LI");
    keyNode.classList.add("tables__key");
    keyNode.addEventListener("click", () => {
      getNf3(index, key);
    });
    keyNode.textContent = key;
    keysDiv.appendChild(keyNode);
  });
}
