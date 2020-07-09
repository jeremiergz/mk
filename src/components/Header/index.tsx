import {
  AppBar,
  Breadcrumbs,
  Button,
  createStyles,
  IconButton,
  Link,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ExitToApp as ExitToAppIcon, Home as HomeIcon } from '@material-ui/icons';
import { useAuth } from 'components/providers/AuthProvider';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumb: {
      textTransform: 'capitalize',
    },
    breadcrumbs: {
      flexGrow: 1,
    },
    env: {
      fontSize: 10,
      marginRight: theme.spacing(1),
      textTransform: 'uppercase',
    },
    homeButton: {
      marginRight: theme.spacing(2),
    },
    logoutIcon: {
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    logoutText: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  }),
);

const Header: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const classes = useStyles();
  const breadcrumbs = router.pathname.match(/(?!\/)[\w-_]+/g);
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.homeButton} color="inherit" edge="start">
          <NextLink href="/">
            <HomeIcon />
          </NextLink>
        </IconButton>
        <Breadcrumbs className={classes.breadcrumbs}>
          {breadcrumbs.map((b, i) => {
            const href = `/${breadcrumbs.slice(0, ++i).join('/')}`;
            return (
              <NextLink href={href} key={href}>
                <Link className={classes.breadcrumb} color="inherit" href={href}>
                  {b}
                </Link>
              </NextLink>
            );
          })}
        </Breadcrumbs>
        {process.env.NODE_ENV !== 'production' && (
          <Typography align="center" className={classes.env}>
            {process.env.NODE_ENV.substring(0, 3)}
          </Typography>
        )}
        {user && (
          <>
            <Button className={classes.logoutText} color="inherit" href="/api/auth/logout">
              Logout
            </Button>
            <IconButton className={classes.logoutIcon} color="inherit" href="/api/auth/logout">
              <ExitToAppIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

Header.displayName = 'Header';

export default Header;
