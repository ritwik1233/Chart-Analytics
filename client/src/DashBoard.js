import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {ListItemText,ListItemIcon,ListItem,IconButton,
        Divider,Typography,CssBaseline,List,
        Toolbar,AppBar,Drawer,Link } from '@material-ui/core';
import {Menu,ChevronLeft,ChevronRight,BarChart,
        Home,CloudUpload,Settings} from '@material-ui/icons'
import SettingsPowerRounded from '@material-ui/icons/SettingsPowerRounded'
import {Route,Link as RouterLink} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Chart from './components/Chart/Chart';
import SettingsPage from './components/Settings/SettingsPage';
import FileUpload from './components/FileUpload/FileUpload';
import ViewEachData from './components/FileUpload/ViewEachData';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {allFileData,removeSelectData} from './actions/index';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class DashBoard extends React.Component {
  state = {
    open: false,
    drawer:window.screen.width>1100?'permanent':'temporary',
    logout:false,
    userData:undefined,
    fileData:undefined,
  };
  constructor(props)
  {
    super(props)
    window.addEventListener('resize',this.handleResize)
    
  }
  componentDidMount()
  {
    axios.get('/api/current_user').then(res=>{
      if(res.data.email===undefined) {
        this.setState({logout:true})
      } else {
        this.setState({userData:res.data})
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  handleResize=()=>{
    if(window.innerWidth>1100)
    {
      this.setState({
        drawer:'permanent'
      })
    }
    else
    {
      this.setState({
        drawer:'temporary'
      })
    }
  }
  handleLogout=()=>{
    axios.get('/api/logout')
    .then(res=>{
     if(res.status===200){
        this.setState({
          logout:true},()=>{
          this.props.removeSelectData()
        })
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  handleDrawerOpen = () => {   
      this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    if(this.state.logout===true)
    {
      return(
          <Redirect to='/' />
      )
    }
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}>
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}>
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant={this.state.drawer}
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
           classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}>
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link  component={RouterLink} to='/dashboard'>
              <ListItem onClick={this.handleDrawerClose}>
                <ListItemIcon><Home /></ListItemIcon>
                <ListItemText primary='Home' ></ListItemText>
              </ListItem>
            </Link> 
            <Divider />
            <Link component={RouterLink} to='/dashboard/chart'>
              <ListItem onClick={this.handleDrawerClose}>
                <ListItemIcon><BarChart /></ListItemIcon>
                <ListItemText primary='Chart' ></ListItemText>
              </ListItem>
            </Link>
            <Divider />
            <Link component={RouterLink} to='/dashboard/upload'>
              <ListItem onClick={this.handleDrawerClose}>
                <ListItemIcon><CloudUpload /></ListItemIcon>
                <ListItemText primary='Data Upload' ></ListItemText>
              </ListItem>
            </Link>
            <Divider />
            <Link component={RouterLink} to='/dashboard/settings'>
              <ListItem onClick={this.handleDrawerClose}>
                <ListItemIcon><Settings /></ListItemIcon>
                <ListItemText primary='Settings' ></ListItemText>
              </ListItem>
            </Link>
            <Divider />
            <Link onClick={this.handleLogout}>
              <ListItem onClick={this.handleDrawerClose} >
                <ListItemIcon><SettingsPowerRounded /></ListItemIcon>
                <ListItemText primary='Logout' ></ListItemText>
              </ListItem>
            </Link>
          </List>
         </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Route exact path='/dashboard' component={HomePage} />
            <Route  path='/dashboard/chart' component={Chart} />
            <Route  path='/dashboard/viewData' component={ViewEachData} />
            <Route  path='/dashboard/upload' component={FileUpload} />
            <Route  path='/dashboard/settings' render={() => <SettingsPage userData={this.state.userData} />}/>
          </main>
      </div>
    );
  }
}

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
function mapStateToProps(state){
  return{
    allData:state.file.allData
  }
}
function mapDispatchToProps(dispatch){
return bindActionCreators({
allFileData,removeSelectData
},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles,{ withTheme: true })(DashBoard));
