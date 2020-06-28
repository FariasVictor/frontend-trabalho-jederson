import React, { Component } from 'react';
import NestedListExams from './ListExams'
import NestedListOrders from './ListOrders'
import { Board, Container } from './style';

class ListExams extends Component {

    state = {
        user: {
            userType: this.props.location.state.userTypeEnum,
            userId: this.props.location.state.userId,
        },
        doctor: {
            id: '',
            crm: '',
            name: '',
            phone: '',
        }
    }

    render() {
        return (
            <Container>
                <Board>
                    <NestedListExams user={this.state.user} />
                </Board>
                <Board>
                    <NestedListOrders user={this.state.user} />
                </Board>
            </Container>
        )
    }
}

export default ListExams;