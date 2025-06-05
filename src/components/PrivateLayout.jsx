import {
  AppShell,
  Burger,
  Button,
  Group,
  Menu,
  NavLink,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ScreenProvider } from "../context/screen.context";
import { useRef } from "react";
import Branding from "./Branding";
import { useProfile } from "../context/profile.context";
import { useNavigate } from "react-router-dom";
import { CHAT_URL } from "../constants";
import { ChevronRightIcon, SparklesFillIcon } from "@primer/octicons-react";

const PrivateLayout = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const { profile, logoutProfile } = useProfile();
  const mainRef = useRef();
  const logoutClicked = () => {
    logoutProfile();
  };
  const navigate = useNavigate();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

          <Group justify="space-between" style={{ flex: 1 }}>
            <Branding />
            <Menu withArrow>
              <Menu.Target>
                <Group ml="xl" gap={20} visibleFrom="sm">
                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {profile.uname}
                    </Text>
                    <Text c="dimmed" size="xs">
                      {profile.email}
                    </Text>
                  </div>
                  <ChevronRightIcon />
                </Group>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component="button" onClick={logoutClicked}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          onClick={() => navigate(CHAT_URL)}
          label="Chat"
          leftSection={<SparklesFillIcon size={16} stroke={1.5} />}
        />
      </AppShell.Navbar>
      <AppShell.Main ref={mainRef}>
        <ScreenProvider mainRef={mainRef}>{children}</ScreenProvider>
      </AppShell.Main>
    </AppShell>
  );
};

export default PrivateLayout;
