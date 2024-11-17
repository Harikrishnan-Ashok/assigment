import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./style.css";
import { useContext } from "react";
import { ViewContext } from "../../context/ViewContext";

export default function Navbar() {
  const { view, handleViewChange } = useContext(ViewContext);

  return (
    <Box>
      <AppBar className="appbar">
        <Toolbar>
          <Box className="navbtn">
            <Button variant="outlined" color="inherit">
              Today
            </Button>
            <Button variant="outlined" color="inherit">
              &lt;
            </Button>
            <Button variant="outlined" color="inherit">
              &gt;
            </Button>
          </Box>
          <ToggleButtonGroup
            className="viewgrp"
            value={view}
            exclusive
            onChange={handleViewChange}
          >
            <ToggleButton value={0}>1 Day</ToggleButton>
            <ToggleButton value={1}>2 Day</ToggleButton>
            <ToggleButton value={2}>1 Week</ToggleButton>
            <ToggleButton value={3}>2 Week</ToggleButton>
            <ToggleButton value={4}>1 Month</ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
