const friendsTable = document.getElementById("leaderboardTableFriends");
const communityTable = document.getElementById("leaderboardTableCommunity");

const friendData = [
    {name: "ihill", runtime: "40", memory: "4"},
    {name: "jtrokel", runtime: "50", memory: "2"}
]

function generateTable(data) {
    let friendsBoard = document.createElement("table");

    const headerRow = friendsBoard.insertRow();
    for (const key in data[0]) {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = key;
    }

    for (const row of rows) {
        cRow = friendsBoard.insertRow();
        for (const key of row) {
            const cell = row.insertCell();
            cell.textContent = row[key];
        }
    }

    return friendsBoard;
}

fBoard = generateTable(friendData);
friendsTable.appendChild(fBoard);
