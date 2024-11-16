const friendsListTable = document.getElementById("friendsListTable");

const friends = ["Bob","Alice","Henry Cramer","etock"];
const streaks = ["0","2","-5","3"];

const tableHeaders = ["Name","Streak"];

const columns = [friends,streaks];



function generateTable(){
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
        
}

generateTable();
