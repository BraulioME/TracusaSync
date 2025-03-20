import { JSX } from "react";

interface AuthProps {
  children: JSX.Element;
}


export const AuthLayout = ({ children }: AuthProps) => {

  return (
    <main
      className={"h-screen flex justify-center items-center max-w-[1200px] mx-auto p-6"}>
      {children}
    </main>
  );
};