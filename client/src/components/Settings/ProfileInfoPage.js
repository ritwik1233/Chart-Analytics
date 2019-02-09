import React from 'react';
import {Grid,Paper,List,ListItem,Typography,Divider} from '@material-ui/core/';




const ProfileInfoPage=(props)=>{
     if(props.userData===undefined)
        {
            return(
                <Paper>
                </Paper>
            )
        }
        return (
            <Paper>
              <List>
                <ListItem>
                    <Typography variant="h6" gutterBottom >Profile Information</Typography>
                </ListItem>
                <Divider/>
                <ListItem>
                    <Grid container spacing={16}>
                        <Grid item xs={6}>
                          <Typography variant="body2" gutterBottom>First Name</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" gutterBottom>{props.userData.fname}</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                <Divider/>
                <ListItem>
                    <Grid container spacing={16}>
                      <Grid item xs={6}>
                        <Typography variant="body2" gutterBottom>Last Name</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" gutterBottom>{props.userData.lname}</Typography>
                      </Grid>
                    </Grid>
                </ListItem>
                <Divider/>
                <ListItem>
                    <Grid container spacing={16}>
                        <Grid item xs={6}>
                            <Typography variant="body2" gutterBottom>Email</Typography>
                         </Grid>
                         <Grid item xs={6}>
                            <Typography variant="body2" gutterBottom>{props.userData.email}</Typography>
                         </Grid>
                    </Grid>
                </ListItem>
                <Divider/>
                <ListItem>
                  <Grid container spacing={16}>
                    <Grid item xs={6}>
                      <Typography variant="body2" gutterBottom>Phone</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" gutterBottom>{props.userData.phone}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider/>
               </List>
              </Paper>    
            
            );
    }



export default ProfileInfoPage;