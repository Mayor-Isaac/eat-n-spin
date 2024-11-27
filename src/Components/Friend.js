import React from "react";
import Button from "./Button";

export default function Friend({
  friend,
  setSelectedFriend,
  selectedFriend,
  setIsOpen,
}) {
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
