import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectData} from '../../actions/index';
import {Grid,Typography,Select,MenuItem,Table,TableHead,TableRow,TableCell,TableBody,LinearProgress} from '@material-ui/core';

class ViewEachData extends React.Component{
    
    constructor(props)
    {
        super(props)
        this.state={
                selectedData:this.props.selectedData._id!==undefined?this.props.selectedData._id:'select',
                tableColumn:[],
                tableData:[],
                loading:true
                }
    }
    componentDidMount()
    {
        if(this.props.selectedData.fileName!==undefined)
        {
            axios.get('/api/getEachData',{
                params:{fileName:this.props.selectedData.fileName }
            })
            .then(res=>{
                if(res.data.length>0){
                    const resultData=res.data
                    const tableColumns=Object.keys(resultData[0])
                    let resultTableColumns=[]
                    for(var i=0;i<tableColumns.length;i++){
                        resultTableColumns.push({'id':i,'value':tableColumns[i]})
                    }
                    this.setState({
                        tableColumn:resultTableColumns,
                        tableData:res.data,
                        loading:false
                    })
                }
              })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    componentDidUpdate(props,state)
    {
        if(props.selectedData._id!==state.selectedData)
        {
            
            if(this.props.selectedData.fileName!==undefined)
            {
                this.setState({
                    tableColumn:[],
                    tableData:[],
                    loading:true
                   })
            axios.get('/api/getEachData',{
                params:{fileName:this.props.selectedData.fileName }
            })
            .then(res=>{
                if(res.data.length>0){
                    const resultData=res.data
                    const tableColumns=Object.keys(resultData[0])
                    let resultTableColumns=[]
                    for(var i=0;i<tableColumns.length;i++){
                        resultTableColumns.push({'id':i,'value':tableColumns[i]})
                    }
                      this.tableColumn=resultTableColumns
                      this.tableData=res.data
                      this.loading=false
                      this.setState({
                        tableColumn:resultTableColumns,
                        tableData:res.data,
                        loading:false
                       })
                }
              })
            .catch(err=>{
                console.log(err)
            })
            }
        }
    }
  handleChange=(e)=>{
    let selectedData=this.props.allData.filter(eachData=>{
        if(eachData._id===e.target.value){
            return true;
        } else{
            return false;
        }})[0]
    this.setState({selectedData:e.target.value},()=>{
        this.props.selectData(selectedData)
    })
  }
    render(){
        let menuData=<MenuItem></MenuItem>
        if(this.props.allData.length>0)
        {   
            menuData=this.props.allData.map((eachData,key)=>{
                return(
                    <MenuItem key={key}  value={eachData._id}>{eachData.dataSetName}</MenuItem>
                )

            })
        }
        let tableData
        if(this.state.tableColumn.length>0&&this.state.tableData.length>0)
        {
            tableData=<Table>
                        <TableHead>
                        <TableRow>
                       
                        {this.state.tableColumn.map((eachData,key)=>{
                            if(key===0)  {
                                return(
                                    <TableCell key={key}> 
                                    <Typography variant="title" gutterBottom>{eachData.value}</Typography>
                                </TableCell>
                                )
                            }else
                            {
                                return(
                                    <TableCell  key={key}>
                                        <Typography variant="title" gutterBottom>{eachData.value}</Typography>
                                    </TableCell>
                                )
                            }
                        })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tableData.map((row,key) => (
                        <TableRow key={key} >
                            {
                                this.state.tableColumn.map((cell,key)=>{
                                    if(key===0){
                                        return(<TableCell key={key}  scope="row">{row[cell.value]}</TableCell>)
                                    } else {
                                        return(<TableCell key={key} >{row[cell.value]}</TableCell>)
                                    }
                                })
                            }
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                
        }
        let loading
        if(this.state.loading===true)
        {
            loading=<Grid item xs={12}>
                <LinearProgress/>
            </Grid>
        }
        return(
            <Grid container spacing={16}>
                <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                 Selected DataSet
                </Typography>
                </Grid>
                <Grid item xs={6}>
                        <Select
                           value={this.state.selectedData}
                           autoWidth={true}
                           onChange={this.handleChange}
                           >
                          {menuData}
                          </Select>
                </Grid>
                {loading}
                <Grid item xs={12}>
                    {tableData}
                </Grid>
            </Grid>
        )
    }
}
function mapStateToProps(state)
{
    return{
        selectedData:state.file.selectedData,
        allData:state.file.allData
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        selectData
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(ViewEachData)