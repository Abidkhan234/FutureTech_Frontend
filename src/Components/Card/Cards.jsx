import { AnimatePresence, motion } from "motion/react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useAppContext } from "../../../Context/AppContext";
import { MdClose, MdMoreHoriz } from "react-icons/md";
import profilePic from "../../Asset/Images/profile.png";

const Cards = ({
  title,
  description,
  postTime,
  file,
  userData,
  postId,
  isLiked,
}) => {
  const {
    handleDelete,
    tokenData,
    handleLikePosts,
    isModal,
    setisModal,
    setselectedId,
    setDescriptionValue,
    setTitleValue,
    setFilePreview,
  } = useAppContext();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const words = description.split(" ");
  const shouldTruncate = words.length > 15;
  const previewText = words.slice(0, 15).join(" ") + "...";

  const isOwner = tokenData && tokenData.userId === userData._id;

  const handleFields = (
    id,
    selectedTitle,
    selectedDescription,
    selectedFile
  ) => {
    setisModal(!isModal);
    setselectedId(id);
    setDropdownOpen(false);
    setTitleValue(selectedTitle);
    setDescriptionValue(selectedDescription);
    setFilePreview(selectedFile);
  };

  return (
    <div className="flex flex-col gap-2 py-1.5 justify-between bg-[#fff] rounded-md relative">
      <div className="flex items-center gap-3 px-3 justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10.5 h-10.5 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
            <img
              src={`${
                userData.avatarPath?.includes("/Images")
                  ? `${profilePic}`
                  : userData.avatarPath
              }`}
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-1.5 items-start">
            <h4 className="font-semibold text-lg">{userData.userName}</h4>
            <span className="font-medium text-sm text-gray-500">
              {`${postTime.year},${postTime.month} ${postTime.day} at ${postTime.time} `}
            </span>
          </div>
        </div>

        {isOwner && (
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-600 hover:text-black focus:outline-none cursor-pointer"
            >
              <motion.div
                key={dropdownOpen ? "close" : "menu"}
                initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{
                  rotate: dropdownOpen ? 90 : 0,
                  scale: 1,
                  opacity: 1,
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {dropdownOpen ? (
                  <MdClose className="text-3xl transition-all duration-300" />
                ) : (
                  <MdMoreHoriz className="text-3xl transition-all duration-300" />
                )}
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="absolute -right-2 mt-4.5 w-40 bg-white shadow-2xl rounded-sm z-20 overflow-hidden border border-gray-100"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#f1f5f9" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      handleFields(postId, title, description, file)
                    }
                    className="w-full px-3 py-3 text-sm flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer"
                  >
                    <FiEdit className="text-lg" /> Update Post
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#fee2e2" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      handleDelete(postId);
                      setDropdownOpen(false);
                    }}
                    className="w-full px-3 py-3 text-sm flex items-center gap-2 text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <FiTrash2 className="text-lg" /> Delete Post
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="h-[300px]">
        <img
          src={file}
          alt="Image"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex flex-col gap-2 items-start px-2 py-1 border-b-2 border-b-gray-300">
        <h3 className="font-bold md:text-xl text-lg">{title}</h3>
        <motion.p
          initial={{ height: "auto" }}
          animate={{ height: "auto" }}
          className="md:text-base text-[14px] font-medium text-start"
        >
          {shouldTruncate && !readMore ? previewText : description}
        </motion.p>
        {shouldTruncate && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setReadMore(!readMore)}
            className="text-blue-500 font-semibold text-sm underline"
          >
            {readMore ? "Read Less" : "Read More"}
          </motion.button>
        )}
      </div>

      <div className="px-2 flex justify-start items-center">
        <AnimatePresence mode="wait" initial={false}>
          {isLiked ? (
            <motion.button
              key="filled"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.2, type: "spring" }}
              className="text-2xl cursor-pointer text-red-500"
              onClick={() => handleLikePosts(postId)}
            >
              <FaHeart />
            </motion.button>
          ) : (
            <motion.button
              key="empty"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, type: "spring" }}
              className="text-2xl cursor-pointer"
              onClick={() => handleLikePosts(postId)}
            >
              <FaRegHeart />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cards;
