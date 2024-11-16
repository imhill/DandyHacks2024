const LEETCODE_BASE_URL = "leetcode.com";

chrome.webRequest.onCompleted.addListener(
  function (details) {
    // Check if the URL contains "graphql" (common in GraphQL APIs)
    if (details.url.includes("/graphql")) {
      fetch(details.url, {
        method: details.method,
        headers: details.requestHeaders
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("GraphQL Response:", data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  },
  {
    urls: ["*://leetcode.com/*"], // Match all LeetCode URLs
    types: ["xmlhttprequest", "fetch"]
  }
);

//Check if URL contains "/submissions/detail/" & "/check/"

//Check if response has "state" == "SUCCESS" 

//increase total number of attempts

// and if "status_msg" == "Accepted"

//increaese successes

//make background green

//record "lang", "status_runtime", "status_memory"
