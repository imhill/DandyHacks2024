const LEETCODE_BASE_URL = "leetcode.com";

chrome.webRequest.onCompleted.addListener(
  async (details) => {
    // Check if the URL is exactly the target GraphQL endpoint
    if (details.url === "https://leetcode.com/graphql/") {
      try {
        // Fetch the response body
        const response = await fetch(details.url, {
          method: details.method,
          headers: details.requestHeaders,
        });

        // Ensure the response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const jsonData = await response.json();

          // Check if the response begins with the desired structure
          if (jsonData.data && jsonData.data.submissionDetails) {
            console.log("Matched GraphQL Response Data:", jsonData);
          }
        }
      } catch (error) {
        console.error("Error fetching GraphQL response:", error);
      }
    }
  },
  {
    // Limit to the specific GraphQL endpoint
    urls: ["https://leetcode.com/graphql/"],
  }
);

//Check if URL contains "/submissions/detail/" & "/check/"

//Check if response has "state" == "SUCCESS" 

//increase total number of attempts

// and if "status_msg" == "Accepted"

//increaese successes

//make background green

//record "lang", "status_runtime", "status_memory"
