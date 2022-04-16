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

function displayKeys(keys, e) {
  let keysDiv = e.srcElement.nextSibling;

  if (!keysDiv) {
    keysDiv = document.createElement("UL");
    e.srcElement.insertAdjacentElement("afterend", keysDiv);
  }

  keysDiv.innerHTML = "";

  keys.forEach((key) => {
    const keyNode = document.createElement("LI");
    keyNode.classList.add("tables__key");
    keyNode.textContent = key;
    keysDiv.appendChild(keyNode);
  });
}
