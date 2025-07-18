import Form from "../Form/LoginSignupForm/Form";
import { motion } from "motion/react";

const SignUpPage = () => {
  return (
    <div className="md:min-h-[89.2vh] min-h-[90.5vh] w-full flex justify-center items-center px-2">
      <div className="w-full max-w-[500px] h-full">
        <Form pageTitle={"Sign Up"} isLogin={false} />
      </div>
    </div>
  );
};

export default SignUpPage;
