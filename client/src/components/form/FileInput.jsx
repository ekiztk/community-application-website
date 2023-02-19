import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = `form-control
block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;

const focusedStyle = "border-[#2196f3]";

const acceptStyle = "border-[#00e676]";

const rejectStyle = "border-[#ff1744]";

function DropzoneFileInput({ id, label, accept, onDrop, multiple }) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept, onDrop, multiple });

  return (
    <div {...getRootProps()} className="mb-3 w-96">
      <label
        htmlFor={id}
        className="form-label inline-block mb-2 text-gray-700"
      >
        {label || "File Input"}
      </label>
      <input
        id={id}
        type="file"
        className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        {...getInputProps()}
      />
    </div>
  );
}

export default DropzoneFileInput;
