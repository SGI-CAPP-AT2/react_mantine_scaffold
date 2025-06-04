import { Flex, Image, Text } from "@mantine/core";
import logo from "../assets/logo.svg";
import { BRAND_NAME } from "../constants";

const Branding = () => {
  return (
    <Flex justify={"space-between"}>
      <Image src={logo} h={25} />
      <Text ml={10}>{BRAND_NAME}</Text>
    </Flex>
  );
};
export default Branding;
