import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      flex: 1,
      paddingRight: 32,
      textAlign: 'right',
    },
    value: {
      flex: 1,
    },
  }),
);

const SystemInfo: React.FC = () => {
  const classes = useStyles();
  return (
    <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center" marginTop={1}>
      <Box display="flex" justifyContent="center" width="100%">
        <Typography className={classes.label}>CPU Use:</Typography>
        <Typography className={classes.value}>{'cpu'}%</Typography>
      </Box>
      <Box display="flex" justifyContent="center" width="100%">
        <Typography className={classes.label}>RAM Use:</Typography>
        <Typography className={classes.value}>{'memory'}%</Typography>
      </Box>
    </Box>
  );
};

SystemInfo.displayName = 'SystemInfo';

export default SystemInfo;
