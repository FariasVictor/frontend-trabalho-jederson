import React from 'react';
import axios from '../utils/httpClient'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { ButtonGroup, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { ErrorSpan } from '../Login/style';
import { TextGroup, Container } from './style';
import { useEffect } from 'react';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        width: '450px',
        height: '450px'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: '90%'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function OrderForm(props) {

    const classes = useStyles();
    const user = {
        userType: props.location.state.userType,
        userId: props.location.state.userId
    }
    const [patients, setPatients] = React.useState(
        [
            {
                id: '',
                name: ''
            }
        ]
    )
    const [clinics, setClinics] = React.useState(
        [
            {
                id: '',
                name: ''
            }
        ]
    )
    const [order, setOrder] = React.useState({
        examType: '',
        patientId: '',
        clinicId: '',
        doctorId: user.userId
    })
    const error = ''

    useEffect(() => {
        function retrievePatients() {
            axios.get("/patient").then(({ data }) => {
                setPatients(data)
            })
        }
        function retrieveClinics() {
            axios.get("/clinic").then(({ data }) => {
                setClinics(data)
            })
            console.log(order)
        }
        retrievePatients();
        retrieveClinics();
    }, [order])

    const handleChange = (event) => {
        let field = event.target.name
        let value = event.target.value
        console.log(user)
        setOrder({ ...order, [field]: value })
    }

    const post = (event) => {
        event.preventDefault()
        console.log(order)
        axios.post("/order", order).then(() => {
            console.log(order)
            props.history.push("/exam", user)
        })
    }

    return (
        <Container>

            <Card component="form" onSubmit={post} className={classes.root}>

                <CardContent className={classes.content}>
                    <Typography align="center" variant="h4" component="h2">
                        Exame
                    </Typography>
                    <TextGroup>
                        <TextField onChange={handleChange} name="examType" label="Tipo de Exame" />
                        <FormControl className={classes.formControl}>
                            <InputLabel>Paciente</InputLabel>
                            <Select onChange={handleChange} name="patientId">
                                <MenuItem value="">
                                    <em>Selecione um paciente</em>
                                </MenuItem>
                                {patients.map(patient => (
                                    <MenuItem key={patient?.id} value={patient?.id}>{patient.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Clínica</InputLabel>
                            <Select onChange={handleChange} name="clinicId" >
                                <MenuItem value="">
                                    <em>Selecione uma clínica</em>
                                </MenuItem>
                                {clinics.map(clinic => (
                                    <MenuItem key={clinic.id} value={clinic.id}>{clinic.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* <input type="hidden" name="doctorId" value={user?.userId} /> */}
                        <ErrorSpan>{error}</ErrorSpan>
                    </TextGroup>
                </CardContent>
                <CardActions>
                    <ButtonGroup>
                        <Button size="small" type="submit" variant="contained" color="primary">
                            Solicitar
                        </Button>
                        <Button size="small" variant="contained" color="secondary">
                            <Link className={classes.link} to={{ pathname: "/exam", state: {...user } }}>
                                Cancelar
                            </Link>
                        </Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </Container>
    );
}