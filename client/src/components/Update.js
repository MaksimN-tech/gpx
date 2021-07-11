import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [msg, setMsg] = useState("");

  function update(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const surname = e.target.surname.value;
    const token = localStorage.getItem("token");

    fetch(`http://localhost:4000/change_name`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 1) {
          setMsg("updated");
          history.push("/");
        }
        if (data.error === 1) {
          throw new Error(data.error_description);
        }
      })
      .catch((err) => {
        setMsg(err.message)
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <DynamicFeedIcon color="inherit" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update
        </Typography>
        <form onSubmit={(e) => update(e)} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="surname"
            label="Surname"
            type="surname"
            id="surname"
            autoComplete="current-surname"
          />
          {msg && (
            <Typography component="h4" variant="h5">
              updated
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
}
