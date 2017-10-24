import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Stats from "./stats.js";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          style={{
            backgroundColor: "#424242",
            position: "fixed"
          }}
          showMenuIconButton={false}
          title="IPL Buddy"
        />
        <Stats />
      </MuiThemeProvider>
    );
  }
}

export default App;
