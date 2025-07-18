import { FaPlus } from "react-icons/fa6";
import { useAppContext } from "../../../Context/AppContext";
import { AnimatePresence, motion } from "motion/react";
import Form from "../Form/PostForm/Form";

const AddBlog = () => {
  const { isVisible, setisVisible, setIsToggle, setFilePreview } =
    useAppContext();

  return (
    <div className="md:h-[89.2vh] h-[90.5vh] w-full">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[400px]">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: 40,
                filter: "blur(8px)",
              }}
              transition={{
                duration: 0.3,
                ease: "easeIn",
              }}
            >
              <Form />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute min-[769px]:bottom-[3%] bottom-[3%] left-[50%] translate-x-[-50%] min-[769px]:translate-y-[-3%] translate-y-[-3%] w-full max-w-[200px]">
        <motion.button
          className="text-xl text-white py-2 rounded-full border-2 w-full max-w-[200px] flex justify-center items-center cursor-pointer"
          onClick={() => {
            setisVisible(!isVisible);
            setFilePreview(null);
            setIsToggle(false);
          }}
        >
          <motion.span
            animate={{
              rotate: isVisible ? 45 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <FaPlus />
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
};

export default AddBlog;
