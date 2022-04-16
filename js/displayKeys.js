import { tables } from "./constants.js";

export function getKeysAndDisplayKeys(e) {
  const index = findTable(e.target.dataset.id);
  const keys = getKeys(index);
  displayKeys(keys, e);
}

function findTable(table_id) {
  for (let i = 0; i < tables.length; i++) {
    if (tables[i].id == table_id) {
      return i;
    }
  }
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
