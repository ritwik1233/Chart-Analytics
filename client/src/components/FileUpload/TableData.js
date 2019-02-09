import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableHead,
        TableRow,Paper,Typography,Grid,CardActionArea} from '@material-ui/core'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectData} from '../../actions/index';
import {Redirect} from 'react-router-dom';
const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
  },
});
class TableData extends React.Component{
  state={
    viewData:false
  }
  handleSubmit=(data)=>{
    this.setState({viewData:true},()=>{
      this.props.selectData(data)
    })
  }
  render(){
    if(this.state.viewData===true)
    {
      return(<Redirect to='/dashboard/viewData'/>)
    }
    const { classes } = this.props;
    let tableData=<Typography variant="body1" gutterBottom>
              No Available DataSet
            </Typography>
  if(this.props.fileData!==undefined&&this.props.fileData.length>0)
  {
    tableData=<Table className={classes.table}>
    <TableHead>
    <TableRow>
      <TableCell> 
        <Typography variant="title" gutterBottom>Dataset Name</Typography>
      </TableCell>
      <TableCell align="right">
    <Typography variant="title" gutterBottom>Date</Typography>
    </TableCell>
  </TableRow>
</TableHead>
    <TableBody>
  {this.props.fileData.map((row,key) => (
    <TableRow key={key} onClick={()=>{this.handleSubmit(row)}}>
      <TableCell component="th" scope="row"><CardActionArea>{row.dataSetName}</CardActionArea>
      </TableCell>
      <TableCell align="right"><CardActionArea>{row.Date}</CardActionArea></TableCell>
    </TableRow>
  ))}
</TableBody>
</Table>
}
return (
  <Grid container spacing={8}>
      <Grid item xs={12}>
            <Paper className={classes.root}>
                  {tableData}
              </Paper>
      </Grid>
  </Grid>
    );
  }
}
TableData.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapDispatchToProps(dispatch)
{
  return bindActionCreators({
    selectData
  },dispatch)
}
export default connect(null,mapDispatchToProps)(withStyles(styles)(TableData));