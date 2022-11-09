import React, { useContext, useState } from "react";

import TextareaAutosize from "react-textarea-autosize";
import { DeleteOutline } from "@material-ui/icons";
import { Draggable } from "react-beautiful-dnd";

import storeApi from "../../utils/storeApi";

import "./styles.scss";

export default function Card({ card, index, listId }) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const { removeCard, updateCardTitle } = useContext(storeApi);

  const handleOnBlur = () => {
    updateCardTitle(newTitle, index, listId);
    setOpen(!open);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className="card-content">
            {open ? (
              <TextareaAutosize
                type="text"
                className="input-card-title"
                placeholder="Enter a title of this card..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={handleOnBlur}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleOnBlur();
                  }
                  return;
                }}
                autoFocus
              />
            ) : (
              <div
                onClick={() => setOpen(!open)}
                className="card-title-container"
              >
                <p>{card.title ? card.title : 'Enter a title of this card...'}</p>
                <button
                  onClick={() => {
                    removeCard(index, listId);
                  }}
                >
                  <DeleteOutline />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
