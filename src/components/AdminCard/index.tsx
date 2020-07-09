import { Card, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: 8,
    },
    root: {
      height: '100%',
      justifyContent: 'center',
    },
    title: {
      alignItems: 'center',
      color: theme.palette.grey.A200,
      display: 'flex',
    },
  }),
);

const AdminCard: React.FC<AdminCardProps> = ({ children, icon, title }) => {
  const classes = useStyles();
  const SVGIcon = icon;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="button">
          <SVGIcon className={classes.icon} />
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

AdminCard.displayName = 'AdminCard';

export type AdminCardProps = {
  icon: SvgIconComponent;
  title: string;
};
export default AdminCard;
