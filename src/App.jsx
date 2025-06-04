import { MantineProvider } from "@mantine/core";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import Login from "./pages/Login";
import "@mantine/core/styles.css";
import Signup from "./pages/Signup";
import { ProfileProvider } from "./context/profile.context";
import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Home";
import { CHAT_URL, HOME_URL, LOGIN_URL, SIGNUP_URL } from "./constants";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <HashRouter>
      <MantineProvider defaultColorScheme="auto">
        <ProfileProvider>
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route element={<PublicRoutes />}>
              <Route path={LOGIN_URL} element={<Login />} />
              <Route path={SIGNUP_URL} element={<Signup />} />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path={HOME_URL} element={<Home />} />
              <Route path={CHAT_URL} element={<Chatbot />} />
            </Route>
          </Routes>
        </ProfileProvider>
      </MantineProvider>
    </HashRouter>
  );
}

export default App;
