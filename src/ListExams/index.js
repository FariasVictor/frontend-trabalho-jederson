import React, { Component } from 'react';
import NestedList from './ListComponent'

class ListExams extends Component {
    render() {
        return <NestedList>
            <span>Listinha de examinhos</span>
        </NestedList>
    }
}

export default ListExams;