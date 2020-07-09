import { Box, makeStyles } from '@material-ui/core';
import { useSettings } from 'components/providers/SettingsProvider';
import { useWallpapers } from 'components/providers/WallpapersProvider';
import _shuffle from 'lodash.shuffle';
import React, { useEffect, useState } from 'react';
import { animated, config, useTransition } from 'react-spring';

const useStyles = makeStyles({
  background: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 4,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    willChange: 'opacity',
  },
});

const Wallpapers: React.FC = () => {
  const { displayWallpapers } = useSettings();
  const { wallpapers } = useWallpapers();
  const slides = _shuffle(wallpapers);
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const transitions = useTransition(slides[index] || [], item => item.hsh, {
    config: config.molasses,
    enter: { opacity: 1 },
    from: { opacity: 0 },
    leave: { opacity: 0 },
  });
  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % slides.length), 1000 * 60 * 10);
    return () => clearInterval(interval);
  }, [slides]);
  return displayWallpapers ? (
    <Box height={256} margin="auto" maxWidth={768} position="relative" width="100%">
      {transitions.map(({ item, key, props }) => (
        <animated.div
          key={key}
          className={classes.background}
          style={{
            ...props,
            backgroundImage: `url(${item?.url}`,
          }}
        />
      ))}
    </Box>
  ) : null;
};

Wallpapers.displayName = 'Wallpapers';

export default Wallpapers;
