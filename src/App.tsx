import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Routes,
} from "react-router-dom";
import AllUsers from "./page/admin/AllUsers";
import CreateUser from "./page/admin/CreateUser";
import CompareUsers from "./page/admin/CompareUsers";
import AdminUserInfo from "./page/admin/UserInfo";
import CompanyAlertness from "./page/user/CompanyAlertness";
import Home from "./page/user/Home";
import UserInfo from "./page/user/UserInfo";
import WorkerInfo from "./page/user/WorkerInfo";
import CreateWorker from "./page/user/CreateWorker";
import AllWorkers from "./page/user/AllWorkers";
import CompareWorkers from "./page/user/CompareWorkers";
import Auth from "./page/Auth";
import Guide from "./page/Guide";
import About from "./page/About";
import Layout from "./layout/Layout";
import { adminRoutes } from "./data/adminRoutes";
import RegisterUser from "./page/admin/RegisterUser";
import { userRoutes } from "./data/userRoutes";
import { useAppSelector } from "./redux/hooks";
import { selectUser } from "./redux/slice/user-slice";
import AlertMessage from "./components/AlertMessage";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
function App() {
  

  const userState = useAppSelector(selectUser);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<Navigate to="/user/home" />}>
        <Route
          path="auth"
          element={userState ? <Navigate to="/user/home" replace /> : <Auth />}
        />

        <Route
          path="admin"
          element={
            userState ? (
              !userState.isAdmin && <Navigate to="/user/home" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        >
          <Route element={<Layout routes={adminRoutes} />}>
            <Route path="" element={<Navigate to="/admin/home" replace />} />
            <Route path="home" element={<AllUsers />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="compare-users" element={<CompareUsers />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="register-user" element={<RegisterUser />} />
            <Route path="user-info/:id" element={<AdminUserInfo />} />
          </Route>
        </Route>

        <Route
          path="user"
          element={
            userState ? (
              userState.isAdmin && <Navigate to="/admin/home" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        >
          <Route element={<Layout routes={userRoutes} />}>
            <Route path="" element={<Navigate to="/user/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="Employees" element={<AllWorkers />}></Route>
            <Route
              path="employees/compare-employees"
              element={<CompareWorkers />}
            />
            <Route
              path="employees/employee-info/:id"
              element={<WorkerInfo />}
            />
            <Route path="create-employee" element={<CreateWorker />} />
            <Route path="company-info" element={<UserInfo />} />
            <Route path="company-alertness" element={<CompanyAlertness />} />
            <Route path="guide" element={<Guide />} />
            <Route path="about" element={<About />} />
          </Route>
        </Route>
        <Route path="" element={<Navigate to="/auth" replace />}></Route>
      </Route>
    )
  );

  return (
    <div className="h-screen">
      <RouterProvider router={router} />
      <AlertMessage />
    </div>
  );
}

export default App;
{
  /* <Button onClick={() => i18next.changeLanguage("fa")}>fa</Button>
<Button onClick={() => i18next.changeLanguage("en")}>en</Button> */
}
