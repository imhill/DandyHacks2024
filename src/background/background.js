const LEETCODE_BASE_URL = "leetcode.com";

console.log("service worker started!!!!");

let id = "";

chrome.webRequest.onCompleted.addListener(
    async (details) => {
        const url = details.url;
        const initiator = details.initiator;
        if (url.includes("/check/") && initiator == "https://leetcode.com") {
            console.log("HOORAY!!!!");

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.state == "SUCCESS" && data.status_msg == "Accepted") {
                    id = data.submission_id;
                    const query = `
                      query {
                        submissionDetails(submissionId: ${id}) {
                          runtimeDisplay
                          memoryDisplay
                          user {
                            username
                          }
                          lang {
                            name
                          }
                          question {
                            questionId
                            titleSlug
                          }
                        }
                      }
                    `;

                    const gqlResponse = await fetch("https://leetcode.com/graphql/",{
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ query: query })
                    });

                    const gqlData = await gqlResponse.json();

                    const gqlSubData = gqlData.data.submissionDetails;
                    console.log("user: ", gqlSubData.user.username, "lang: ", gqlSubData.lang.name, "runtime: ", gqlSubData.runtimeDisplay, "memory: ", gqlSubData.memoryDisplay);
                }
            } catch (err) {
                console.error(err);
            }
        }
    },
    { urls: ["*://leetcode.com/*/check*"] },
    []
);

/*
chrome.webRequest.onCompleted.addListener(
    async (details) => {
        const url = details.url;
        const initiator = details.initiator;
        if (url.includes("/graphql/") && initiator == "https://leetcode.com") {
            console.log("HOORAY!!!! (graphql)");
            console.log("id: ", id);

            try {
                const response = await fetch(url);
                const data = await response.json();
                
                if ("submissionDetails" in data) {
                    let subDetails = data.submissionDetails;
                    console.log("user: ", subDetails.user.username, "lang: ", subDetails.lang.name, "runtime: ", subDetails.runtimeDisplay, "memory: ", subDetails.memoryDisplay);
                }
            } catch (err) {
                console.error(err);
            }
        }
    },
    { urls: ["*://leetcode.com/graphql*"] },
    []
);
*/

//Check if URL contains "/submissions/detail/" & "/check/"

//Check if response has "state" == "SUCCESS" 

//increase total number of attempts

// and if "status_msg" == "Accepted"

//increaese successes

//make background green

//record "lang", "status_runtime", "status_memory"
