import { AnimatePresence, motion } from "motion/react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { useAppContext } from "../../../../Context/AppContext";
import { useState } from "react";

const inputFields = [
  {
    label: "Enter Name:",
    placeholder: "Enter Name",
    type: "text",
  },
  {
    label: "Enter Email:",
    placeholder: "Enter Email",
    type: "email",
  },
  {
    label: "Enter Password:",
    placeholder: "Enter Password",
    type: "password",
    showType: "text",
  },
];

const Form = ({ pageTitle, isLogin }) => {
  const {
    togglePassword,
    setTogglePassword,
    userName,
    setuserName,
    email,
    setEmail,
    password,
    setPassword,
    setAvatar,
    filePreview,
    setFilePreview,
    handleSignUpSend,
    handleLoginSend,
  } = useAppContext();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      if (file.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(file.name);
      }
    } else {
      setFilePreview(null);
    }
  };

  return (
    <div className="border-2 rounded-md py-2.5 px-2 bg-[#1A1A1A]">
      <form
        className="flex flex-col justify-center items-center gap-5 text-white h-full"
        encType="multipart/form-data"
        method="post"
        onSubmit={(e) => {
          isLogin ? handleLoginSend(e) : handleSignUpSend(e);
        }}
      >
        <div>
          <h3 className="font-bold md:text-4xl text-3xl text-white uppercase tracking-wide">
            {pageTitle}
          </h3>
        </div>
        {inputFields.map((v, i) => (
          <div
            className={`${
              isLogin && v.type == "text" ? "hidden" : ""
            } flex flex-col gap-1 w-full`}
            key={i}
          >
            <label htmlFor={v.type} className="font-medium text-lg">
              {v.label}
            </label>
            <div
              className={`w-full relative flex justify-between items-center border rounded-sm px-1 pe-2`}
            >
              {v.type === "password" ? (
                <>
                  <input
                    type={togglePassword ? v.showType : v.type}
                    id={v.type}
                    placeholder={v.placeholder}
                    value={password}
                    autoComplete="off"
                    className="py-2 font-medium text-sm outline-none placeholder-white bg-transparent w-full"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="flex justify-center items-center">
                    <motion.button
                      whileTap={{ scale: 0.85, rotate: 10 }}
                      whileHover={{ scale: 1.1 }}
                      type="button"
                      className="text-xl cursor-pointer"
                      onClick={() => setTogglePassword(!togglePassword)}
                    >
                      {togglePassword ? <FaEye /> : <FaEyeSlash />}
                    </motion.button>
                  </div>
                </>
              ) : (
                <input
                  type={v.type}
                  id={v.type}
                  placeholder={v.placeholder}
                  autoComplete="off"
                  value={v.type == "text" ? userName : email}
                  className={`py-2 font-medium text-sm outline-none placeholder-white bg-transparent w-full`}
                  onChange={(e) => {
                    v.type == "text"
                      ? setuserName(e.target.value)
                      : setEmail(e.target.value);
                  }}
                />
              )}
            </div>
          </div>
        ))}

        {!isLogin && (
          <div className="flex flex-col gap-2 w-full">
            <label
              className="relative border-2 rounded-sm px-2 py-2 font-medium text-white w-full cursor-pointer text-center h-[80px]
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
                <span>Select a file</span>
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
        )}

        <div className="w-full flex justify-center items-center">
          <motion.button
            className="group relative px-4 py-2 font-medium text-white transition-colors duration-[300ms] hover:text-gray-100 w-full max-w-[200px] cursor-pointer"
            type="submit"
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 4px 10px 0px rgba(255,255,255,0.15)",
              backgroundColor: "#232323",
            }}
            whileTap={{
              scale: 0.95,
              rotate: 2,
              backgroundColor: "#111111",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default Form;
