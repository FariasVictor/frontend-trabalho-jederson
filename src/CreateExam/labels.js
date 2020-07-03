import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

class Label extends Component {
    render() {
        return (
            <>
                <Typography variant="strong" component="span">{this.props.label} </Typography>
                <Typography component="span">{this.props.value} </Typography>
            </>
        )
    }
}

export default Label;