import { createContext, useContext, useEffect, useState } from "react";
import { getUserDetails, logout } from "../utils/api";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const loggedIn = async () => {
    console.log("CALL FROM LOGGED IN");
    const _profile = await getUserDetails();
    if (_profile) setProfile(_profile);
  };
  const logoutProfile = async () => {
    console.log("LOGOUT");
    await logout();
    console.log("LOGOUT /");
    setProfile(null);
  };
  useEffect(() => {
    console.log("CALL FROM EFFECT");
    loggedIn();
  }, []);
  return (
    <ProfileContext.Provider value={{ profile, loggedIn, logoutProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
