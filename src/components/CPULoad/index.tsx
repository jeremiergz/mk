import { Box, createStyles, makeStyles, Typography } from '@material-ui/core';
import { useOS } from 'components/providers/OSProvider';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    divider: {
      marginLeft: 16,
      marginRight: 16,
    },
  }),
);

const cpuLoadTimings = ['1min', '5min', '15min'];

const CPULoad: React.FC = () => {
  const { loadAverage = [0, 0, 0] } = useOS();
  const classes = useStyles();
  return (
    <Box alignItems="center" display="flex" justifyContent="center" marginTop={1}>
      <Box display="flex" flexDirection="column">
        <Box display="flex">
          {loadAverage.map((n, i) => (
            <Box display="flex" key={i + n} width={i < 2 ? 80 : 'auto'}>
              <Typography>{n.toFixed(2)}</Typography>
              {i < 2 && <Typography className={classes.divider}>|</Typography>}
            </Box>
          ))}
        </Box>
        <Box display="flex" justifyContent="space-between">
          {cpuLoadTimings.map((v, i) => (
            <Box display="flex" key={v} width={i < 2 ? 80 : 'auto'}>
              <Typography color="textSecondary" variant="caption">
                {v}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

CPULoad.displayName = 'CPULoad';

export default CPULoad;
