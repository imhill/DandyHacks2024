export async function AddFriend(friendName) {
    // Get runner's username
    const username = await getUsername();

    // Send friend request
    try {
        const friendReqResponse = await fetch(`http://3.143.223.90:8000/add-friend?username=${username}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                friend: friendName
            })
        });

        const revFriendReqResponse = await fetch(`http://3.143.223.90:8000/add-friend?username=${friendName}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                friend: username
            })
        });
    } catch (err) {
        console.error(err)
    }
}

export async function GetFriends() {
    // Get user's username
    const username = await getUsername();

    try {
        const friendList = await fetch(`http://3.143.223.90:8000/get-friends?username=${username}`);
    } catch (err) {
        console.error(err);
    }

    console.log(friendList);
}

async function getUsername() {
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
