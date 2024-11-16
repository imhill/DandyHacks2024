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
