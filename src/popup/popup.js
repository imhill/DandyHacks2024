function switchTo(evt, tabName) {
    const leaderboardButton = document.getElementsById("leaderboardButton");
    const friendsButton = document.getElementsById("friendsButton");
    const challengesButton = document.getElementsById("challengesButton");

    leaderboardButton = addEventListener("click", function() { switchTab("leaderboard"); });
    friendsButton = addEventListener("click", function() { switchTab("friends"); });
    challengesButton = addEventListener("click", function() { switchTab("challenges"); });

    function switchTab(tab){
        switch tab{
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
