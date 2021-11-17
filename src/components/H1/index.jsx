import { Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const styles = () => ({
    root: {},
});

const H1 = (props) => {
    const { classes, children } = props;
    return ( 
        <Typography variant = "h1"
        component = "h1"
        className = { classes.root } 
        >
        </Typography>
      
    );
};

H1.propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node,
};

H1.defaultProps = {
    children: null,
};

export default withStyles(styles, { withTheme: true })(H1);