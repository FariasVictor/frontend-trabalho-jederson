import React, { Component } from 'react';
import { Container, Card, Form, Img, TextGroup, SubmitButton, ErrorSpan } from './style';
import { TextField } from '@material-ui/core';
import Estetoscopio from '../assets/img'
import axios from '../utils/httpClient'


class Login extends Component {
    state = {
        access: {
            username: '',
            password: ''
        },
        error: ''
    }

    handleChange = (event) => {
        let field = event.target.name;
        let value = event.target.value;

        this.setState(({ access }) => ({
            access: {
                ...access,
                [field]: value
            }
        }))
    }

    post = (event) => {
        axios.post("/access", this.state.access)
            .then(({ data }) => {
                if (data.userTypeEnum !== 'PATIENT') {
                    this.props.history.push("/exam", data)
                } else {
                    this.setState({
                        error: 'Logue como médico ou clínica'
                    })
                }
            }).catch(({ response }) => {
                if (response.status === 401) {
                    this.setState({
                        error: 'Usuário ou senha inválida'
                    })
                }
            });

        event.preventDefault();
    }

    render() {
        const { access } = this.state
        return <>
            <Container>
                <Card>
                    <Form onSubmit={this.post}>
                        <Img src={Estetoscopio} alt="Login" />
                        <TextGroup>
                            <TextField onChange={this.handleChange} name="username" label="Usuário" />
                            <TextField type="password" onChange={this.handleChange} name="password" label="Senha" />
                            <ErrorSpan>{this.state.error}</ErrorSpan>
                        </TextGroup>
                        <SubmitButton variant="contained" color="primary" type="submit">
                            Login
                        </SubmitButton>
                    </Form>
                </Card>
            </Container>
        </>
    }
}

export default Login;