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

//#const leaderboardDiv = document.getElementsById("leaderboard");
//#const friendsDiv = document.getElementsById("friends");
//#const challengesDiv = document.getElementsById("challenges");

const tabDivs = []

function switchTab(tab){
    switch(tab){
        case "leaderboard":
            console.log("L");
            break
        case "friends":
            console.log("F");
            break
        case "challenges":
            console.log("C");
            break
    }
}
