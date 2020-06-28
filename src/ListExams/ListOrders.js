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


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 900,
    },
    title: {
        backgroundColor: '#6EFFC3',
    },
    nested: {

        paddingLeft: theme.spacing(4),
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
    const [open, setOpen] = React.useState(false);
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

    const handleClick = () => {
        setOpen(!open);
        console.log(user)
        console.log(orders)
    };

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
        <List className={classes.root} component="div" aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader className={classes.title} component="div" >
                    PEDIDOS
        </ListSubheader>
            }
        >
            {orders.map((order) =>
                <>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <ViewHeadlineIcon />
                        </ListItemIcon>
                        <ListItemText primary={order.examType} />
                        <ListItemText primary={order.statusChanged?.substring(0, 10)} />
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
                                <Button color="primary" variant="outlined">Detalhes</Button>
                            </ListItem>
                        </List>
                    </Collapse>
                </>
            )}

        </List>
    );
}