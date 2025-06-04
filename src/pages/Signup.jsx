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
import { register } from "../utils/api";
import { useState } from "react";
import { useProfile } from "../context/profile.context";
import { useForm } from "@mantine/form";

const MobileSignup = ({ onSubmit, err }) => {
  const form = useForm({
    initialValues: {
      uname: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      uname: (value) => (value.length != 0 ? null : "Name Required"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least of 6 characters",
    },
  });
  return (
    <Center>
      <Fieldset legend="Signup" style={{ width: "100%", maxWidth: 500 }}>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Name"
            {...form.getInputProps("uname")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Email"
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
              Already have account ? <Link to={"/login"}>Login Here</Link>
            </Text>
          </Group>
          <Group justify="flex-end" mt="md">
            <Button type="submit">Register</Button>
          </Group>{" "}
        </form>
      </Fieldset>
    </Center>
  );
};

const Signup = () => {
  const { isMobile } = useScreen();
  const { loggedIn } = useProfile();
  const [err, setErr] = useState(null);
  const onSubmit = async ({ email, password, uname }) => {
    console.log(email, password, uname);
    if (email == "" && password == "" && uname == "")
      return setErr("All Fields are required !");
    await register({ email, password, uname });
    loggedIn();
  };
  return isMobile ? (
    <MobileSignup onSubmit={() => console.log("Clicked")} err={err} />
  ) : (
    <SimpleGrid cols={2}>
      <BrandBanner secondaryText={"Signup"} />{" "}
      <MobileSignup onSubmit={onSubmit} err={err} />
    </SimpleGrid>
  );
};
export default Signup;
