import { Box, Typography } from '@material-ui/core';
import { useOS } from 'components/providers/OSProvider';
import React from 'react';

const SystemUptime: React.FC = () => {
  const { systemUptimeInWords } = useOS();
  return (
    <Box alignItems="center" display="flex" justifyContent="center" marginTop={1}>
      <Typography>{systemUptimeInWords}</Typography>
    </Box>
  );
};

SystemUptime.displayName = 'SystemUptime';

export default SystemUptime;
