import React, { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, btnFunc }) {
  return (
    <button className="button" onClick={btnFunc}>
      {children}
    </button>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [showBillPart, setShowBillPart] = useState(false);
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} setShowBillPart={setShowBillPart} />
        {isOpen && (
          <FormAddFriend
            friends={friends}
            setFriends={setFriends}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
        <Button
          btnFunc={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      {showBillPart && <FormSplitBill />}
    </div>
  );
}

function FriendList({ friends, setShowBillPart }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          setShowBillPart={setShowBillPart}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, setShowBillPart }) {
  function handleSelect(e) {
    setShowBillPart(true);
  }
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          {friend.name} owes you {Math.abs(friend.balance)}💲
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} {Math.abs(friend.balance)}💲
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button btnFunc={handleSelect}>Select</Button>
    </li>
  );
}

function FormAddFriend({ friends, setFriends, isOpen, setIsOpen }) {
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
      setIsOpen(!isOpen);
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

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X </h2>

      <label>💸💸 Bill value</label>
      <input type="text" />

      <label>🧍‍♂️ Your expense</label>
      <input type="text" />

      <label>👫 X's expense</label>
      <input type="text" disabled />

      <label>💰 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
