import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router";
import { motion } from "motion/react";

const Sidebar = ({ isToggle, setIsToggle, navLinks, isToken, tokenData }) => {
  return (
    <div className="relative h-full w-full px-3 py-3 flex flex-col justify-between max-[431px]:items-center">
      <div className="flex justify-end items-center self-end">
        <button
          onClick={() => setIsToggle(!isToggle)}
          className="text-2xl p-1 border-2 border-red-500 text-white bg-red-500 rounded-sm cursor-pointer"
        >
          <IoClose />
        </button>
      </div>
      <div className="flex flex-col gap-4 items-start">
        {navLinks.map((v, i) => (
          <NavLink
            to={v.path}
            className={({ isActive }) =>
              `font-medium text-lg py-1.5 px-3 rounded-md border-2 border-transparent ${
                isActive
                  ? "bg-[#141414] text-white border-[#333333]"
                  : "text-gray-500"
              }
                hover:bg-[#141414] hover:text-white hover:border-[#333333]
                 transition-colors duration-300
                 `
            }
            onClick={() => {
              setIsToggle(false);
            }}
            key={i}
          >
            {v.text}
          </NavLink>
        ))}
      </div>

      {isToken ? (
        <></>
      ) : (
        <div className="flex items-center gap-5">
          <motion.div
            whileTap={{ scale: 0.85, rotate: 10 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                `${
                  isActive && "scale-95"
                } text-lg font-semibold py-1.5 px-3 rounded-md bg-[#FFD11A] border-transparent text-[#141414] transition-transform duration-300`
              }
              onClick={() => setIsToggle(false)}
            >
              Login
            </NavLink>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.85, rotate: 10 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <NavLink
              to={"/sign-up"}
              className={({ isActive }) =>
                `${
                  isActive && "scale-95"
                } text-lg font-semibold py-1.5 px-3 rounded-md bg-[#FFD11A] border-transparent text-[#141414] transition-transform duration-300`
              }
              onClick={() => setIsToggle(false)}
            >
              Sign Up
            </NavLink>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
