import React from "react";
import Form from "../Form/LoginSignupForm/Form";

const LoginPage = () => {
  return (
    <div className="h-full w-full px-2 pt-10">
      <Form pageTitle={"Login"} isLogin={true} />
    </div>
  );
};

export default LoginPage;
