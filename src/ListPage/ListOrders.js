import React, { useState, useEffect } from 'react';
import axios from '../utils/httpClient'

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { Button, Fade, Modal, Backdrop } from '@material-ui/core';
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
        alignItems: 'center',
		position: 'static',
    },
    createOrder: {
        backgroundColor: '#99FFDD',
        width: '45%',
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
        width:'80%',
        '&>*': {
            marginRight: 8,
            width: '34%',
        }
    },
    btnGroup: {
        width: '20%',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        '&>*': {
            width:'100%',
            marginTop: '15px'
        }
    },
    status:{
        '&>*':{
            fontWeight: 'bolder'
        }
    },

    //modal

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
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
                    {user.userType === 'DOCTOR' ?
                        (<Button className={classes.createOrder} variant="contained">
                            <AddIcon />
                            <Link className={classes.link} to={{ pathname: "/create", state: { user } }}>
                                Solicitar exame
                            </Link>
                        </Button>)
                        : (<></>
                        )
                    }
                </ListSubheader>
            }
        >
            {orders.map((order) => <Item order={order} user={user} />)}

        </List>
    );
}

function Item(props) {
    const order = props.order
    const user = props.user
    const classes = useStyles();
    const [openCollapse, setOpenCollapse] = React.useState(false)
    const [accept, setAccept] = React.useState(' ')
    const handleClick = () => {
        setOpenCollapse(!openCollapse)
    };

    const [openModal, setOpenModal] = React.useState(false)
    const handleOpenModal = (id, action) => () => {
        setOpenModal(!openModal)
        setAccept(action)
    }
    const handleCloseModal = () => {
        setOpenModal(!openModal)
    }

    const treatStatus = (status) => {
        switch (status) {
            case 'SOLICITACAO_ABERTA':
                return 'Aguardando resposta da clínica'
            case 'SOLICITACAO_NEGADA':
                return 'Negado'
            case 'SOLICITACAO_ACEITA':
                return 'Aceito'
            default:
                return 'Status inválido'
        }
    }

    const refuseOrder = (id) => () => {
        console.log(props)

        axios.put(`/order/${id}/SOLICITACAO_NEGADA`)
            .then(() => handleCloseModal())
            .catch(({ response }) => {console.log(response); handleCloseModal()})        
    }

    const acceptOrder = (id) => () => {
        console.log(props)
        axios.put(`/order/${id}/SOLICITACAO_ACEITA`)
            .then(() => props.history.push('/exam', user))
        // handleCloseModal()
    }



    return (
        <>
            <ListItem key={order.id} button onClick={handleClick}>
                <ListItemIcon>
                    <ViewHeadlineIcon />
                </ListItemIcon>
                <ListItemText primary={order.examType} className={order.status==='SOLICITACAO_ABERTA' ? classes.status : {} } secondary={`Data: ${order.statusChanged?.substring(0, 10)}`} />
                {openCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem className={classes.nested}>
                        <div className={classes.detailItems}>
                            <ListItemText primary="Código" secondary={order.id} />
                            <ListItemText primary="Status" secondary={treatStatus(order.status)} />
                            <ListItemText primary="Paciente" secondary={order.patient?.name} />
                            <ListItemText primary="Clínica" secondary={order.clinic?.name} />
                        </div>
                        {user.userType === 'CLINIC' && order.status==='SOLICITACAO_ABERTA' ? (
                            < div className={classes.btnGroup}>
                                <Button onClick={handleOpenModal(order.id, 'aceitar')} color="primary" variant="outlined">Aceitar</Button>
                                <Button onClick={handleOpenModal(order.id, 'recusar')} color="secondary" variant="outlined">Recusar</Button>
                                {/* <Button fullWidth color="primary" variant="outlined">
                                    Detalhes
                                </Button> */}
                            </div>
                        ) : (<></>)
                        }
                    </ListItem>



                    <div>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={openModal}
                            onClose={handleCloseModal}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={openModal}>
                                <div className={classes.paper}>
                                    <div>
                                        <p>
                                            Deseja {`${accept}`} essa solicitação?
                                        </p>
                                        <br />
                                        <Button onClick={accept === 'aceitar' ? acceptOrder(order.id) : refuseOrder(order.id)} color="primary" variant="contained">Confirmar</Button>
                                        <Button onClick={handleCloseModal} color="secondary" variant="contained">Cancelar</Button>
                                    </div>
                                </div>
                            </Fade>
                        </Modal>
                    </div>
                </List>
            </Collapse>
        </>
    )
}

