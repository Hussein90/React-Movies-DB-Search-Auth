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
import firebase from "./fire";

const styles = {
  root: {
    width: "100%",
    marginTop: "0.5em"
  }
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rePassword: "",
      error: "",
      showPassword: false
    };
    this.SignUpAuth = this.SignUpAuth.bind(this);
  }

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  handleValidation = () => {
    const { password, rePassword } = this.state;

    if (password && rePassword && password !== rePassword) {
      this.setState({ error: "Passwords should match" });
    } else {
      this.setState({ error: null });
    }
  };

  handleClickShowPassword = () => {
    const showPassword = !this.state.showPassword;
    this.setState({ showPassword });
  };

  SignUpAuth() {
    return () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          firebase
            .firestore()
            .collection("users")
            .add({
              userid: firebase.auth().currentUser.uid
            });
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
    const { rePassword, error, showPassword } = this.state;

    return (
      <div>
        <FormControl className={classes.root}>
          <Typography variant="h4" gutterBottom align="center">
            Sign Up
          </Typography>
          <TextField required id="standard-name" label="User Name" />
          <br />
          <TextField
            required
            id="standard-multiline-flexible"
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
            error={Boolean(error)}
            helperText={error ? error : null}
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
          <TextField
            required
            id="standard-password-input"
            label="Re-enter Password"
            type={showPassword ? "text" : "password"}
            onChange={this.handleChange("rePassword")}
            onBlur={this.handleValidation}
            value={rePassword}
            error={Boolean(error)}
            helperText={error ? error : null}
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
            onClick={this.SignUpAuth()}
          >
            Submit
          </Button>
          <br />
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(SignUp);
