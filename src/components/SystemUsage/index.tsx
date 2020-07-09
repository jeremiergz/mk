import { Box, createStyles, makeStyles, Typography } from '@material-ui/core';
import { useOS } from 'components/providers/OSProvider';
import React from 'react';

const useStyles = makeStyles(() =>
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

const SystemUsage: React.FC = () => {
  const { cpuCoresNumber, totalMemoryUsageInPercent } = useOS();
  const classes = useStyles();
  return (
    <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center" marginTop={1}>
      <Box display="flex" justifyContent="center" width="100%">
        <Typography className={classes.label}>CPU Cores:</Typography>
        <Typography className={classes.value}>{cpuCoresNumber}</Typography>
      </Box>
      <Box display="flex" justifyContent="center" width="100%">
        <Typography className={classes.label}>RAM Use:</Typography>
        <Typography className={classes.value}>{totalMemoryUsageInPercent}%</Typography>
      </Box>
    </Box>
  );
};

SystemUsage.displayName = 'SystemUsage';

export default SystemUsage;
