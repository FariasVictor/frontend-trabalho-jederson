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
		display: 'flex',
		justifyContent: 'space-between',
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
	},
}));

export default function NestedListExams(props) {
	const classes = useStyles();
	const {user} = props
	const [exams, setExams] = useState([
		{
			id: '',
			type: '',
			status: '',
			examData: {},
			examCompletedDate: '',
		}
	])

	useEffect(() => {

		async function retrieveExams(userType, userId) {
			axios.get(`exam/${userType}/${userId}`)
				.then(({ data }) => {
					setExams(data); console.log(user);
				})
		}
		retrieveExams(user.userType, user.userId);
		console.log()
	}, [user])



	return (
		<List className={classes.root} component="div" aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader className={classes.title} component="div" >
					EXAMES
        </ListSubheader>
			}
		>
			{exams.map((exam) =>
				<>
					<ExamItem exam={exam} user={user} />
				</>
			)}

		</List>
	);
}

function ExamItem(props) {
	const exam = props.exam
	const user = props.user
	const classes = useStyles();
	const [open, setOpen] = React.useState(false)
	const handleClick = () => {
		setOpen(!open)
	};

	const treatStatus = (status) => {
		switch (status) {
			case 'EXAME_CONCLUIDO':
				return 'Exame emitido'
			case 'EXAME_EM_ANDAMENTO':
				return 'Exame em andamento'
			case 'EXAME_ANALISADO':
				return 'Analisado pelo médico'
			default:
				return 'Status inválido'
		}
	}
	return (
		<>
			<ListItem key={exam.id} button onClick={handleClick}>
				<ListItemIcon>
					<ViewHeadlineIcon />
				</ListItemIcon>
				<ListItemText primary={exam.type} secondary={`Emissão: ${exam.examRequestedDateTime ? exam.examRequestedDateTime.substring(0, 10) : '-'}`} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem className={classes.nested}>
						<div className={classes.detailItems}>
							<ListItemText primary="Código " secondary={exam.id} />
							<ListItemText primary="Status " secondary={treatStatus(exam.status)} />
							<ListItemText primary="Paciente " secondary={exam.patient?.name} />
							<ListItemText
								primary={user.userType === 'DOCTOR' ? "Clínica" : "Médico"}
								secondary={user.userType === 'DOCTOR' ? exam.clinic?.name : exam.doctor?.name} />
						</div>
						<Button color="primary" variant="outlined">Detalhes</Button>
					</ListItem>
				</List>
			</Collapse>
		</>
	)
}