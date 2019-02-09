import React ,{Fragment}from 'react';
import {Typography,Select,Grid,MenuItem,LinearProgress,Paper} from '@material-ui/core';
import {connect} from 'react-redux';
import {selectData} from '../../actions/index'
import { bindActionCreators } from 'redux';
import { LineChart, Line ,XAxis,YAxis,CartesianGrid,Tooltip,AreaChart,BarChart,Bar,Area} from 'recharts';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
      padding: 20,
    }}

class Chart extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            selectedData:this.props.selectedData._id!==undefined?this.props.selectedData._id:'select',
            tableColumn:[],
            tableData:[],
            loading:true,
            xAxis:'-select-',
            yAxis:'-select-',
            chartType:'Line',
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
      handleXChange=(e)=>{
        this.setState({xAxis:e.target.value})
      }
      handleYChange=(e)=>{
        this.setState({yAxis:e.target.value})
      }
      handleChartType=(e)=>{
          this.setState({chartType:e.target.value})
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
                            loading:false,
                            xAxis:resultTableColumns[0].value,
                            yAxis:resultTableColumns[1].value,
                        })
                    }
                    else
                    {
                        this.setState({
                        loading:false
                        })
                    }
                  })
                .catch(err=>{
                    console.log(err)
                })
            }
            else
            {
                this.setState({
                    loading:false
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
                    loading:true,
                    XAxis:'-select-',
                    YAxis:'-select-',
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
                          loading:false,
                          xAxis:resultTableColumns[0].value,
                          yAxis:resultTableColumns[1].value,
                         })
                  }
                  else
                  {
                      this.setState({
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
    render(){
        const { classes } = this.props;
        let menuData=<MenuItem></MenuItem>
        let chartData
        let loading
        if(this.state.loading===true)
        {
            loading=<Grid item xs={12}>
                <LinearProgress/>
            </Grid>
        }
        let xAxis  
        let yAxis
        let chartType
        if(this.state.tableColumn.length>0&&this.state.tableData.length>0)
        {
            xAxis=<Fragment><Grid item xs={2}>
              <Typography variant="h6" gutterBottom>
                XAxis
            </Typography>
            </Grid>
            <Grid item xs={2}>
            <Select
            value={this.state.xAxis}
                   autoWidth={true}
                   onChange={this.handleXChange}>
                  {this.state.tableColumn.map((eachData,key)=>{
                      return(
                        <MenuItem key={key}  value={eachData.value}>{eachData.value}</MenuItem>
                      )
                  })}
            </Select>
            </Grid>
            </Fragment>
            yAxis=<Fragment> <Grid item xs={2}>
            <Typography variant="h6" gutterBottom>
                YAxis and Plot
            </Typography>
            </Grid>
            <Grid item xs={2}>
            <Select
            value={this.state.yAxis}
                   autoWidth={true}
                   onChange={this.handleYChange}>
                  {this.state.tableColumn.map((eachData,key)=>{
                      return(
                        <MenuItem key={key}  value={eachData.value}>{eachData.value}</MenuItem>
                      )
                  })}
            </Select>
            </Grid>
            </Fragment>
            chartType=<Fragment><Grid item xs={2}>
              <Typography variant="h6" gutterBottom>
                ChartType
            </Typography>
            </Grid>
            <Grid item xs={2}>
            <Select
             value={this.state.chartType}
             autoWidth={true}
             onChange={this.handleChartType}>
                    <MenuItem   value='Line'>Line</MenuItem>
                    <MenuItem   value='Area'>Area</MenuItem>
                    <MenuItem   value='Bar'>Bar</MenuItem>
                    
            </Select>
            </Grid>
            </Fragment>
            if(this.state.chartType==='Line')
            {
                chartData=<LineChart width={window.innerWidth} height={600} data={this.state.tableData}  >
                <XAxis dataKey={this.state.xAxis} />
                <YAxis dataKey={this.state.yAxis} />
                <Tooltip/>
                <Line type="monotone" dataKey={this.state.yAxis} stroke="#8884d8" activeDot={{r: 8}}/>
                <CartesianGrid strokeDasharray="3 3"/>
                </LineChart>    
            }
            if(this.state.chartType==='Area')
            {
                chartData=<AreaChart width={window.innerWidth} height={600} data={this.state.tableData}  >
                <XAxis dataKey={this.state.xAxis} />
                <YAxis dataKey={this.state.yAxis} />
                <Tooltip/>
                <Area type='monotone' dataKey={this.state.yAxis} stroke='#8884d8' fill='#8884d8' />
                <CartesianGrid strokeDasharray="3 3"/>
                </AreaChart>    
            }
            if(this.state.chartType==='Bar')
            {
                chartData=<BarChart width={window.innerWidth} height={600} data={this.state.tableData}  >
                <XAxis dataKey={this.state.xAxis} />
                <YAxis dataKey={this.state.yAxis} />
                <Tooltip/>
                <Bar dataKey={this.state.yAxis} fill="#8884d8"/>
                <CartesianGrid strokeDasharray="3 3"/>
                </BarChart>    
            }
        }
        if(this.props.allData.length>0)
        {
               
            menuData=this.props.allData.map((eachData,key)=>{
                return(
                    <MenuItem key={key}  value={eachData._id}>{eachData.dataSetName}</MenuItem>
                )

            })
         
        }
   
        return(
            <Paper className={classes.root}>
            <Grid container spacing={16} id="capture">
                <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Selected DataSet
                </Typography>
                    <Select
                            value={
                            this.state.selectedData}
                            autoWidth={true}
                            onChange={this.handleChange}>
                            {menuData}
                        </Select>
                        
                </Grid>
                {loading}
                {xAxis}
                {yAxis}
                {chartType}
                <Grid item xs={12}>
                {chartData}
                </Grid>
             </Grid>
            </Paper>
        )   
    }
}
Chart.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state)
{
    return{
        selectedData:state.file.selectedData,
        allData:state.file.allData
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({selectData},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Chart))