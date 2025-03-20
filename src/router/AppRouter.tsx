import { Route, Routes } from "react-router";
import { AuthRoutes } from "../pages/auth/routes/AuthRoutes.tsx";
import { MainRoutes } from "@/pages/main/routes/MainRoutes.tsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={"/tracusaSync/identity/*"} element={<AuthRoutes />} />
      <Route path={"/*"} element={<MainRoutes />} />
    </Routes>
  );
};