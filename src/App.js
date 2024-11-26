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
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          setSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
          setIsOpen={setIsOpen}
        />

        {isOpen && (
          <FormAddFriend
            friends={friends}
            setFriends={setFriends}
            setIsOpen={setIsOpen}
          />
        )}

        <Button
          btnFunc={() => {
            setIsOpen(!isOpen);
            setSelectedFriend(null);
          }}
        >
          {isOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendList({ friends, setSelectedFriend, selectedFriend, setIsOpen }) {
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

function Friend({ friend, setSelectedFriend, selectedFriend, setIsOpen }) {
  function handleSelect() {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setIsOpen(false);
  }
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button btnFunc={handleSelect}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
}

function FormAddFriend({ friends, setFriends, setIsOpen }) {
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name} </h2>

      <label>💸💸 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) =>
          setBill(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>🧍‍♂️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) => setPaidByUser(e.target.value)}
      />

      <label>👫 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>💰 Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(Number(e.target.value))}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
