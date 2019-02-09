import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Card,CardActions,CardContent,CardMedia,Button,Typography,Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectData} from '../../actions/index';
const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
  },
};
class DataSet extends React.Component {
  render(){
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
          <CardMedia component="img" alt="No Image" className={classes.media}
            height="140" image="home.jpeg" title="No Image"/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.dataSet.dataSetName}            
            </Typography>
            </CardContent>
        <CardActions>
          <Link component={RouterLink} to='/dashboard/viewData'>
          <Button size="small" color="primary" onClick={()=>{this.props.selectData(this.props.dataSet)}}>
            View Data
          </Button>
          </Link>
          {this.props.selected&&<Button size="small" color="primary" onClick={()=>{this.props.selectData(this.props.dataSet)}}>
            Select Data
          </Button>}
        </CardActions>
      </Card>
    );
  }
}
DataSet.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    selectData
  },dispatch)
  }
export default connect(null,mapDispatchToProps)(withStyles(styles)(DataSet));