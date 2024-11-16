// import table building functions
import {createFriendsListTable} from "friendsListTable.js";
//import {} from "leaderboardTables.js";

// Switching tabs

const leaderboardButton = document.getElementById("leaderboardButton");
const friendsButton = document.getElementById("friendsButton");
const challengesButton = document.getElementById("challengesButton");

leaderboardButton.addEventListener("click", switchToLeaderboard);
friendsButton.addEventListener("click", switchToFriends);
challengesButton.addEventListener("click", switchToChallenges);

function switchToLeaderboard(){
    switchTab("leaderboard");
}

function switchToFriends(){
    switchTab("friends");
}

function switchToChallenges(){
    switchTab("challenges");
}

const leaderboardDiv = document.getElementById("leaderboard");
const friendsDiv = document.getElementById("friends");
const challengesDiv = document.getElementById("challenges");

const icon = document.getElementById("homeIcon");

const tabDivs = [leaderboardDiv,friendsDiv,challengesDiv,icon]

function nukeDivs(divs){
    for(const d of divs){
        d.style.display = "none";
    }
}

function switchTab(tab){
    nukeDivs(tabDivs)
    
    switch(tab){
        case "leaderboard":
            leaderboardDiv.style.display = "block";
            break
        case "friends":
            friendsDiv.style.display = "block";
            break
        case "challenges":
            challengesDiv.style.display = "block";
            break
    }

    //build friends table
    const friendsListTableDiv = document.getElementById("friendsListTableDiv");
    
    // Example data
    const data = [
      { name: 'John', age: 30 },
      { name: 'Mary', age: 25 }
    ];
    
    // Create the table and append it to the DOM
    const table = createFriendsListTable(data);
    table.id = "friendsListTable";
    friendsListTableDiv.appendChild(table);
}
