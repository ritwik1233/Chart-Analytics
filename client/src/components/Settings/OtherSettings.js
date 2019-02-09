import React from 'react';
import {Grid,Card,CardContent,Typography,Button,Select,MenuItem} from '@material-ui/core';
import {connect} from 'react-redux';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {removeSelectData} from '../../actions/index'

class OtherSettings extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedData:this.props.selectedData._id!==undefined?this.props.selectedData._id:'select',
            redirect:false,
        }
    }
    handleChange=(e)=>{
        this.setState({selectedData:e.target.value})
      }
   
      handleSubmit=(e)=>{
          e.preventDefault();
          const _id=e.target['delete-data'].value
          axios.get('/api/deleteDataSet',{
              params:{_id:_id}
          }).then(res=>{
            this.setState({redirect:true},()=>{
                const data=this.props.allData.filter(eachData=>{
                    if(eachData._id===_id){
                        return true
                    }else{
                        return false
                    }
                })[0]
                this.props.removeSelectData(data)
            })
        }).catch(err=>{
            console.log(err)
          })
      }
    render(){
        if(this.state.redirect===true) {
            return(<Redirect to="/dashboard" />)
        }
        let menuData
        if(this.props.allData.length>0)
        {
               
            menuData=this.props.allData.map((eachData,key)=>{
                return(
                    <MenuItem key={key}  value={eachData._id}>{eachData.dataSetName}</MenuItem>
                )
            })
        }
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom align="center">Other Settings </Typography>
                        <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={8}>
                            <Grid item xs={6}>
                                <Typography variant="h6" gutterBottom>
                                Select a Dataset to be deleted
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                            <Select
                                name='delete-data'
                                value={
                                this.state.selectedData}
                                autoWidth={true}
                                onChange={this.handleChange}>
                                {menuData}
                            </Select>
                            </Grid>
                            <Grid item xs={4}>
                           </Grid> 
                            <Grid item xs={4}>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                            Delete
                            </Button>
                            </Grid>
                            <Grid item xs={4}>
                           </Grid> 
                        </Grid>
                        </form>
                </CardContent>
           </Card>
            );
    }
}
function mapStateToProps(state)
{
    return{
        allData:state.file.allData,
        selectedData:state.file.selectedData
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        removeSelectData
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(OtherSettings);