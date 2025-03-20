import { TaskBoard } from "@/pages/main/pages/TaskBoard.tsx";
import { Navigate, Route, Routes } from "react-router";
import { memo } from "react";
import { MainLayout } from "@/pages/main/components/MainLayout.tsx";
import { FeatureRequests } from "@/pages/main/pages/FeatureRequests.tsx";

type RouteList = {
  id: number;
  path: string;
  element: React.ReactNode;
  canAccess?: string[];
  mustHaveAccess?: string[];
};

const MainRoutesList = memo(() => {
  const initialRoutes: RouteList[] = [
    {
      id: 1,
      path: "/tracusaSync/taskBoard",
      element: <TaskBoard />

    },
    {
      id: 2,
      path: "/tracusaSync/featuresRequest",
      element: <FeatureRequests />
    },
    {
      id: 3,
      path: "/*",
      element: <Navigate to={"/tracusaSync/taskBoard"} />
    }
  ];

  // const [listRoutes, setListRoutes] = useState<RouteList[]>(initialRoutes);

  // useEffect(() => {
  //   const filteredRoutes = initialRoutes.filter((route) => {
  //     // Check 'canAccess' condition
  //     if (
  //       route.canAccess?.some((role) =>
  //         access.some((userRole: any) => userRole["objeto"] === role)
  //       )
  //     ) {
  //       return true;
  //     }
  //
  //     // Check 'mustHaveAccess' condition
  //     if (
  //       route.mustHaveAccess?.every((role) =>
  //         access.some((userRole: any) => userRole["objeto"] === role)
  //       )
  //     ) {
  //       return true;
  //     }
  //
  //     return false;
  //   });
  //
  //   setListRoutes(filteredRoutes);
  // }, [access]);

  return (
    <Routes>
      {initialRoutes.map((v) => (
        <Route key={v.id} path={v.path} element={v.element} />
      ))}
    </Routes>
  );
});

export const MainRoutes = () => {
  // const [verifyToken] = useLazyVerifyTokenQuery({ pollingInterval: 30000 });
  // const token = localStorage.getItem("token");
  // const ambiente = localStorage.getItem("ambiente");
  //
  // useEffect(() => {
  //   let unsubscribe = false;
  //   if (!unsubscribe && localStorage.getItem("token") !== null)
  //     verifyToken(null);
  //
  //   return () => {
  //     unsubscribe = true;
  //   };
  // }, []);
  //
  // if (!token && ambiente === null) {
  //   return <Navigate to={"/planPadrino/identity/login"} replace={true} />;
  // }

  return (
    <MainLayout>
      <MainRoutesList

      />
    </MainLayout>
  );
};