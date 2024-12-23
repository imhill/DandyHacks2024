export function GenerateTable({data, remove=false}){
    //create the table object
    const table = document.createElement('table');

    //create the head
    const tableHeader = table.createTHead();
    const headerRow = tableHeader.insertRow();

    //iterate through the keys, making them the column titles for the table
    for (const key in data[0]) {
        const headerCell = document.createElement("th");
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    }

    //create the body
    const tableBody = table.createTBody();

    //iterate through the rows
    for (const rowData of data) {
        const row = tableBody.insertRow();

        //within each row, add the data
        for (const key in rowData) {
            const cell = row.insertCell();
            cell.textContent = rowData[key];
            if(remove){
                const removeFriendButton = document.createElement("span");
                removeFriendButton.classList = "removeFriendButton";
                removeFriendButton.innerHTML = "&times;";
                cell.appendChild(removeFriendButton);
            }
        }
    }

    //come on now you know what this is
    return table;
}
