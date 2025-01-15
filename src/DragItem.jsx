import React from "react";
import { useDrag } from "react-dnd";

const DragItem = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "FORM_FIELD",// type of item being dragged
    item: { type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),// Collects the drag state to update the UI
    }),
  });

  return (
    <div
      ref={drag} // Attaching the drag reference to this element to make it draggable
      style={{
        padding: "10px",
        margin: "5px",
        backgroundColor: "lightgray",
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {label}
    </div>
  );
};

export default DragItem;
