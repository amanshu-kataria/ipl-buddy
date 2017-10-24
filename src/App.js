import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import Divider from "material-ui/Divider";
import Stats from "./stats.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isDrawerOpen: false
    };
    this.handleDrawer = this.handleDrawer.bind(this);
  }

  handleDrawer() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  }
  render() {
    return (
      <MuiThemeProvider>
        <Drawer open={this.state.isDrawerOpen}>
          <AppBar
            style={{ backgroundColor: "#424242" }}
            showMenuIconButton={false}
            iconElementRight={
              <IconButton>
                <NavigationArrowBack />
              </IconButton>
            }
            onRightIconButtonTouchTap={this.handleDrawer}
            title="Data"
          />
          <MenuItem>Matches</MenuItem>
          <Divider />
          <MenuItem>Deliveries</MenuItem>
          <Divider />
        </Drawer>
        <AppBar
          style={{
            backgroundColor: "#424242",
            position: "fixed"
          }}
          onLeftIconButtonTouchTap={this.handleDrawer}
          title="IPL Buddy"
        />
        <Stats />
      </MuiThemeProvider>
    );
  }
}

export default App;
