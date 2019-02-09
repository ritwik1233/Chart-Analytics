import React from 'react';
import DashBoard from './DashBoard';
import Home from './Home';
import {Route,Switch} from 'react-router-dom'
const Routes=()=>{
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={DashBoard} />
        </Switch>
    )
}
export default Routes