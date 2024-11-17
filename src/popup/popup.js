import {GenerateTable} from "./generateTable.js";
import {AddFriend,GetFriends} from "./friendUtils.js";
import {GetLeaderboard} from "./leaderboardUtils.js";

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
//group buttons
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
//group divs
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

function formatFriendsList(friendList){
    const formattedList = []
    for(const friend of friendList){
        formattedList.push({User: friend});
    }
    return formattedList;
}

const rawFriendsList = await GetFriends();

const friendsListData = formatFriendsList(rawFriendsList.friends);

//generate the table based on the data
const friendsListTable = GenerateTable(friendsListData);
friendsListTable.id = "friendsListTable";

//add it to the div
friendsListTableDiv.appendChild(friendsListTable);


GetLeaderboard();




//create the Leaderboard tab tables
const friendsTableDiv = document.getElementById("leaderboardFriendsTableDiv");
const communityTableDiv = document.getElementById("leaderboardCommunityTableDiv");

/*const fetchData = async () => {
  try {
    const response = await fetch('http://3.143.223.90:8000/get-challenge-leaderboard?username=ezra');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Response data:', data);
    return (data);
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchData();*/

const friendLeaderboardData = [
    {User: "ihill", Runtime: "40", Memory: "4"},
    {User: "jtrokel", Runtime: "50", Memory: "2"}];

//generate the table with the data
const leaderboardFriendsTable = GenerateTable(friendLeaderboardData);
leaderboardFriendsTable.id = "leaderboardFriendsTable";

//add it to the div
friendsTableDiv.appendChild(leaderboardFriendsTable);

//add a friend
const addFriendButton = document.getElementById("addFriendButton");
const searchBarTextbox = document.getElementById("searchBarTextBox");
addFriendButton.addEventListener("click", sendFriendReq);


function sendFriendReq() {
    const friendToAdd = searchBarTextbox.value;
    console.log(friendToAdd);
    AddFriend(friendToAdd);
}

//create the Challenge tab tables
const activeChallengesTableDiv = document.getElementById("activeChallengesTableDiv");
const previousChallengesDiv = document.getElementById("previousChallengesTableDiv");

const activeChallengesData = [
    {User: "lscortino", Question: "1", Expires: "8pm, 11/19/24"},
    {User: "jtrokel", Question: "735", Expires: "6pm, 11/20/24"}];

const previousChallengesData = [
    {User: "etock", Question: "1738", Winner: "ihill"},
    {User: "jtrokel", Question: "542", Winner: "jtrokel"}];

//generate the table with the data
const activeChallengesTable = GenerateTable(activeChallengesData);
leaderboardFriendsTable.id = "leaderboardFriendsTable";
const previousChallengesTable = GenerateTable(previousChallengesData);
leaderboardFriendsTable.id = "leaderboardFriendsTable";

//add it to the div
activeChallengesTableDiv.appendChild(activeChallengesTable);
previousChallengesDiv.appendChild(previousChallengesTable);
