import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "../context/profile.context";
import PrivateLayout from "../components/PrivateLayout";

const PrivateRoutes = () => {
  const { profile } = useProfile();
  return profile ? (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  ) : (
    <Navigate to={"/login"} />
  );
};
export default PrivateRoutes;
