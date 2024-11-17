import {GetUsername} from "./getUsername.js";

export async function GetLeaderboard() {
    // Get title slug
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
    const tabUrl = tab.url;
    const slugRegex = /.*?leetcode.com\/problems\/(.*?)\/sub.*/;
    const result = slugRegex.exec(tabUrl);

    const slug = result[1];
    
    // Get username
    const username = await GetUsername();
    
    // Send leaderboard request
    try {
        const leaderboardResponse = await fetch(`http://3.143.223.90:8000/get-problem-stats?username=${username}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titleSlug: slug
            })
        });
        console.log(leaderboardResponse);
    } catch(err) {
        console.error(err)
    }
    return [];
}
