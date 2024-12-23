import {ShowDeleteConfirmationModal} from "./additionalUtils.js";

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

    let rowNumber = 0;

    //iterate through the rows
    for (const rowData of data) {
        const row = tableBody.insertRow();

        let cellNumber = 0;

        //within each row, add the data
        for (const key in rowData) {
            const cell = row.insertCell();
            cell.textContent = rowData[key];
            cell.id = `row${rowNumber}.cell${cellNumber}`;
            if(remove){
                const removeFriendButton = document.createElement("span");
                removeFriendButton.classList = "removeFriendButton";
                removeFriendButton.id = `row${rowNumber}`;
                removeFriendButton.innerHTML = "&times;";
                removeFriendButton.rowNumber = rowNumber;
                removeFriendButton.username = rowData[key];
                removeFriendButton.addEventListener("click",deleteConfirmation);
                cell.appendChild(removeFriendButton);
            }

            cellNumber++;
        }

        rowNumber++;
    }

    //come on now you know what this is
    return table;
}

function deleteConfirmation(event){
    const username = event.currentTarget.username;

    ShowDeleteConfirmationModal(username);
}
