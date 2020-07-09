import {
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  createStyles,
  FormControlLabel,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { Lock as LockIcon } from '@material-ui/icons';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { useAuth } from 'components/providers/AuthProvider';
import OSProvider from 'components/providers/OSProvider';
import { NextPage } from 'next';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { AUTH_LOGIN_ERROR } from 'utils/messages';
import { apiFetch } from 'utils/web';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 384,
      width: '100%',
    },
    cardContent: {
      height: '100%',
    },
    cardIcon: {
      marginRight: 8,
    },
    cardTitle: {
      alignItems: 'center',
      color: theme.palette.grey.A200,
      display: 'flex',
      justifyContent: 'center',
    },
    rememberMe: {
      marginTop: theme.spacing(3),
    },
    root: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(2),
    },
    submit: {
      marginTop: theme.spacing(3),
    },
  }),
);

const LoginPage: NextPage = () => {
  const { isInitialized, setJWT, setUser } = useAuth({ redirectTo: '/admin/settings', redirectIfFound: true });
  const emailFieldRef = useRef<HTMLInputElement>();
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const classes = useStyles();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const formData = {
      email: e.target[0].value,
      password: e.target[1].value,
      rememberMe: e.target[2].checked,
    };
    apiFetch('/auth/login', { body: formData, method: 'POST' })
      .then(({ jwt, user }: API.Auth.Login.POSTResponse) => {
        closeSnackbar();
        setJWT(jwt);
        setUser(user);
      })
      .catch(() => {
        setIsSubmitted(false);
        enqueueSnackbar(AUTH_LOGIN_ERROR, { variant: 'error' });
      });
  };
  useEffect(() => {
    if (emailFieldRef.current) {
      emailFieldRef.current.focus();
      emailFieldRef.current.selectionStart = emailFieldRef.current.selectionEnd = emailFieldRef.current.value.length;
    }
  }, [isInitialized]);
  return (
    <OSProvider>
      <Header />
      <Container className={classes.root} component="main" maxWidth={false}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.cardTitle} variant="button">
              <LockIcon className={classes.cardIcon} />
              Login
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                autoComplete="email"
                autoFocus
                defaultValue={
                  (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_LOGIN_DEV_EMAIL) || null
                }
                fullWidth
                inputRef={emailFieldRef}
                label="Email"
                margin="normal"
                name="email"
              />
              <TextField
                autoComplete="current-password"
                defaultValue={
                  (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_LOGIN_DEV_PASSWORD) || null
                }
                fullWidth
                label="Password"
                margin="normal"
                name="password"
                type="password"
              />
              <FormControlLabel
                className={classes.rememberMe}
                control={<Checkbox color="primary" name="remember-me" />}
                label="Remember me"
              />
              <Button
                className={classes.submit}
                color="primary"
                disabled={!isInitialized || isSubmitted}
                fullWidth
                type="submit"
                variant="contained"
              >
                {!isInitialized || isSubmitted ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </OSProvider>
  );
};

LoginPage.displayName = 'LoginPage';

export default LoginPage;
