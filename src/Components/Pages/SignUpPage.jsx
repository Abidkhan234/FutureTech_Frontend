import Form from "../Form/LoginSignupForm/Form";
import { motion } from "motion/react";

const SignUpPage = () => {
  return (
    <div className="w-full h-full px-2 flex justify-center items-center pt-10">
      <Form pageTitle={"Sign Up"} isLogin={false} />
    </div>
  );
};

export default SignUpPage;
