import { useState } from "react";
import { useAppContext } from "../../../../Context/AppContext";

const Form = () => {
  const {
    titleValue,
    setTitleValue,
    descriptionValue,
    setDescriptionValue,
    handlePostSend,
    filePreview,
    handleFileChange,
  } = useAppContext();

  return (
    <div className="border-2 rounded-md py-2.5 px-2 bg-[#1A1A1A] shadow-2xl">
      <form
        method="post"
        encType="multipart/form-data"
        className="flex flex-col justify-center gap-4 text-white h-full"
        onSubmit={(e) => handlePostSend(e)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium text-lg">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            className="border rounded-sm p-1 py-2 font-medium text-sm outline-none placeholder-white bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-medium text-lg">
            Description
          </label>
          <textarea
            id="description"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            className="border rounded-sm p-1 py-2 font-medium text-sm outline-none placeholder-white bg-transparent resize-none"
            placeholder="Enter Description"
            rows={4}
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="relative border-2 rounded-sm px-2 py-2 font-medium text-white w-full cursor-pointer text-center h-[120px]
            flex justify-center items-center"
            htmlFor="file"
          >
            {filePreview ? (
              <div className="flex justify-center items-center w-full h-full overflow-hidden rounded-md">
                {typeof filePreview === "string" &&
                filePreview.startsWith("blob:") ? (
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="w-full h-full object-contain object-center rounded-sm"
                  />
                ) : (
                  <span className="text-sm text-gray-300">{filePreview}</span>
                )}
              </div>
            ) : (
              <span>Select Image</span>
            )}
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            name="File"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            className="group relative px-4 py-2 font-medium text-white transition-colors duration-[300ms] hover:text-gray-100 w-full max-w-[200px] cursor-pointer"
            type="submit"
          >
            <span>Add</span>
            {/* TOP */}
            <span className="absolute left-0 top-0 h-[2px] w-full bg-white transition-all duration-100 group-hover:w-0 group-clicked:w-0" />
            {/* RIGHT */}
            <span className="absolute right-0 top-0 h-full w-[2px] bg-white transition-all delay-100 duration-100 group-hover:h-0 group-clicked:h-0" />
            {/* BOTTOM */}
            <span className="absolute bottom-0 right-0 h-[2px] w-full bg-white transition-all delay-200 duration-100 group-hover:w-0 group-clicked:w-0" />
            {/* LEFT */}
            <span className="absolute bottom-0 left-0 h-full w-[2px] bg-white transition-all delay-300 duration-100 group-hover:h-0 group-clicked:h-0" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
