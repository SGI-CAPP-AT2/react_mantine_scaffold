import { Center, Container, Divider, Image, Title } from "@mantine/core";
import { useScreen } from "../context/screen.context";
import { BRAND_NAME } from "../constants";
import logo from "../assets/logo.svg";

const BrandBanner = ({ secondaryText }) => {
  const { height } = useScreen();
  return (
    <Container h={height}>
      <Center h={height}>
        <Container>
          <Center>
            <Image src={logo} />
          </Center>
          <Title order={1}>{BRAND_NAME}</Title>
          <Divider />
          <Center>
            <Title order={2}>{secondaryText} </Title>
          </Center>
        </Container>
      </Center>
    </Container>
  );
};
export default BrandBanner;
