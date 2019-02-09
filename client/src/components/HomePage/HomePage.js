import React from 'react';
import Grid from '@material-ui/core/Grid';
import DataSet from './DataSet';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { allFileData} from '../../actions/index';
class HomePage extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            data:12,
        }
        window.addEventListener('resize',this.handleResize)
    }
    componentDidMount()
    {
        this.props.allFileData()
        if(window.innerWidth>800)
        {
            this.setState({
                data:4
            })
        }
        if(window.innerWidth<800&&window.innerWidth>500)
        {
            this.setState({
                data:6
            })
        }
        if(window.innerWidth<500)
        {
            this.setState({
                data:12
            })
        }        
    }
    handleResize=(e)=>{
        if(window.innerWidth>800)
        {
            this.setState({
                data:4
            })
        }
        if(window.innerWidth<800&&window.innerWidth>500)
        {
            this.setState({
                data:6
            })
        }
        if(window.innerWidth<500)
        {
            this.setState({
                data:12
            })
        }
    }
    render(){
        let fileData=<Grid item xs={12}>
                    <Typography variant="body1" gutterBottom>
                        No Available DataSet
                    </Typography>
                </Grid>
        let selectedData=<Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>
                                No data Selected
                            </Typography>
                        </Grid>
        if(this.props.selectedData.dataSetName!==undefined)
        {
            selectedData=<Grid item xs={this.state.data} >
                    <DataSet selected={false} dataSet={this.props.selectedData}/>
                </Grid>
        }
        if(this.props.allData!==undefined&&this.props.allData.length>0)
        {
        
            fileData=this.props.allData.map((eachData,key)=>{
                return(<Grid item xs={this.state.data} key={key}>
                        <DataSet selected={true} dataSet={eachData}/>
                    </Grid>)
            })
        }
    return(
        <Grid container spacing={16}>
         <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                        Selected DataSet
                </Typography>
            </Grid>
           {selectedData}
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                        Available DataSet
                </Typography>
            </Grid>
            {fileData}
        </Grid>
    )   
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
        allFileData
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(HomePage)