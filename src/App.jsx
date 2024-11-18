import { Container } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import BasicTimeline from "./components/timeline/BasicTimeline";
import "./App.css";
export default function App() {
  return (
    <>
      <Navbar></Navbar>
      <Container className="cont">
        <BasicTimeline></BasicTimeline>
      </Container>
    </>
  );
}
