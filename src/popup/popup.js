// import table building functions
//import {createFriendsListTable} from "./friendsListTable.js";
//import {createLeaderboardFriendsTable, } from "./leaderboardTables.js";
import {GenerateTable} from "./generateTable.js";

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
}

//create the friends table
const friendsListTableDiv = document.getElementById("friendsListTableDiv");

const friendsListData = [
  { name: 'John', age: 30 },
  { name: 'Mary', age: 25 }];

const friendsListTable = GenerateTable(friendsListData);
friendsListTable.id = "friendsListTable";
friendsListTableDiv.appendChild(friendsListTable);

//create the leaderboard tables
const friendsTableDiv = document.getElementById("leaderboardFriendsTableDiv");
const communityTableDiv = document.getElementById("leaderboardCommunityTableDiv");

const friendLeaderboardData = [
    {name: "ihill", runtime: "40", memory: "4"},
    {name: "jtrokel", runtime: "50", memory: "2"}];

const leaderboardFriendsTable = GenerateTable(friendLeaderboardData);
leaderboardFriendsTable.id = "leaderboardFriendsTable";
friendsTableDiv.appendChild(leaderboardFriendsTable);
