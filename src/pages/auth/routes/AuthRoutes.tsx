import { Navigate, Route, Routes } from "react-router";
import { Login } from "../pages/Login.tsx";
import { RecoverPassword } from "../pages/RecoverPassword.tsx";
import { ResetPassword } from "../pages/ResetPassword.tsx";

export const AuthRoutes = () => {
  const token = localStorage.getItem("token");
  const ambiente = localStorage.getItem("ambiente");

  if (token && ambiente !== null) {
    return <Navigate to={"/tracusaSync/"} replace={true} />;
  }

  localStorage.removeItem("token");
  localStorage.removeItem("ambiente");

  return (
    <Routes>
      <Route path={"login"} element={<Login />} />
      <Route path={"/password"}>
        <Route path={"reset"} element={<RecoverPassword />} />
        <Route path={"reset/:uniqueString"} element={<ResetPassword />} />
      </Route>
      <Route path={"/*"} element={<Navigate to={"/identity/login"} />} />
    </Routes>
  );
};