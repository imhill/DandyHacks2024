const friendsListTable = getElementById("friendsListTable");

const friends = ["Bob","Alice","Henry Cramer","etock"];

const tableHeaders = ["Name"];

function generateTable(){
    friendsListTable.innerHTML += `<tr>`;
    for(const h in tableHeaders){
        friendsListTable.innerHTML += `<th>${h}</th>`;
    }
    friendsListTable.innerHTML += `</tr>`;

    for(let i = 0; i < friends.length; i++){
        friendsListTable.innerHTML += `<tr>`;
        for(let j = 0; j < tableHeaders.length; j++){
            //not using j
            friendsListTable.innerHTML += `<tr>${friends[i]}</tr>`;
        }
        friendsListTable.innerHTML += `</tr>`;
    }
        
}

generateTable();
