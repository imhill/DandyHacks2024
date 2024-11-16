function switchTo(evt, tabName) {
    const leaderboardButton = document.getElementsById("leaderboardButton");
    const friendsButton = document.getElementsById("friendsButton");
    const challengesButton = document.getElementsById("challengesButton");

    leaderboardButton = addEventListener("click", switchToLeaderboard);
    friendsButton = addEventListener("click", switchToFriends);
    challengesButton = addEventListener("click", switchToChallenges);

    function switchToLeaderboard(){
        switchTab("leaderboard");
    }

    function switchToFriends(){
        switchTab("friends");
    }

    function switchToChallenges(){
        switchTab("challenges");
    }

    //const leaderboardDiv = document.getElementsById("leaderboard");
    //const friendsDiv = document.getElementsById("friends");
    //const challengesDiv = document.getElementsById("challenges");

    function switchTab(tab){
        switch(tab){
            case "leaderboard":
                console.log("L");
                break
            case "freinds":
                console.log("F");
                break
            case "challenges":
                console.log("C");
                break
        }
    }
    
    var tabcontent = document.getElementsByClassName("tabcontent");

    for (tab of tabcontent) { 
        tab.style.display = "none";
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
