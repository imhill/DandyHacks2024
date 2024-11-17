import {GenerateTable} from "./generateTable.js";

/*
 *    Switch between tabs
 */

//add the functions to the buttons
const leaderboardButton = document.getElementById("leaderboardButton");
leaderboardButton.addEventListener("click", switchToLeaderboard);
const friendsButton = document.getElementById("friendsButton");
friendsButton.addEventListener("click", switchToFriends);
const challengesButton = document.getElementById("challengesButton");
challengesButton.addEventListener("click", switchToChallenges);

const tabButtons = [leaderboardButton,friendsButton,challengesButton];

//define the function to switch to a given page
function switchToLeaderboard(){ switchTab("leaderboard"); }
function switchToFriends(){ switchTab("friends"); }
function switchToChallenges(){ switchTab("challenges"); }

//define the divs for each of the tabs
const leaderboardDiv = document.getElementById("leaderboard");
const friendsDiv = document.getElementById("friends");
const challengesDiv = document.getElementById("challenges");
//opening home page icon
const icon = document.getElementById("homeIcon");

//put all the divs for tabs in an array
const tabDivs = [leaderboardDiv,friendsDiv,challengesDiv,icon];

//function to hide all divs
function nukeDivs(divs,buttons){
    for(const d of divs){
        d.style.display = "none";
    }

    for(const b of buttons){
        b.className = "tabButton inactiveTab";
    }
}

//function that handles switching between tabs
function switchTab(tab){
    //fist clear all divs
    nukeDivs(tabDivs,tabButtons);

    //then depending on the argument, display the appropriate div
    switch(tab){
        case "leaderboard":
            leaderboardButton.className = "tabButton activeTab";
            leaderboardDiv.style.display = "block";
            break;
        case "friends":
            friendsDiv.style.display = "block";
            friendsButton.className = "tabButton activeTab";
            break;
        case "challenges":
            challengesDiv.style.display = "block";
            challengesButton.className = "tabButton activeTab";
            break;
    }
}

/*
 *    Create tables for each tab div
 */

//Friends tab friend list table
const friendsListTableDiv = document.getElementById("friendsListTableDiv");

const friendsListData = [
  { name: 'John', age: 30 },
  { name: 'Mary', age: 25 }];

//generate the table based on the data
const friendsListTable = GenerateTable(friendsListData);
friendsListTable.id = "friendsListTable";

//add it to the div
friendsListTableDiv.appendChild(friendsListTable);

//create the Leaderboard tab tables
const friendsTableDiv = document.getElementById("leaderboardFriendsTableDiv");
const communityTableDiv = document.getElementById("leaderboardCommunityTableDiv");

const fetchData = async () => {
  try {
    const response = await fetch('/get-challenge-leaderboard');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchData();

const friendLeaderboardData = [
    {name: "ihill", runtime: "40", memory: "4"},
    {name: "jtrokel", runtime: "50", memory: "2"}];

//generate the table with the data
const leaderboardFriendsTable = GenerateTable(friendLeaderboardData);
leaderboardFriendsTable.id = "leaderboardFriendsTable";

//add it to the div
friendsTableDiv.appendChild(leaderboardFriendsTable);
