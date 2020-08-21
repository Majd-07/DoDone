import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
}))

const About = () => {
	const classes = useStyles()

	return (
		<React.Fragment>
			<main>
				<div className={classes.heroContent}>
					<Container maxWidth='sm'>
						<Typography
							component='h1'
							variant='h2'
							align='center'
							color='textPrimary'
							gutterBottom>
							Do-Done
						</Typography>
						<Typography
							variant='h5'
							align='center'
							color='textSecondary'
							paragraph>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
							nihil excepturi quam quos quidem eveniet sit ipsum, nulla non
							animi iste itaque voluptatum dolores at.
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify='center'>
								<Grid item>
									<Button variant='contained' color='primary'>
										Get Started
									</Button>
								</Grid>
								<Grid item>
									<Button variant='outlined' color='primary'>
										Useless Button
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
			</main>
			{/* Footer */}
			<footer className={classes.footer}>
				<Typography variant='h6' align='center' gutterBottom>
					App Footer
				</Typography>
				<Typography
					variant='subtitle1'
					align='center'
					color='textSecondary'
					component='p'>
					This app build with Majd and Hassan
				</Typography>
			</footer>
			{/* End footer */}
		</React.Fragment>
	)
}

export default About
