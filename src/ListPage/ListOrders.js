import React, { useState, useEffect } from 'react';
import axios from '../utils/httpClient'

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { Button } from '@material-ui/core';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 900,
    },
    title: {
        backgroundColor: '#6EFFC3',
        color: '#1A4527',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    createOrder: {
        backgroundColor: '#99FFDD',
        width: '35%',
        height: '80%',
        color: '#1A4527'
    },
    nested: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: theme.spacing(4),
    },
    link: {
        '&:active, &:hover': {
            textDecoration: 'none',
        },
        margin: '0 0 0 12px',
        textDecoration: 'none',
        color: 'inherit',
    },
    detailItems: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: "wrap",
        '&>*': {
            marginRight: 8,
            width: '34%',
        }
    }
}));

export default function NestedList(props) {
    const classes = useStyles();
    const { user } = props
    const [orders, setOrders] = useState([
        {
            id: '',
            type: '',
            status: '',
            orderData: {},
            orderCompletedDate: '',
        }
    ])

    useEffect(() => {

        async function retrieveOrders(userType, userId) {
            axios.get(`order/${userType}/${userId}`)
                .then(({ data }) => {
                    setOrders(data); console.log(user);
                })
        }
        retrieveOrders(user.userType, user.userId);
        console.log()
    }, [user])

    return (
        <List className={classes.root} component="div" aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader className={classes.title} component="div" >
                    <span>SOLICITAÇÕES</span>
                    <Button className={classes.createOrder} variant="contained">
                        <AddIcon />
                        <Link className={classes.link} to={{pathname: "/create", state: {user} }}>
                                Solicitar exame
                        </Link>
                    </Button>
                </ListSubheader>
            }
        >
            {orders.map((order, index) => <Item order={order} />)}

        </List>
    );
}

function Item(props) {
    const order = props.order
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const handleClick = () => {
        setOpen(!open)
    };

    const treatStatus = (status) => {
        switch (status) {
            case 'SOLICITACAO_EM_ANDAMENTO':
                return 'Aguardando resposta da clínica'
            case 'SOLICITACAO_NEGADDA':
                return 'Negado'
            case 'SOLICITACAO_ACEITA':
                return 'Aceito'
            default:
                return 'Status inválido'
        }
    }
    return (
        <>
            <ListItem key={order.id} button onClick={handleClick}>
                <ListItemIcon>
                    <ViewHeadlineIcon />
                </ListItemIcon>
                <ListItemText primary={order.examType} secondary={`Data: ${order.statusChanged?.substring(0, 10)}`} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem className={classes.nested}>
                        <div className={classes.detailItems}>
                            <ListItemText primary="Código" secondary={order.id} />
                            <ListItemText primary="Status" secondary={treatStatus(order.status)} />
                            <ListItemText primary="Paciente" secondary={order.patient?.name} />
                            <ListItemText primary="Clínica" secondary={order.clinic?.name} />
                        </div>
                        <Button color="primary" variant="outlined">
                            Detalhes
                        </Button>
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}