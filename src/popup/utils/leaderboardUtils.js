import {GetUsername} from "./getUsername.js";

export async function GetLeaderboard() {
    // Get title slug
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
    const tabUrl = tab.url;
    const slugRegex = /.*?leetcode.com\/problems\/(.*?)\/(.*)?/;
    const result = slugRegex.exec(tabUrl);

    const slug = result[1];

    //function to convert the titleSlug to the longest string of words under 50 characters without splitting a word
    const fullTitleSlug = slug;
    let constrainedTitleSlug = "";

    let truncatedTitle = false;

    //I do know there is definitely a better faster way to do this but I'm trying to solve the problem first
    if(fullTitleSlug.length > 50){
      const titleSlugWords = fullTitleSlug.split("-");

      constrainedTitleSlug = titleSlugWords[0];

      let currentCharLength = titleSlugWords[0].length;

      for(const word of titleSlugWords.slice(1)){
        if(currentCharLength<=49-word.length){
          constrainedTitleSlug += "-"+word;
          currentCharLength += word.length + 1;
        }else{
          break;
        }
      }
      truncatedTitle = true;
    } else {
      constrainedTitleSlug = fullTitleSlug;
    }
    
    // Get username
    const username = await GetUsername();
    
    // Send leaderboard request
    try {
        const leaderboardResponse = await fetch(`http://3.143.223.90:8000/get-problem-stats?username=${username}&titleSlug=${constrainedTitleSlug}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const boardData = await leaderboardResponse.json()
        return [boardData,truncatedTitle];
    } catch(err) {
        console.error(err)
    }
    return [[],truncatedTitle];
}
