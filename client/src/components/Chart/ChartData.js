import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Card,CardActionArea,CardMedia,CardContent,Typography} from '@material-ui/core';

const styles = {



  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
  },
};

class ChartData extends React.Component {
render(){
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="home.jpeg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.dataSet}
           </Typography>
         </CardContent>
      </CardActionArea>
    </Card>
    );
  }
}

ChartData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartData);