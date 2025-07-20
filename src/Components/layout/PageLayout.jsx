import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import { Toaster } from "react-hot-toast";

const PageLayout = () => {
  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 1000,
          },
          error: {
            duration: 1000,
          },
        }}
      />
      <header className="sticky top-0 left-0 right-0 z-10">
        <Navbar />
      </header>

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
