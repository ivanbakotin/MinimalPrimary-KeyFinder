export function findIndexOfTable(tables, table_id) {
  for (let i = 0; i < tables.length; i++) {
    if (tables[i].id == table_id) {
      return i;
    }
  }
}
