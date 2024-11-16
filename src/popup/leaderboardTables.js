/*export function createLeaderboardFriendsTable(data) {
    let friendsLeaderboard = document.createElement("table");

    const headerRow = friendsLeaderboard.insertRow();
    for (const key in data[0]) {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = key;
    }

    for (const row of data) {
        cRow = friendsLeaderboard.insertRow();
        for (const key in row) {
            const cell = cRow.insertCell();
            cell.textContent = row[key];
        }
    }

    return friendsLeaderboard;
}
*/
