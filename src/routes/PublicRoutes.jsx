import { Navigate, Outlet } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import { useProfile } from "../context/profile.context";

const PublicRoutes = () => {
  const { profile } = useProfile();
  return profile ? (
    <Navigate to={"/"} />
  ) : (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};
export default PublicRoutes;
