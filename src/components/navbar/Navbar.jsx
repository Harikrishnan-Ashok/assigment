import { useContext } from "react";
import { ViewContext } from "../../context/ViewContext";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./style.css";

export default function Navbar() {
  const { view, handleViewChange, handleMoveChange } = useContext(ViewContext);

  return (
    <Box>
      <AppBar className="appbar" position="sticky">
        <Toolbar>
          <Box className="navbtn">
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => handleMoveChange(0)}
            >
              Today
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => handleMoveChange(-1)}
            >
              &lt;
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => handleMoveChange(1)}
            >
              &gt;
            </Button>
          </Box>
          <ToggleButtonGroup
            className="viewgrp"
            exclusive
            value={view}
            onChange={(event, newView) => handleViewChange(newView)}
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
