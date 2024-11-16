const LEETCODE_BASE_URL = "leetcode.com";

chrome.webRequest.onCompleted.addListener(
  async (details) => {
    if (details.url.includes("graphql/")) {
      console.log(`Request to ${details.url} completed. Fetching response body...`);

      // Fetch the response body from the network
      try {
        const response = await fetch(details.url, {
          method: details.method,
          headers: details.requestHeaders,
        });
        const jsonData = await response.json();
        console.log("GraphQL Response Data:", jsonData);
      } catch (error) {
        console.error("Error fetching response data:", error);
      }
    }
  },
  { urls: ["https://leetcode.com/*"] }
);

//Check if URL contains "/submissions/detail/" & "/check/"

//Check if response has "state" == "SUCCESS" 

//increase total number of attempts

// and if "status_msg" == "Accepted"

//increaese successes

//make background green

//record "lang", "status_runtime", "status_memory"
