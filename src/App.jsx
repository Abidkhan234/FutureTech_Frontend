import "./App.css";
import { Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import AddBlog from "./Components/Pages/AddBlog";
import PageLayout from "./Components/layout/PageLayout";
import LoginPage from "./Components/Pages/LoginPage";
import SignUpPage from "./Components/Pages/SignUpPage";
import LikePost from "./Components/Pages/LikePost";
import Loader from "./Components/Loader";
import NotFoundPage from "./Components/NotFoundPage";

const HomePage = lazy(() => import("./Components/Pages/HomePage"));

const App = () => {
  return (
    <div className="bg-[#1E1E1E] min-h-[100vh] w-full">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<PageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/add-blog" element={<AddBlog />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/like-post" element={<LikePost />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
