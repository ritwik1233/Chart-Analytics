import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Card,CardActions,CardContent,Button,
        Typography,Divider,Grid} from '@material-ui/core';
import TableData from './TableData';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
const styles = {
  media: {
    objectFit: 'cover',
  },
  input: {
    display: 'none',
  },
};

class FileUpload extends React.Component{
  constructor(props)
  {
    super(props)
    this.state={
      upload:false,
      selectedFiles:null,
    } 
  }
    handleUpload=(e)=>{
      e.preventDefault()
        this.setState({
          upload:true,
          selectedFiles:e.target.files[0],
          uploadStatus:false,
        })
    }
    uploadData=(e)=>{
     e.preventDefault();
     
     const data=new FormData()
     const config = {     
              headers: { 'Content-Type': 'multipart/form-data' }
          }
     data.append('file', this.state.selectedFiles,e.target.dataName.value)
     axios.post('/api/fileupload', data,config)
          .then(res => {
            if(res.status===200){
              this.setState({uploadStatus:true,upload:false},()=>{
              })
            }
          }).catch(err=>{
            console.log(err)
          })
    }
  render(){
   const { classes } = this.props;
   if(this.state.uploadStatus===true)
   {
      return(<Redirect to='/dashboard' />)
   }
   let uploadDataForm
   if(this.state.upload===true)
   {
    uploadDataForm= <form onSubmit={this.uploadData} >
      <input name="dataName" type="text" id="dataName" placeholder="Enter a Data Set Name" />&nbsp;
     <Button  type="submit" size="small" variant="contained" color="primary">
      Upload DataSet
    </Button>
  </form>
   }
    return (
      <Grid container spacing={16}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
                  <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Upload Data 
                    </Typography>
                    <Divider/>
                    <Typography component="p">
                    </Typography>
                  </CardContent>
                <CardActions>
                <input 
                      accept=".xlsx, .xls, .csv"
                      className={classes.input} 
                      id="contained-button-file" 
                      multiple 
                      type="file"
                      onChange={this.handleUpload}
                      />
                <label htmlFor="contained-button-file">
                  <Button  variant="contained" sizenbps="small" color="primary" component="span">
                    Upload File
                  </Button>
                </label>
                {uploadDataForm}
                </CardActions>
              </Card>
           </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={12}>
            <TableData fileData={this.props.allData}/>
          </Grid>
      </Grid>
    );
  }
}
  

FileUpload.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapStateToProps(state)
{
  return{
    allData:state.file.allData
  }
}
export default connect(mapStateToProps,null)(withStyles(styles)(FileUpload));