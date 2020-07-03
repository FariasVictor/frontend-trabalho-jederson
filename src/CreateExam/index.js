import React, { Component } from 'react';
import { Container, TextGroup } from './style';
import { Form } from './style';
import axios from '../utils/httpClient';
import { TextField, Typography, List, ButtonGroup, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class ExamForm extends Component {

    state = {
        user: this.props.location.state,
        exam: {
            examData: [{}],
            id: ''
        },
        aux: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},]
    }

    handleChange = (event, index) => {
        let field = event.target.name
        let value = event.target.value
        let examDataCopy = this.state.aux

        console.log('examDataCopy:', examDataCopy);

        examDataCopy[index] = { ...examDataCopy[index], [field]: value, examId: this.state.exam.id }
        this.setState(({ exam }) => ({
            exam: {
                ...exam,
                examData: examDataCopy
            }
        }))
    }

    componentDidMount() {
        axios.get(`/exam/${this.props.match.params.id}`).then(({ data }) => {
            console.log('data:', { ...data })
            console.log('fiz uma requisição')
            this.setState(
                { exam: data }
            )
        })
    }

    isNotEmpty = (obj) => {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return true;
        }
        return false;
    }

    post = (event) => {
        event.preventDefault()

        let examDataFiltered = this.state.exam.examData.filter(it => this.isNotEmpty(it))
        axios.patch(`/exam/${this.state.exam.id}`, examDataFiltered).then(({ response }) => {
            console.log(response);
        })
    }
    render() {
        return (
            <Container>
                <Form onSubmit={this.post}>
                    <Typography>Paciente</Typography>
                    <Typography>{this.state.exam.patient?.name}</Typography>
                    <Typography>Médico</Typography>
                    <Typography>{this.state.exam.doctor?.name}</Typography>
                    <Typography>Clínica</Typography>
                    <Typography>{this.state.exam.clinic?.name}</Typography>
                    <List>
                        {
                            this.state.aux.map((it, index) => (
                                <TextGroup>
                                    < TextField name="key" label="Nome do dado" defaultValue={it.key} onChange={(event) => this.handleChange(event, index)} />
                                    < TextField name="value" label="Valor" defaultValue={it.value} onChange={(event) => this.handleChange(event, index)} /><br />
                                </TextGroup>
                            ))
                        }
                    </List>
                    <ButtonGroup>
                        <Button size="small" type="submit" variant="contained" color="primary">
                            Concluir
                                </Button>
                        <Button size="small" variant="contained" color="secondary">
                            <Link to={{ pathname: "/exam", state: { ...this.state.user } }}>
                                Cancelar
                            </Link>
                        </Button>
                    </ButtonGroup>
                </Form>
            </Container>
        )
    }
}

export default ExamForm