import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import firebase from "firebase";
import { Link, withRouter } from "react-router-dom";
import Search from "./Search";

const styles = {
  root: {
    width: "100%",
    marginTop: "0.5em"
  },
  button: {
    color: "#fff"
  }
};

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false
    };
    this.auth = this.auth.bind(this);
  }

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };
  handleClickShowPassword = () => {
    const showPassword = !this.state.showPassword;
    this.setState({ showPassword });
  };

  auth() {
    return () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log("authenticated");
          // window.location.href = "/search";
          this.props.history.push("/search");
        })
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          // ...
        });
    };
  }

  render() {
    const { classes } = this.props;

    const { showPassword } = this.state;
    return (
      <div>
        <FormControl className={classes.root}>
          <Typography variant="h4" gutterBottom align="center">
            Sign In
          </Typography>
          <TextField
            required
            id="standard-name"
            label="E-mail"
            onChange={this.handleChange("email")}
            value={this.state.email}
          />
          <br />
          <TextField
            required
            id="standard-password-input"
            label="Password"
            type={showPassword ? "text" : "password"}
            onChange={this.handleChange("password")}
            onBlur={this.handleValidation}
            value={this.state.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
            onClick={this.auth()}
          >
            Submit
          </Button>
          <br />
        </FormControl>
      </div>
    );
  }
}

const composed = withStyles(styles)(SignIn);

export default withRouter(composed);
