import { SignIn } from "@clerk/clerk-react";

const Signin = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-neutral-950">
      <SignIn />
    </div>
  )
}

export default Signin;