const friendsTable = document.getElementById("leaderboardTableFriends");
const communityTable = document.getElementById("leaderboardTableCommunity");

const headers = ["Name", "Runtime", "Space", "Problems"];
const names = ["ihill", "jtrokel", "lsciortino", "etock"];
const times = [40, 50, 20, 25];
const spaces = [4, 2, 10, 5];
const problems = [1, 2, 3, 4];
const columns = [names, times, spaces, problems];

function generateTables() {
    friendsTable.innerHTML += "<tr>";
    for(const h of headers) {
        friendsTable.innerHTML += `<th>${h}</th>`;
    }
    friendsTable.innerHTML += "</tr>";

    for(let i = 0; i < names.length; i++) {
        friendsTable.innerHTML += "<tr>";

        for(let j = 0; j < columns.length; j++) {
            friendsTable.innerHTML += `<td>${columns[j][i]}</td>`;
        }

        friendsTable.innerHTML += "</tr>";
    }
}

generateTables();
