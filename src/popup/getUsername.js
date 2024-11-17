export async function GetUsername() {
    try {
        const query = `
            query globalData {
              userStatus {
                username
              }
             }`;
        const response = await fetch("https://leetcode.com/graphql/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query })
        });
        const data = await response.json();
        const username = data.data.userStatus.username;
        return username;
    } catch (err) {
        console.error(err);
    }
}
