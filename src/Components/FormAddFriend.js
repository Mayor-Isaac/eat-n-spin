import React, { useState } from "react";
import Button from "./Button";

export default function FormAddFriend({ friends, setFriends, setIsOpen }) {
  const [newName, setNewName] = useState("");
  const [newURL, setNewURL] = useState("https://i.pravatar.cc/48");
  function addFriend(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    if (newName && newURL) {
      const newFriend = {
        id,
        name: newName,
        image: `${newURL}?=${id}`,
        balance: 0,
      };
      setFriends([...friends, newFriend]);
      setNewName("");
      setNewURL("https://i.pravatar.cc/48");
      setIsOpen(false);
    } else return;
  }
  return (
    <form className="form-add-friend" onSubmit={addFriend}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <label>🔳🔳 Image URL</label>
      <input
        type="text"
        value={newURL}
        onChange={(e) => setNewURL(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}
