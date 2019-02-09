import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SettingsTabs from './SettingsTabs';

const styles = {
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};



const SettingsPage=(props)=> {
  return (
      <Grid container spacing={16}>
          <Grid item xs={12}>
          <SettingsTabs userData={props.userData}/>
          </Grid>
      </Grid>

        
        
  );
}

SettingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SettingsPage);