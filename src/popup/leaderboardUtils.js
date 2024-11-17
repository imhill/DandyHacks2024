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

    const titleSlug = result[1];
    
    // Get username
    const username = await GetUsername();
    
    // Send leaderboard request
    console.log("slug, name, ", titleSlug, username);

}
