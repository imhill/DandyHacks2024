const friendsListTableDiv = document.getElementById("friendsListTableDiv");
/*
const friends = ["Bob","Alice","Henry Cramer","etock"];
const streaks = ["0","2","-5","3"];

const tableHeaders = ["Name","Streak"];

const columns = [friends,streaks];



function generateTable(){
    friendsListTable.innerHTML += `<table id="friendsListTable">`;
    friendsListTable.innerHTML += `<tr>`;
    for(const h of tableHeaders){
        friendsListTable.innerHTML += `<th>${h}</th>`;
    }
    friendsListTable.innerHTML += `</tr>`;

    for(let i = 0; i < friends.length; i++){
        friendsListTable.innerHTML += `<tr>`;
        for(let j = 0; j < tableHeaders.length; j++){
            friendsListTable.innerHTML += `<td>${columns[j][i]}</td>`;
        }
        friendsListTable.innerHTML += `</tr>`;
    }
    friendsListTable.innerHTML += `</table>`;
}

generateTable();
*/

//setup our table array
var tableArr = [
  ["row 1, cell 1", "row 1, cell 2"],
  ["row 2, cell 1", "row 2, cell 2"]
]

//create a Table Object
let table = document.createElement('table');
//iterate over every array(row) within tableArr
for (let row of tableArr) {
//Insert a new row element into the table element
  table.insertRow();
//Iterate over every index(cell) in each array(row)
  for (let cell of row) {
//While iterating over the index(cell)
//insert a cell into the table element
    let newCell = table.rows[table.rows.length - 1].insertCell();
//add text to the created cell element
    newCell.textContent = cell;
  }
}
//append the compiled table to the DOM
friendsListTableDiv.appendChild(table);
