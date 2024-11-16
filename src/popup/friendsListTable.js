const friendsListTable = getElementById("friendsListTable");

const friends = ["Bob","Alice","Henry Cramer","etock"];

const tableHeaders = ["Name"];

function generateTable(){
    frienstListTable.innerHTML += `<tr>`;
    for(const h in tableHeaders){
        frienstListTable.innerHTML += `<th>${h}</th>`;
    }
    frienstListTable.innerHTML += `</tr>`;

    for(let i = 0); i < friends.length; i++){
        frienstListTable.innerHTML += `<tr>`;
        for(let j = 0; j < tableHeaders.length; j++){
            //not using j
            frienstListTable.innerHTML += `<tr>${friends[i]}</tr>`;
        }
        frienstListTable.innerHTML += `</tr>`;
    }
        
}

generateTable();
