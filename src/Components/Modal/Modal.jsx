import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../../../Context/AppContext";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen }) => {
  const {
    titleValue,
    setTitleValue,
    descriptionValue,
    setDescriptionValue,
    setisModal,
    handleUpdate,
    selectedId,
    setselectedId,
    filePreview,
    handleFileChange,
  } = useAppContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-black bg-opacity-60 flex justify-center items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="border-2 rounded-md py-2.5 px-2 bg-[#1A1A1A] w-full max-w-md shadow-lg relative overflow-hidden"
          >
            <button
              onClick={() => {
                setisModal(false);
                setselectedId(null);
              }}
              className="absolute top-0 right-0 text-white hover:text- text-2xl cursor-pointer px-1 py-0.5 bg-red-500 rounded-bl-sm"
            >
              <IoClose />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center text-white">
              Update Post
            </h2>

            <form
              method="put"
              encType="multipart/form-data"
              onSubmit={(e) => handleUpdate(e, selectedId)}
              className="flex flex-col gap-4 justify-between h-full"
            >
              <input
                type="text"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                placeholder="Post Title"
                className="border rounded-sm p-1 py-2 font-medium text-sm outline-none placeholder-white bg-transparent text-white"
              />

              <textarea
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
                placeholder="Post Description"
                className="border h-[100px] rounded-sm p-1 py-2 font-medium text-sm outline-none placeholder-white bg-transparent resize-none text-white"
              />

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
                        <img
                          className="w-full h-full object-contain object-center rounded-sm"
                          src={filePreview}
                          alt=""
                        />
                      )}
                    </div>
                  ) : (
                    <img
                      className="w-full h-full object-contain object-center rounded-sm"
                      src={filePreview}
                      alt=""
                    />
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

              <motion.button
                whileTap={{ scale: 0.85}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                type="submit"
                className="bg-[#FFD11A] hover:bg-[#ffd11acc] text-[#141414] font-semibold py-2 rounded-md cursor-pointer"
              >
                Update Post
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
