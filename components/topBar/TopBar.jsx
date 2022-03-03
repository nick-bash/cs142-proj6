import React from 'react';
import {
  AppBar, Toolbar, Typography
} from '@material-ui/core';
import './TopBar.css';
import axios from 'axios';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    var version;    
    this.state = {currentView: this.props.currentView, version: version};
    
    var promise = axios.get("http://localhost:3000/test/info");
    promise.then((response) => {
        this.setState({version: response.data.__v});
      })
      .catch((err) => {
        console.error("Error in TopBar axios get request: " + err.response);
      });
  }

  render() {
        
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar className="cs142-topbar-toolbar">
          <Typography variant="h5" color="inherit">
              Nicholas Bashour
          </Typography>
          <Typography variant="h5" color="inherit">
              Version: {this.state.version}
          </Typography>
          <Typography variant="h5" color="inherit">
              {this.state.currentView}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  componentDidUpdate() {
    var iife = () => {
      if(this.props.currentView !== this.state.currentView) {
        this.setState({currentView: this.props.currentView});
      }
    };
    iife();
  }
}

export default TopBar;