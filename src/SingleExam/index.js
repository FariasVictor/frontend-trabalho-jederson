import React, { Component } from 'react';
import { Card, CardContent, Typography, Divider } from '@material-ui/core';
import axios from '../utils/httpClient'
import TextGroup from './TextGroup'
import { ExamData, CardContainer, Container } from './style';

class SingleExam extends Component {
    state = {
        exam: {}
    }

    componentDidMount() {
        axios.get(`/exam/${this.props.match.params.id}`)
            .then(({ data }) => this.setState({ exam: data }))
        console.log(this.state.exam)
    }

    render() {
        return (
            <Container>
                <CardContainer>
                    <CardContent>
                        <Typography variant="h3" component="h2" style={{ margin: '30px 0 45px' }}>
                            {this.state.exam.type}
                        </Typography>

                        <TextGroup label="Paciente: " value={this.state.exam.patient?.name} />
                        <TextGroup label="Médico: " value={this.state.exam.doctor?.name} />
                        <TextGroup label="Clínica: " value={this.state.exam.clinic?.name} />

                        <Divider/>

                        <ExamData>
                            {
                                this.state.exam.examData?.map(examData => (
                                    <TextGroup label={`${examData.key}: `} value={examData.value} />
                                ))
                            }
                        </ExamData>
                    </CardContent>
                </CardContainer>
            </Container>
        )
    }

}

export default SingleExam;