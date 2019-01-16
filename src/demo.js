import React from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { createMuiTheme } from "@material-ui/core/styles";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Search from "./Search";
import FavList from "./FavList";
import { Switch, Route, Link } from "react-router-dom";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const useStyles = makeStyles(
  theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    },
    container: {
      width: "50%"
    },
    content: {
      padding: "0 1em"
    }
  }),
  { defaultTheme: theme }
);

function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState("/");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {!(
          window.location.pathname.toLowerCase().endsWith("search") ||
          window.location.pathname.toLowerCase().endsWith("favlist")
        ) && (
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Sign In" component={Link} value="/" to="/" />
              <Tab
                component={Link}
                label="Sign Up"
                value="/sign-up"
                to="/sign-up"
              />
            </Tabs>
          </AppBar>
        )}

        <Switch>
          <Route exact path="/favlist" render={() => <FavList />} />
          <Route exact path="/search" render={() => <Search />} />
          <Route exact path="/" render={() => <SignIn />} />
          <Route path="/sign-up" render={() => <SignUp />} />
        </Switch>
      </div>
    </div>
  );
}

export default SimpleTabs;
