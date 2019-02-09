import React from 'react';
import {  Chip,Avatar,Button,CssBaseline,FormControl,
          Input,InputLabel,Paper,Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', 
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
    width: '100%', 
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
class Login extends React.Component {
    state={
      redirect:false,
      error:false
    }
   
    submitForm=(e)=>{
        e.preventDefault();
        const userData={
          email:e.target.email.value,
          password:e.target.password.value
        }
        axios.post('/api/login',userData).then(data=>{
          if(data.status===200){
            this.setState({redirect:true})
          }
        }).catch(err=>{
          this.setState({
            error:true
          })
        })
    }
  render(){
    const { classes } = this.props;
    if(this.state.redirect===true)
    {
      return(<Redirect to='/dashboard'/>)
    }

    let data
    if(this.state.error)
    data=<Chip
    label="Login Failed"
    color="secondary"
    />
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {data}
          <form onSubmit={this.submitForm} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }

  }
 

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);