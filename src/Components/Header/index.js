import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import NavBar from '../NavBar'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Estetoscopio from '../../assets/img'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position:'static',
        // margin: '0 0 50px 0'
    },
    toolBar: {
        justifyContent: 'center',
        backgroundColor: '#7FFDD4',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

// const pages = [
//     {
//         title: 'Home',
//         href: '/'
//     },
//     {
//         title: 'Solicitar Exame',
//         href: '/order',
//     },
// ]


export default function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolBar} variant="dense">
                    <img style={{width:40, height: 40}} src={Estetoscopio} alt="Login" />
                    <Typography align="center" variant="h3" color="inherit">
                        HealthPlace
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* <NavBar pages={pages} /> */}
        </div>
    );
}