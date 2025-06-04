import { AppShell, Burger, Button, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Branding from "./Branding";
import { ScreenProvider } from "../context/screen.context";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PublicLayout = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let isLogin = false;

  if (pathname == "/login") isLogin = true;
  else isLogin = false;

  const mainRef = useRef();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Branding />
            <Group ml="xl" gap={20} visibleFrom="sm">
              {!isLogin ? (
                <Button onClick={() => navigate("/login")}>Login</Button>
              ) : (
                <Button onClick={() => navigate("/signup")}>Sign up</Button>
              )}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar py="md" px={4}>
        {!isLogin ? (
          <NavLink onClick={() => navigate("/login")} label="Login" />
        ) : (
          <NavLink onClick={() => navigate("/signup")} label="Signup" />
        )}
      </AppShell.Navbar>
      <AppShell.Main ref={mainRef}>
        <ScreenProvider mainRef={mainRef}>{children}</ScreenProvider>
      </AppShell.Main>
    </AppShell>
  );
};

export default PublicLayout;
