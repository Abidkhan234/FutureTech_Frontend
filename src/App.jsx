import "./App.css";
import { Routes, Route } from "react-router";
import HomePage from "./Components/Pages/HomePage";
import AddBlog from "./Components/Pages/AddBlog";
import PageLayout from "./Components/layout/PageLayout";
import LoginPage from "./Components/Pages/LoginPage";
import SignUpPage from "./Components/Pages/SignUpPage";
import LikePost from "./Components/Pages/LikePost";

const App = () => {
  return (
    <div className="bg-[#1E1E1E] min-h-[100vh] w-full">
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/like-post" element={<LikePost />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
