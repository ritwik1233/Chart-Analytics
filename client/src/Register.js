import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {Avatar,Button,CssBaseline,FormControl,Input,InputLabel,Paper,Typography,Chip} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Register extends React.Component {
  state={
    error:false
  }
    submitForm=(e)=>{
        e.preventDefault();
        const userData={
          email:e.target.email.value,
          password:e.target.password.value,
          cpassword:e.target.cpassword.value,
          fname:e.target.fname.value,
          lname:e.target.lname.value,
          phone:e.target.phone.value
        }
        if(e.target.password.value===e.target.cpassword.value){
              axios.post('/api/register',userData).then(res=>{
                console.log(res.data)
              }).catch(err=>{
                console.log(err)
              })
        } else {
          this.setState({error:true})
        }
    }
  render(){
    const { classes } = this.props;
    let error
    if(this.state.error)
    {
      error=<Chip label="Invalid Data"/>
    }
    return (
        <Fragment>
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {error}
          <form onSubmit={this.submitForm} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="fname">First Name</InputLabel>
              <Input id="fname" name="fname" autoComplete="fname" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="lname">Last Name</InputLabel>
              <Input id="lname" name="lname" autoComplete="lname" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Input id="phone" name="phone" autoComplete="phone" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="cpassword">Confirm Password</InputLabel>
              <Input name="cpassword" type="password" id="cpassword" autoComplete="current-password" />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign Up
            </Button>
          </form>
        </Paper>
      </main>
      </Fragment>
    );
  }

  }
 

  Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);