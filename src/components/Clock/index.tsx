import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { useSettings } from 'components/providers/SettingsProvider';
import { format } from 'date-fns';
import useInterval from 'hooks/useInterval';
import React, { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    date: {
      textTransform: 'capitalize',
    },
  }),
);

const dateFormat = 'EEEE, MMMM d';
const timeFormat = 'hh:mm';
const periodFormat = 'a';

const Clock: React.FC = () => {
  const classes = useStyles();
  const { displayDate } = useSettings();
  const [now, setNow] = useState(new Date());
  const date = format(now, dateFormat);
  const time = format(now, timeFormat);
  const period = format(now, periodFormat).toLowerCase();
  useInterval(() => setNow(new Date()), 1000);
  return (
    <Box textAlign="right">
      {displayDate && (
        <Typography className={classes.date} variant="h4">
          {date}
        </Typography>
      )}
      <Typography display="inline" variant="h1">
        {time}
      </Typography>
      <Typography display="inline" variant="h4">
        {period}
      </Typography>
    </Box>
  );
};

Clock.displayName = 'Clock';

export default Clock;
