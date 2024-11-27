import React from "react";
import Friend from "./Friend";

export default function FriendList({
  friends,
  setSelectedFriend,
  selectedFriend,
  setIsOpen,
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          setSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
          setIsOpen={setIsOpen}
        />
      ))}
    </ul>
  );
}
