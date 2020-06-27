import React, { Component } from 'react';
import axios from '../utils/httpClient'
import NestedList from './ListComponent'

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
            <NestedList user={this.state.user} />
        )
    }
}

export default ListExams;