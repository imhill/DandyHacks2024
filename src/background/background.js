const LEETCODE_BASE_URL = "leetcode.com";

chrome.webRequest.onCompleted.addListener(
  function (details) {
    // Log GraphQL requests
    if (details.url.includes("/graphql")) {
      console.log("GraphQL Request detected:");
      console.log("Request URL:", details.url);
    }
  },
  {
    urls: ["https://leetcode.com/*"], // Match all LeetCode URLs
    types: ["xmlhttprequest", "fetch"] // Monitor XHR and fetch requests
  }
);

//Check if URL contains "/submissions/detail/" & "/check/"

//Check if response has "state" == "SUCCESS" 

//increase total number of attempts

// and if "status_msg" == "Accepted"

//increaese successes

//make background green

//record "lang", "status_runtime", "status_memory"
