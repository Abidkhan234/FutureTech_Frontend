import React from "react";
import Form from "../Form/LoginSignupForm/Form";

const LoginPage = () => {
  return (
    <div className="md:min-h-[89.2vh] min-h-[90.5vh] w-full flex justify-center items-center px-2">
      <div className="w-full max-w-[500px] h-full">
        <Form pageTitle={"Login"} isLogin={true} />
      </div>
    </div>
  );
};

export default LoginPage;
