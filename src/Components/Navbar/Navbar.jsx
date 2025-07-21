import { NavLink } from "react-router";
import Logo from "../../Asset/Images/Logo.png";
import { FaBarsStaggered } from "react-icons/fa6";
import { useAppContext } from "../../../Context/AppContext";
import Sidebar from "../SideBar/Sidebar";
import { AnimatePresence, motion } from "motion/react";
import { FaHeart } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import profilePic from "../../Asset/Images/profile.png";

const navLinks = [
  {
    text: "All Posts",
    path: "/",
  },
  {
    text: "Add Post",
    path: "/add-blog",
  },
];

const Navbar = () => {
  const {
    isToggle,
    setIsToggle,
    setisVisible,
    isToken,
    tokenData,
    profileDropdown,
    setProfileDropdown,
    handleLogout,
    handleFetchLikePosts,
  } = useAppContext();

  return (
    <nav className="w-full bg-[#1A1A1A] py-2.5 px-4">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-3 items-center text-white">
          <img src={Logo} alt="Logo" className="w-[35px]" />
          <h2 className="font-bold text-2xl">Future Tech</h2>
        </div>

        <div className="md:flex items-center gap-10 hidden">
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
                setisVisible(false);
                setProfileDropdown(false);
              }}
              key={i}
            >
              <span className="block">{v.text}</span>
            </NavLink>
          ))}
        </div>

        <div className="flex gap-3 items-center">
          {isToken ? (
            <div className="relative">
              <div
                className="rounded-full overflow-hidden w-10 h-10 cursor-pointer"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                <img
                  src={`${
                    tokenData.avatarpath?.includes("/Images")
                      ? `${profilePic}`
                      : tokenData.avatarpath
                  }`}
                  className="w-full h-full object-cover object-center"
                  alt="profile-pic"
                />
              </div>

              <AnimatePresence>
                {profileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute right-0 mt-3 w-44 bg-white shadow-2xl rounded-xl z-50 overflow-hidden border border-gray-100"
                  >
                    <motion.button
                      whileHover={{ backgroundColor: "#FEE2E2" }}
                      className="w-full px-4 py-3 text-sm flex items-center gap-2 cursor-pointer text-gray-700"
                      onClick={() => setProfileDropdown(false)}
                    >
                      <NavLink
                        to={"/like-post"}
                        className={`flex items-center gap-2`}
                        onClick={() => handleFetchLikePosts()}
                      >
                        <FaHeart className="text-red-500" /> Liked Posts
                      </NavLink>
                    </motion.button>
                    <motion.button
                      whileHover={{ backgroundColor: "#FEE2E2" }}
                      className="w-full px-4 py-3 text-sm flex items-center gap-2 cursor-pointer text-red-600"
                      onClick={handleLogout}
                    >
                      <FiLogOut /> Logout
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="md:flex items-center gap-5 hidden">
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

          <div className="md:hidden block h-full">
            <button
              className="text-2xl text-white cursor-pointer"
              onClick={() => {
                setIsToggle(!isToggle);
                setisVisible(false);
              }}
            >
              <FaBarsStaggered />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isToggle && (
            <motion.div
              initial={{
                y: -40,
                opacity: 0,
                scale: 0.95,
                boxShadow: "0 0 0 rgba(0,0,0,0)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                boxShadow: [
                  "0 0 0 rgba(0,0,0,0)",
                  "0 8px 16px rgba(0,0,0,0.12)",
                  "0 4px 12px rgba(0,0,0,0.10)",
                ],
              }}
              exit={{
                y: -40,
                opacity: 0,
                scale: 0.95,
                boxShadow: "0 0 0 rgba(0,0,0,0)",
              }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 30,
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                boxShadow: { duration: 0.4 },
              }}
              className="fixed top-0 left-0 h-full max-h-[250px] w-full bg-[#1A1A1A] z-20"
            >
              <Sidebar
                isToggle={isToggle}
                setIsToggle={setIsToggle}
                navLinks={navLinks}
                isToken={isToken}
                tokenData={tokenData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
