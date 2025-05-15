import { Container } from "@mantine/core";
import Main from "./pages/main";

export default function Home() {
  return (
    <Container fluid className="w-full !h-full !p-0">
      <Main />
    </Container>
  );
}
