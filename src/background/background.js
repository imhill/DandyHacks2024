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
                runtime
                runtimeDisplay
                memory
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
          //console.log("user: ", gqlSubData.user.username, "lang: ", gqlSubData.lang.name, "runtime: ", gqlSubData.runtimeDisplay, "memory: ", gqlSubData.memoryDisplay);

          //console.log("slug: ", gqlSubData.question.titleSlug);
          const dbBody = JSON.stringify({
            titleSlug: gqlSubData.question.titleSlug,
            runtime: Number(gqlSubData.runtime),
            space: Number(gqlSubData.memory)
          });

          const createResp = await fetch(`http://3.143.223.90:8000/create-user?username=${gqlSubData.user.username}`, {
            method: "POST"
          });
          //console.log(createResp);

          const dbResponse = await fetch(`http://3.143.223.90:8000/post-problem?username=${gqlSubData.user.username}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: dbBody
          });
          //console.log(dbResponse);
        }
      } catch (err) {
        console.error(err);
      }
    }
  },
  { urls: ["*://leetcode.com/*/check*"] },
  []
);

//Check if URL contains "/submissions/detail/" & "/check/"

//Check if response has "state" == "SUCCESS" 

//increase total number of attempts

// and if "status_msg" == "Accepted"

//increaese successes

//make background green

//record "lang", "status_runtime", "status_memory"
