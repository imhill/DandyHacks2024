const LEETCODE_BASE_URL = "leetcode.com";

chrome.webRequest.onCompleted.addListener(
    async (details) => {
        const url = details.url;
        if (url.includes("/check/")) {
            console.log("saw check");

            try {
                const response = await fetch(url);
                const data = await response.text();

                console.log("response body: ", data);
            } catch (err) {
                console.error("error fetching response: ", err);
            }
        }
    },
    { urls: ["https://leetcode.com/submissions/detail/*/check"] },
    []
);

//Check if URL contains "/submissions/detail/" & "/check/"

//Check if response has "state" == "SUCCESS" 

//increase total number of attempts

// and if "status_msg" == "Accepted"

//increaese successes

//make background green

//record "lang", "status_runtime", "status_memory"
