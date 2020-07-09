import {
  Box,
  Container,
  createStyles,
  FormControlLabel,
  makeStyles,
  Switch,
  TextField,
  Theme,
  Grid,
} from '@material-ui/core';
import {
  AccessTime as AccessTimeIcon,
  BarChart as BarChartIcon,
  LaptopMac as LaptopMacIcon,
  Memory as MemoryIcon,
  MyLocation as MyLocationIcon,
  Timer as TimerIcon,
  Wallpaper as WallpaperIcon,
} from '@material-ui/icons';
import AdminCard from 'components/AdminCard';
import CPULoad from 'components/CPULoad';
import Footer from 'components/Footer';
import Header from 'components/Header';
import OSProvider from 'components/providers/OSProvider';
import { useSettings } from 'components/providers/SettingsProvider';
import SystemInfo from 'components/SystemInfo';
import SystemUptime from 'components/SystemUptime';
import SystemUsage from 'components/SystemUsage';
import { NextPage } from 'next';
import React from 'react';
import { useAuth } from 'components/providers/AuthProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(7),
      padding: theme.spacing(2),
    },
  }),
);

const SettingsPage: NextPage = () => {
  const { user } = useAuth({ redirectTo: '/admin/login' });
  const { displayDate, displayWallpapers, isInitialized, location, updateSetting } = useSettings();
  const classes = useStyles();
  const updateField = (field: string, accessor: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSetting({ [field]: e.target[accessor] });
  };
  return isInitialized && user ? (
    <OSProvider>
      <Header />
      <Container className={classes.root} component="main" maxWidth={false}>
        <Grid alignItems="stretch" container justify="center" spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AdminCard icon={BarChartIcon} title="CPU Load Average">
              <CPULoad />
            </AdminCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AdminCard icon={MemoryIcon} title="CPU & Memory Usage">
              <SystemUsage />
            </AdminCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AdminCard icon={LaptopMacIcon} title="System Information">
              <SystemInfo />
            </AdminCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AdminCard icon={TimerIcon} title="System Uptime">
              <SystemUptime />
            </AdminCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AdminCard icon={AccessTimeIcon} title="Date & Time">
              <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center" marginTop="4px">
                <FormControlLabel
                  control={
                    <Switch checked={displayDate} color="primary" onChange={updateField('displayDate', 'checked')} />
                  }
                  label="Display date"
                />
              </Box>
            </AdminCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AdminCard icon={MyLocationIcon} title="Geolocation">
              <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center" marginTop="4px">
                <TextField
                  label="Location"
                  color="primary"
                  margin="dense"
                  onChange={updateField('location', 'value')}
                  placeholder="City, Country"
                  type="text"
                  value={location}
                />
              </Box>
            </AdminCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AdminCard icon={WallpaperIcon} title="Wallpapers">
              <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center" marginTop="4px">
                <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center" marginTop="4px">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={displayWallpapers}
                        color="primary"
                        onChange={updateField('displayWallpapers', 'checked')}
                      />
                    }
                    label="Display on screen"
                  />
                </Box>
              </Box>
            </AdminCard>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </OSProvider>
  ) : null;
};

SettingsPage.displayName = 'SettingsPage';

export default SettingsPage;
