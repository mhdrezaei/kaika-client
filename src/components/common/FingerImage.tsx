import React from "react";

function FingerImage(props) {
  return (
    <div className=" flex justify-end items-center gap-2">
      <img
        src={URL.createObjectURL(props.image)}
        className="rounded-lg w-6 h-6"
      />
      <span
        onClick={props.onRemove}
        className="flex justify-center items-center w-4 h-4 text-xl text-red-700 border border-red-700 rounded-full cursor-pointer"
      >
        ×
      </span>
    </div>
  );
}

export default FingerImage;
