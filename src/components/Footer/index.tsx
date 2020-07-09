import {
  AppBar,
  Avatar,
  Box,
  createStyles,
  IconButton,
  Link,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      flexGrow: 1,
    },
    logoAvatar: {
      marginLeft: 4,
      marginRight: 4,
    },
    root: {
      bottom: 0,
      top: 'auto',
    },
  }),
);

const Footer: React.FC = () => {
  const classes = useStyles();
  const repositoryURL = process.env.PACKAGE_JSON_REPOSITORY_URL;
  const version = process.env.PACKAGE_JSON_VERSION;
  const releaseURL = `${repositoryURL}/releases/tag/v${version}`;
  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar>
        <IconButton color="inherit" edge="start" href={repositoryURL}>
          <GitHubIcon />
        </IconButton>
        <Box alignItems="center" className={classes.logo} display="flex" justifyContent="center" position="relative">
          <Typography>Majikku</Typography>
          <Avatar className={classes.logoAvatar} src="/android-chrome-192x192.png" />
          <Typography>Kagami</Typography>
        </Box>
        <Link color="inherit" href={releaseURL}>
          <Typography align="center">v{version}</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

Footer.displayName = 'Footer';

export default Footer;
