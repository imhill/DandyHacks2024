import {GetUsername} from "./getUsername.js";

export async function AddFriend(friendName) {
    console.log("Adding",friendName);
    // Get runner's username
    const username = await GetUsername();

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

export async function RemoveFriend(friendName) {
    // Get user's name
    const username = await GetUsername();

    // Send remove friend
    try {
        const remFriend1 = await fetch(`http://3.143.223.90:8000/remove-friend?username=${username}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                friend: friendName
            })
        });

        const remFriend2 = await fetch(`http://3.143.223.90:8000/remove-friend?username=${friendName}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                friend: username
            })
        });
    } catch(err) {
        console.error(err)
    }
}

export async function GetFriends() {
    // Get user's username
    const username = await GetUsername();

    try {
        const friendList = await fetch(`http://3.143.223.90:8000/get-friends?username=${username}`);
        const friends = await friendList.json()
        return friends;
    } catch (err) {
        console.error(err);
    }
    return [];
}
