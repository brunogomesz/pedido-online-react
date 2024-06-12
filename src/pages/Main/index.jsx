import React from "react";

import { Sidebar } from "../../components/Sidebar";

import { Container} from "./styles";

export default function Main() {
  return (
    <Container>
      <Sidebar />
      <h1>Main2</h1>
    </Container>
  );
}
