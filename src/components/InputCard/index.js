import React, { useContext, useState } from "react";
import { Clear } from "@material-ui/icons";

import storeApi from "../../utils/storeApi";

import "./styles.scss";

export default function InputCard({ setOpen, listId, type }) {
  const { addMoreCard, addMoreList } = useContext(storeApi);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");


  const handleOnChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleOnChangeColor = (e) => {
    setColor(e.target.value);
  };

  const handleBtnConfirm = () => {
    if (type === "card") {
      addMoreCard(title, listId);
    } else {
      addMoreList(title,color);
    }
    setOpen(false);
    setTitle("");
    setColor("");

  };

  return (
    <div className="input-card">
      <div className="input-card-container">
        <textarea
          onChange={handleOnChangeTitle}
          value={title}
          className="input-text"
          placeholder={
            type === "card"
              ? "Enter a title of this card..."
              : "Enter list title"
          }
          autoFocus
        />
        {type === "card" ? '' : (
          <input
          onChange={handleOnChangeColor}
          value={color}
          className="input-color"
          placeholder='Enter list color eg red, #ffffff'
          autoFocus
        />
        )}
        
      </div>
      <div className="confirm">
        <button className="button-confirm" onClick={handleBtnConfirm}>
          {type === "card" ? "Add Card" : "Add List"}
        </button>
        <button
          className="button-cancel"
          onClick={() => {
            setTitle("");
            setColor("");
            setOpen(false);
          }}
        >
          <Clear />
        </button>
      </div>
    </div>
  );
}
