const friendsTable = document.getElementById("leaderboardTableFriends");
const communityTable = document.getElementById("leaderboardTableCommunity");

const headers = ["Name", "Runtime", "Space", "Problems"];
const names = ["ihill", "jtrokel", "lsciortino", "etock"];
const times = [40, 50, 20, 25];
const spaces = [4, 2, 10, 5];
const problems = [1, 2, 3, 4];
const rows = [["ihill", "40", "4", "1"], ["jtrokel", "50", "2", "2"]];

function generateTable() {
    let friendsBoard = document.createElement("table");

    for (let row of rows) {
        table.insertRow();
        for (let cell of row) {
            let newCell = table.rows[table.rows.length - 1].insertCell();

            newCell.textContent = cell;
        }
    }

    friendsTable.appendChild(friendsBoard);
}

generateTable();
