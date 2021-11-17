import { Button, Grid, Paper, Typography, withStyles } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import StyledButton from '@mui/material/Button';
import styles from './card.style';

const CardWrapper = ({
  id,
  classes,
  title,
  children,
  primaryLabel,
  secondaryLabel,
  onClickPrimary,
  onClickSecondary,
  isDisabled,
}) => (
  <Paper className={classes.root} elevation={1}>
    <Grid container spacing={5} className={classes.header}>
      <Grid
        item
        lg={secondaryLabel !== '' ? 7 : 12}
        md={secondaryLabel !== '' ? 6 : 12}
        sm={secondaryLabel !== '' ? 6 : 12}
        xs={secondaryLabel !== '' ? 6 : 12}
        className={classes.headerItem}
      >
        <Typography variant="h6" component="h6" className={classes.headerTitle}>
          {title}
        </Typography>
        {primaryLabel !== '' && (
          <Button
            id={id}
            color="primary"
            onClick={onClickPrimary}
            className={classes.primary}
            disabled={isDisabled}
          >
            {primaryLabel}
          </Button>
        )}
      </Grid>
      {secondaryLabel !== '' && (
        <Grid
          item
          lg={5}
          md={6}
          sm={6}
          xs={6}
          className={classNames(classes.headerItem, classes.end)}
        >
          {secondaryLabel !== '' && onClickSecondary != null && (
            <StyledButton
              id="secondary-button"
              variant="outlined"
              color="primary"
              onClick={onClickSecondary}
            >
              {secondaryLabel}
            </StyledButton>
          )}
          {secondaryLabel !== '' && onClickSecondary == null && (
            <Typography
              id="secondary-label"
              className={classNames(classes.headerItem, classes.end)}
            >
              {secondaryLabel}
            </Typography>
          )}
        </Grid>
      )}
    </Grid>
    <Paper elevation={0} className={classes.children}>
      {children}
    </Paper>
  </Paper>
);

CardWrapper.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node.isRequired,
  primaryLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  secondaryLabel: PropTypes.node,
  onClickPrimary: PropTypes.func,
  onClickSecondary: PropTypes.func,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
};

CardWrapper.defaultProps = {
  primaryLabel: '',
  secondaryLabel: '',
  onClickPrimary: null,
  onClickSecondary: null,
  isDisabled: null,
};

export default withStyles(styles, { withTheme: true })(CardWrapper);