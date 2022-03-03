import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Grid, Paper } from '@material-ui/core';
import './styles/main.css';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentView: undefined};
  }

  render() {
    return (
      <HashRouter>
      <div>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <TopBar currentView={this.state.currentView}/>
        </Grid>
        <div className="cs142-main-topbar-buffer"/>
        <Grid item sm={3}>
          <Paper className="cs142-main-grid-item">
            <UserList updateCurrentView = {this.updateCurrentView} twoUserLists={false}/>
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper className="cs142-main-grid-item">
            <Switch>           
              <Route path="/users/:userId"
                render={ props => <UserDetail {...props} updateCurrentView = {this.updateCurrentView}/> }
              />
              <Route path="/photos/:userId"
                render ={ props => <UserPhotos {...props} updateCurrentView = {this.updateCurrentView}/> }
              />
              <Route path="/users" component={UserList} updateCurrentView = {this.updateCurrentView} twoUserLists={true}/>
            </Switch>
          </Paper>
        </Grid>
      </Grid>
      </div>
      </HashRouter>
    );
  }

  // A callback so that children can tell the PhotoShare that the user has changed
  updateCurrentView = (updatedView) => {        
    this.setState({currentView: updatedView});    
  };
}

ReactDOM.render(
  <PhotoShare/>,
  document.getElementById('photoshareapp'),
);