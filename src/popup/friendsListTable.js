const friendsListTableDiv = document.getElementById("friendsListTableDiv");

const friends = ["Bob","Alice","Henry Cramer","etock"];
const streaks = ["0","2","-5","3"];

const tableHeaders = ["Name","Streak"];

const columns = [friends,streaks];

function createTable(data) {
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

// Example data
const data = [
  { name: 'John', age: 30 },
  { name: 'Mary', age: 25 }
];

// Create the table and append it to the DOM
const table = createTable(data);
friendsListTableDiv.appendChild(table);
