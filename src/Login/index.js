import React, { Component } from 'react';
import { Container } from './style';
import { TextField } from '@material-ui/core';

class Login extends Component {
    render() {
        return <Container>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Standard" />
            </form>
        </Container>
    }
}

export default Login;