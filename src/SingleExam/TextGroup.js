import React, { Component } from 'react';
import {Group}  from './style'
import { Typography } from '@material-ui/core';
class TextGroup extends Component {
    render() {

        let label = this.props.label?.charAt(0).toUpperCase()+this.props.label?.slice(1)

        return (
            <Group>
                <Typography style={{fontWeight:'bolder'}}>{label}</Typography>
                <Typography>{this.props.value}</Typography>
            </Group>
        )
    }
}

export default TextGroup;