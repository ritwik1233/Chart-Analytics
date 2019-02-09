import React from 'react';
import Login from './Login';
import Register from './Register';
import {AppBar,Tabs,Tab,Paper,Grid,Toolbar,Typography,
        Card,CardContent, Divider} from '@material-ui/core';

const HomeData=()=>{
  return(
    <Grid container spacing={16}>
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={8}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              Home
            </Typography>
            <Divider/>
            <Typography component="p">
              Register an account to try the charts analytics.This application will enable one to upload data in .csv format 
              and view different data in form of charts .Charts can be customized based on user needs.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

class Home extends React.Component{
  state = {
    value: 0,
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  render()
  {
    const { value } = this.state;
      return(
        <Grid container spacing={16}>
            <Grid item xs={12}>     
              <AppBar position="static" >
                <Toolbar>
                  <Typography variant="h6" color="inherit">
                    Chart-Analytics
                  </Typography>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                        <Tab label="Home" />
                        <Tab label="Login" />
                        <Tab label="Register" />
                     </Tabs>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                {value === 0 && <HomeData/>}
                {value === 1 && <Login/>}
                {value === 2 && <Register/>}
            </Grid>
         </Grid>
        )
  }
}
export default Home