import React from "react";

const Bar = (props) => {
  return (
    <div
      style={{
        height: props.h * 2.5 + "px",
      }}
      className={`bar ${props.arr[props.i] === props.h ? "bar-select" : ""}  ${
        props.arr[props.j] === props.h ? "bar-moving" : ""
      }`}
    >
      <b>{props.val}</b>
    </div>
  );
};

export default Bar;
