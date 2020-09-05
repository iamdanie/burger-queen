import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Typography, makeStyles } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles(({ spacing, palette }) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500
  },
  subHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    marginBottom: spacing(1),
    color: 'rgba(0, 0, 0, 0.54)',
    '&:hover': {
      backgroundColor: 'initial',
      color: palette.common.black
    }
  },
  subHeaderIcon: {
    padding: 0,
    marginRight: spacing(1),
    color: 'inherit'
  },
  subHeaderText: {
    lineHeight: 1,
    color: 'inherit'
  }
}));

function ScreenHeader({ text, previous = null }) {
  const classes = useStyles();
  return (
    <header>
      {previous ? (
        <Link to={previous.route} className={classes.subHeaderWrapper}>
          <IconButton className={classes.subHeaderIcon} aria-label="Go Back">
            <ArrowBack style={{ fontSize: 16 }} />
          </IconButton>
          <Typography
            className={classes.subHeaderText}
            variant="overline"
            component="span"
          >
            {previous.text}
          </Typography>
        </Link>
      ) : null}
      <Typography className={classes.header} variant="h5" component="h2">
        {text}
      </Typography>
    </header>
  );
}

export default ScreenHeader;
