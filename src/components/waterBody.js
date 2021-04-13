import React, { useRef, useEffect, useState, useCallback } from "react";

const WaterBody = ({ earthRef, position, uid, size }) => {
  return (
    <div className="WaterBody" style={{ position: "absolute" }}>
      <div
        className="WaterBody"
        style={{
          position: "absolute",
          top: position.y - size / 2,
          left: position.x - size / 2,
        }}
      >
        <div
          className="WaterBody"
          style={{
            boxShadow: "inset 0 0 10px #485662",
            borderRadius: size / 2,
            backgroundColor: "#66B3FF",
            width: size,
            height: size,
          }}
        ></div>
      </div>
    </div>
  );
};

export default WaterBody;
