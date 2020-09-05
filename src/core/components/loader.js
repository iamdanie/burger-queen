import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing(2)
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
}));

export default function Loader({ fullScreen }) {
  const classes = useStyles();
  let classNames = classes.container;

  if (fullScreen) {
    classNames = `${classNames} ${classes.fullScreen}`;
  }

  return (
    <div className={classNames}>
      <CircularProgress />
    </div>
  );
}

Loader.defaultProps = {
  fullScreen: false
};

Loader.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};
