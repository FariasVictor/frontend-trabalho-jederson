import React, { Component } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { NavLink, Link } from 'react-router-dom';

class LinkTab extends Component {
    render() {
        return (
            <Tab
                component={NavLink}
                {...this.props}
            />
        );
    }
}

class NavBar extends Component {
    state = {
        value: '',
    }


    handleChange = (event, newValue) => {
        this.setState(({ value }) => ({
            value: newValue
        }))
    };

    a11yProps(index) {
        return {
            id: `nav-tab-${index}`,
            "aria-controls": `nav-tabpanel-${index}`
        };
    }
    render() {

        return (
            <div >
                <AppBar onClick={console.log(this.props.pages)} position="static">
                    <Tabs
                        variant="fullWidth"
                        value={this.state.value}
                        onChange={this.handleChange}
                        aria-label="nav tabs example"
                    >
                        {this.props.pages.map(page =>
                            <Tab style={{backgroundColor: '#7FFDD4'}} component={Link} label={page.title} to={`${page.href}`} />
                        )}
                    </Tabs>
                </AppBar>

            </div >
        )
    }
}

export default NavBar;