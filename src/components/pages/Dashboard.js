import React from "react";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";

function Dashboard() {
  const bstyle = { margin: "15px 0", backgroundColor: "#02ced1" };
  return (
    <div>
      <Box align="center">
        <h1>Welcome Back Admin01!</h1>
        <br></br>

        <Button
          type="submit"
          color="primary"
          style={bstyle}
          variant="contained"
        >
          Log Out
        </Button>
      </Box>
    </div>
  );
}

export default Dashboard;
