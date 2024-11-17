export async function AddFriend(friendName) {
    // Get runner's username
    const username = getUsername();

    // Send friend request
    try {
        const friendReqResponse = await fetch(`http://3.143.223.90:8000/add-friend?username=${username}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                friend: friendName
            });
        });
    } catch (err) {
        console.error(err)
    }
}

async function getUsername() {
    try {
        const query = `
            query globalData {
              userStatus {
                username
            }
        }`;
        const response = await fetch("https://leetcode.com/grahql", {
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
