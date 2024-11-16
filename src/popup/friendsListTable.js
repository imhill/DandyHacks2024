export function createFriendsListTable(data) {
  const table = document.createElement('table');

  // Create table header
  const headerRow = table.insertRow();
  for (const key in data[0]) {
    const headerCell = headerRow.insertCell();
    headerCell.textContent = key;
  }

  // Create table rows
  for (const rowData of data) {
    const row = table.insertRow();
    for (const key in rowData) {
      const cell = row.insertCell();
      cell.textContent = rowData[key];
    }
  }

  return table;
}
