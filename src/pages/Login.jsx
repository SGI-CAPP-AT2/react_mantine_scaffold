import {
  Alert,
  Button,
  Center,
  Fieldset,
  Group,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { useScreen } from "../context/screen.context";
import BrandBanner from "../components/BrandBanner";
import { Link } from "react-router-dom";
import { login } from "../utils/api";
import { useState } from "react";
import { useProfile } from "../context/profile.context";
import { useForm } from "@mantine/form";

const MobileLogin = ({ onSubmit, err }) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least of 6 characters",
    },
  });
  return (
    <Center>
      <Fieldset legend="Login" style={{ width: "100%", maxWidth: 500 }}>
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Email"
            mt="md"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="password"
            placeholder="xyz@11"
            type="password"
            {...form.getInputProps("password")}
          />
          {err && (
            <Alert style={{ marginTop: "10px" }} color="red">
              {err}
            </Alert>
          )}
          <Group justify="flex-end" mt="md">
            <Text>
              Don't have account ? <Link to={"/signup"}>Create one</Link>
            </Text>
          </Group>
          <Group justify="flex-end" mt="md">
            <Button type="submit">Login</Button>
          </Group>{" "}
        </form>
      </Fieldset>
    </Center>
  );
};

const Login = () => {
  const { isMobile } = useScreen();
  const { loggedIn } = useProfile();
  const [err, setErr] = useState("");
  const onSubmit = async ({ email, password }) => {
    if (email == "" && password == "")
      return setErr("All Fields are required !");
    await login({ email, password });
    loggedIn();
  };
  return isMobile ? (
    <MobileLogin onSubmit={onSubmit} err={err} />
  ) : (
    <SimpleGrid cols={2}>
      <BrandBanner secondaryText={"Login"} />{" "}
      <MobileLogin onSubmit={onSubmit} err={err} />
    </SimpleGrid>
  );
};
export default Login;
