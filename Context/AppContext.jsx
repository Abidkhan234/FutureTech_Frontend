import axios from "axios";
import { createContext, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showData, setshowData] = useState([]);
  const [tokenData, setTokenData] = useState(null);
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);

  // For Post CRUD
  const [isVisible, setisVisible] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [file, setfile] = useState(null);

  // For login/signup
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [togglePassword, setTogglePassword] = useState(false);

  // For nav/side Bar
  const [isToggle, setIsToggle] = useState(false);
  const [isToken, setisToken] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  // For nav/side Bar

  const [filePreview, setFilePreview] = useState(null);
  const [isLiked, setisLiked] = useState(false);

  // For Modal
  const [isModal, setisModal] = useState(false);
  const [selectedId, setselectedId] = useState(null);
  // For Modal

  // For LikePosts Data
  const [likeData, setlikeData] = useState(null);
  // For LikePosts Data

  // For token validation

  const handleToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setTokenData(payload);
        setisToken(true);
      } catch (err) {
        console.error("Invalid token", err);
        setTokenData(null);
        setisToken(false);
      }
    } else {
      setTokenData(null);
      setisToken(false);
    }
  };

  // For token validation

  // For Post

  const handleFetch = async () => {
    try {
      setloader(true);
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/post`);

      const sortedPosts = data.sort((a, b) => {
        const dateA = new Date(
          `${a.postTime.month} ${a.postTime.day}, ${a.postTime.year} ${a.postTime.time}`
        );
        const dateB = new Date(
          `${b.postTime.month} ${b.postTime.day}, ${b.postTime.year} ${b.postTime.time}`
        );
        return dateB - dateA; // latest first
      });

      setshowData(sortedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
    } finally {
      setloader(false);
    }
  };

  const handlePostSend = async (e) => {
    try {
      e.preventDefault();
      const descriptionWordLength = descriptionValue.trim().split(" ");
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Create Account First");
        handleToken();
        navigate("/login");
        return;
      }

      if (titleValue.trim() === "") {
        toast.error("Title is mandatory");
        return;
      } else if (descriptionWordLength.length > 100) {
        toast.error("Description must be under 100 words");
        return;
      }

      const formData = new FormData();
      formData.append("File", file);
      formData.append("title", titleValue);
      formData.append("description", descriptionValue);

      await toast.promise(
        axios.post(`${import.meta.env.VITE_URL}/api/post`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Posting...",
          success: (res) => res.data.message,
          error: (err) => {
            if (
              err.response?.data?.message
                .toLowerCase()
                .includes("token expired")
            ) {
              localStorage.removeItem("token");
              navigate("/login");
              handleToken();
              return "Session expired login again";
            } else {
              return err.response?.data?.message;
            }
          },
        }
      );

      setTitleValue("");
      setDescriptionValue("");
      setfile(null);
      setisVisible(false);
      handleToken();
      navigate("/");
      handleFetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to delete a post.");
        navigate("/login");
        return;
      }

      const deletePromise = axios.delete(
        `${import.meta.env.VITE_URL}/api/post/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await toast.promise(deletePromise, {
        loading: "Deleting post...",
        success: (res) => res.data.message || "Post deleted successfully",
        error: (err) => {
          if (
            err.response?.data?.message?.toLowerCase().includes("token expired")
          ) {
            localStorage.removeItem("token");
            handleToken();
            navigate("/login");
            return "Session expired. Please login again.";
          }
          return err.response?.data?.message || "Failed to delete post";
        },
      });

      handleFetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e, id) => {
    try {
      e.preventDefault();

      if (!titleValue.trim() || !descriptionValue.trim()) {
        toast.error("All fields are required");
        return;
      }

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("File", file);
      formData.append("title", titleValue);
      formData.append("description", descriptionValue);

      await toast.promise(
        axios.put(`${import.meta.env.VITE_URL}/api/post/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          loading: "Updating...",
          success: (res) => res.data.message,
          error: (err) => {
            if (
              err.response?.data?.message
                ?.toLowerCase()
                .includes("token expired")
            ) {
              localStorage.removeItem("token");
              handleToken();
              navigate("/login");
              return "Session expired. Please login again.";
            }
            return err.response?.data?.message || "Failed to delete post";
          },
        }
      );

      setfile(null);
      setTitleValue("");
      setDescriptionValue("");
      setselectedId(null);
      setFilePreview(null);
      setisModal(false);

      handleFetch();
    } catch (error) {
      console.log(error);
    }
  };
  // For Post

  // For Login/SignUp/Logout

  const handleSignUpSend = async (e) => {
    try {
      e.preventDefault();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (userName.trim() === "") {
        toast.error("Username is required");
        return;
      }
      if (email.trim() === "") {
        toast.error("Email is required");
        return;
      }
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      if (password.trim() === "") {
        toast.error("Password is required");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("email", email);
      formData.append("userName", userName);
      formData.append("password", password);

      await toast.promise(
        axios.post(`${import.meta.env.VITE_URL}/api/user/register`, formData),
        {
          loading: "Signing up...",
          success: (res) => res.data.message,
          error: (err) => err.response?.data?.message || "Signup failed",
        }
      );

      // Reset fields
      setEmail("");
      setPassword("");
      setuserName("");
      setAvatar(null);
      setFilePreview(null);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const handleLoginSend = async (e) => {
    e.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email.trim() === "") {
        toast.error("Email is required");
        return;
      }
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      if (password.trim() === "") {
        toast.error("Password is required");
        return;
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/api/user/login`,
        { email, password }
      );

      localStorage.setItem("token", data.token);
      handleToken();
      setEmail("");
      setPassword("");

      toast.success(data.message, {
        icon: "👋",
      });

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      console.log(error);
      if (
        error.response?.data?.message.toLowerCase().includes("email not found")
      ) {
        setEmail("");
        setPassword("");
        navigate("/sign-up");
      }
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      handleToken();

      const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/user`);

      setProfileDropdown(false);

      toast.success(`${data.message}`, {
        icon: "👋",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };
  // For Login/SignUp/Logout

  // For Getting likePosts

  const handleFetchLikePosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/api/post/like-posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setlikeData(data.allLikedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  // For Getting likePosts

  // For Updating Like

  const handleLikePosts = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Create Account First");
        handleToken();
        navigate("/login");
        return;
      }

      const { data } = await axios.put(
        `${import.meta.env.VITE_URL}/api/post/like-posts/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handleFetch();
    } catch (error) {
      console.log(error);
      if (
        error.response?.data?.message?.toLowerCase().includes("token expired")
      ) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        setisToken(false);
        navigate("/login");
      } else {
        alert(error.response?.data?.message || "Something went wrong");
      }
    }
  };
  // For Updating Like

  // For handling File preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setfile(file);
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
  // For handling File preview

  useEffect(() => {
    handleFetch();
    handleToken();
  }, []);

  return (
    <AppContext.Provider
      value={{
        showData,
        setshowData,
        isVisible,
        setisVisible,
        titleValue,
        setTitleValue,
        descriptionValue,
        setDescriptionValue,
        isToggle,
        setIsToggle,
        togglePassword,
        setTogglePassword,
        file,
        setfile,
        userName,
        setuserName,
        email,
        setEmail,
        password,
        setPassword,
        setAvatar,
        filePreview,
        setFilePreview,
        isToken,
        tokenData,
        profileDropdown,
        setProfileDropdown,
        isLiked,
        setisLiked,
        likeData,
        loader,
        isModal,
        setisModal,
        selectedId,
        setselectedId,
        handleLogout,
        handlePostSend,
        handleSignUpSend,
        handleLoginSend,
        handleDelete,
        handleLikePosts,
        handleFetchLikePosts,
        handleUpdate,
        handleFileChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
