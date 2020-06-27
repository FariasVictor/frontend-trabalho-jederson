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
            .then(() => this.props.history.push("/exam"))
            .catch(({ response }) => {
                if (response.status === 401) {
                    console.log(response)
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
                            <TextField defaultValue={access.username} onChange={this.handleChange} id="username" name="username" label="Usuário" />
                            <TextField onChange={this.handleChange} id="username" name="password" label="Senha" />
                            <ErrorSpan>{this.state.error}</ErrorSpan>
                        </TextGroup>
                        <SubmitButton type="submit">
                            Login
                        </SubmitButton>
                    </Form>
                </Card>
            </Container>
        </>
    }
}

export default Login;