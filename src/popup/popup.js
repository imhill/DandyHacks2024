import {GenerateTable} from "./generateTable.js";
import {AddFriend,RemoveFriend,GetFriends} from "./friendUtils.js";
import {GetLeaderboard} from "./leaderboardUtils.js";
import {GetUsername} from "./getUsername.js";
import {HideDeleteConfirmationModal} from "./additionalUtils.js";

/*
 *    Display the username of the currently signed in user
 */

const userSignedInBox = document.getElementById("userSignedIn");
const usernameText = document.getElementById("usernameText");

//this is just to test the functionality and placeholder for styling
usernameText.textContent = "TEST_USER";

/*
 *    Switch between tabs
 */

/* define the buttons */
const leaderboardButton = document.getElementById("leaderboardButton");
const friendsButton = document.getElementById("friendsButton");
const challengesButton = document.getElementById("challengesButton");

/* add function to each button */
leaderboardButton.addEventListener("click", switchToLeaderboard);
friendsButton.addEventListener("click", switchToFriends);
challengesButton.addEventListener("click", switchToChallenges);

/* create array with all buttons */
const tabButtons = [leaderboardButton,
                    friendsButton,
                    challengesButton,
                ];

/* define the functions to switch to a given page */
function switchToLeaderboard(){ switchTab("leaderboard"); }
function switchToFriends(){ switchTab("friends"); }
function switchToChallenges(){ switchTab("challenges"); }

//define the divs for each of the tabs
const leaderboardDiv = document.getElementById("leaderboard");
const friendsDiv = document.getElementById("friends");
const challengesDiv = document.getElementById("challenges");

/* define the home page icon */
const icon = document.getElementById("homeIcon");

/* create an array with all of the tab divs and home icon */
const tabDivs = [leaderboardDiv,
                friendsDiv,
                challengesDiv,
                icon,
            ];


/*
 *    Create tables for each tab div
 */

/* define the tables */
const friendsListTableDiv = document.getElementById("friendsListTableDiv");
const leaderboardTableDiv = document.getElementById("leaderboardFriendsTableDiv");
const activeChallengesTableDiv = document.getElementById("activeChallengesTableDiv");

/* define the title above the leaderboard */
const leaderboardTitle = document.getElementById("leaderboardTitle");

/* define the search bar */
const searchBarTextbox = document.getElementById("searchBarTextBox");

/* define buttons for adding and removing friends */
const addFriendButton = document.getElementById("addFriendButton");
const deleteConfirmationConfirmButton = document.getElementById("deleteConfirmationModalConfirmButton");
const deleteConfirmationCloseButton = document.getElementById("deleteConfirmationModalCancelButton");

/* define the friend deletion modal divs */
const deleteConfirmationModal = document.getElementById("deleteConfirmationModal");
const deleteConfirmationModalContent = document.getElementById("deleteConfirmationModalContent");
const deleteConfirmationUsername = document.getElementById("deleteConfirmationModalUsername");

/* allow clicking away from the modal to close it */
deleteConfirmationModalContent.addEventListener("click",(event) => {event.stopPropagation();});
deleteConfirmationModal.addEventListener("click",HideDeleteConfirmationModal);

/* add function to each of the buttons */
addFriendButton.addEventListener("click", sendFriendReq);
deleteConfirmationCloseButton.addEventListener("click",HideDeleteConfirmationModal);
deleteConfirmationConfirmButton.addEventListener("click",removeFriend);

/* create array with all the table divs */
const tableDivs = [friendsListTableDiv,
                leaderboardTableDiv,
                activeChallengesTableDiv,
            ];

/* function that formats the raw friend data so it can be displayed in a table */
function formatFriendsList(friendList){
    const formattedList = []

    for(const friend of friendList){
        formattedList.push({User: friend});
    }

    return formattedList;
}

/* function that formats the raw leaderboard data so it can be displayed in a table */
function formatLeaderboardData(leaderboardData){
    const problemTitleWords = leaderboardData[0].problem_number.split("-");

    for (let i = 0; i < problemTitleWords.length; i++) {
        problemTitleWords[i] = String(problemTitleWords[i]).charAt(0).toUpperCase() + String(problemTitleWords[i]).slice(1);
    }

    /* update the title of the leaderboard with the formatted problem title */
    leaderboardTitle.textContent = problemTitleWords.join(" ");
    
    const formattedList = [];
    let place = 1;

    for (const row of leaderboardData) {
        formattedList.push({
            "#": String(place++)+".",
            User: row.username,
            Runtime: String(row.runtime) + " ms",
            Memory: String((row.space / 1000000).toFixed(2)) + " MB"
        });
    }

    return formattedList;
}

/* need to implement */
function formatChallengeData(){
    const formattedList = [];

    return formattedList;
}

async function buildFriendsTab(){
    //Friends tab friend list table
    
    //get the raw data from the endpoint
    const rawFriendsList = await GetFriends();
    
    //format the raw data
    //const friendsListData = formatFriendsList(rawFriendsList.friends);
    const friendsListData = [
                            {User: "Jacob"},
                            {User: "Ian"},
                            {User: "Leo"},
                            {User: "Ezra"},
                        ];
    
    //generate the table based on the data
    const friendsListTable = GenerateTable({data:friendsListData, remove:true});
    friendsListTable.id = "friendsListTable";
    
    //add it to the div
    friendsListTableDiv.appendChild(friendsListTable);
}

function sendFriendReq() {
    const friendToAdd = searchBarTextbox.value;
    AddFriend(friendToAdd);
    searchBarTextbox.value = "";
}

function removeFriend() {
    const enemyToRemove = deleteConfirmationUsername.textContent;
    RemoveFriend(enemyToRemove);
    HideDeleteConfirmationModal();
    searchBarTextbox.value = "";
}

async function buildLeaderboardTab(){
    //create the Leaderboard tab tables

    //get the raw data from the endpoint
    const rawLeaderboard = await GetLeaderboard();
    
    //const communityTableDiv = document.getElementById("leaderboardCommunityTableDiv");
    
    //format the raw data
    const friendLeaderboardData = formatLeaderboardData(rawLeaderboard);
    
    //generate the table with the data
    const leaderboardFriendsTable = GenerateTable({data:friendLeaderboardData});
    leaderboardFriendsTable.id = "leaderboardFriendsTable";
    
    //add it to the div
    leaderboardTableDiv.appendChild(leaderboardFriendsTable);
}

/* */
// to be implemented!
/* */
async function buildChallengesTab(){
    //create the challenges tab tables

    //need to define GetChallenges function/helper file
    //const rawChallengeData = await GetChallenges();

    //format the data
    //const activeChallengesData = formatChallengeData(rawChallengeData);

    //temporary hard-coded data for testing
    const activeChallengesData = [
        {User: "lscortino", Question: "1", Expires: "8pm, 11/19/24"},
        {User: "jtrokel", Question: "735", Expires: "6pm, 11/20/24"},
        {User: "etock", Question: "1738", Expires: "2pm, 12/26/24"},
    ];

    //generate the table with the formatted data
    const activeChallengesTable = GenerateTable({data: activeChallengesData});
    activeChallengesTable.id = "activeChallengesTable";

    //add it to the div
    activeChallengesTableDiv.appendChild(activeChallengesTable);
}

//function to hide all divs
function nukeDivs(divs,buttons){
    for(const div of divs){
        div.style.display = "none";
    }
    for(const btn of buttons){
        btn.className = "tabButton inactiveTab";
    }
    for(const tableDiv of tableDivs){
        tableDiv.innerHTML = "";
    }
}

//function that handles switching between tabs
async function switchTab(tab){
    //fist clear all divs
    nukeDivs(tabDivs,tabButtons);

    //then depending on the argument, display the appropriate div
    switch(tab){
        case "leaderboard":
            leaderboardButton.className = "tabButton activeTab";
            leaderboardDiv.style.display = "block";
            buildLeaderboardTab();
            break;
        case "friends":
            friendsButton.className = "tabButton activeTab";
            friendsDiv.style.display = "block";
            buildFriendsTab();
            break;
        case "challenges":
            challengesDiv.style.display = "block";
            challengesButton.className = "tabButton activeTab";
            buildChallengesTab();
            break;
    }
}
