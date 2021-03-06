import React from 'react';
import { Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import './userDetail.css';
import axios from 'axios';

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {   
    super(props);
    this.state = { user: undefined };
    
    var promise = axios.get("http://localhost:3000/user/" + this.props.match.params.userId);
    promise.then(response => {
        this.setState({user: response.data});
      })
      .catch(err => console.err("Error in userDetail axios get: " + err));
  }

  render() {        
    // Return nothing if the fetch isn't complete
    if(this.state.user === undefined) return (<div/>);

    // Upon rendering, callback to the parent to update the current view context
    let name = this.state.user.first_name + " " + this.state.user.last_name;        

    return (
      <div>
        <Typography variant="body1">          
          <b>{name}</b>
        </Typography>
        <Typography variant="body1">          
          <b>Description:</b> {this.state.user.description}
        </Typography>
        <Typography variant="body1">          
          <b>Occupation:</b> {this.state.user.occupation}
        </Typography>
        <Typography variant="body1">          
          <b>Location:</b> {this.state.user.location}
        </Typography>
        <Typography variant="body1">
          <b>UserID:</b> {this.state.user._id}
        </Typography> 
        <Link to={`/photos/${this.state.user._id}`} replace>
          <Typography variant="body1">
            <b>Check out {name}&apos;s photos</b>
          </Typography> 
        </Link>
      </div>
    );
  }  
  
  // Re-render when there's new props; but to avoid infinite loop, only setState if the user is new
  componentDidUpdate()
  {
    var newUser;
    var promise = axios.get("http://localhost:3000/user/" + this.props.match.params.userId);         
    promise.then(response => {
        newUser = response.data;
        if(newUser !== this.state.user)    
        {
          this.setState({ user: newUser });
          this.props.updateCurrentView("Details of user: " + newUser.first_name + " " + newUser.last_name);      
        }
      })
      .catch(err => console.err(err));    
  }

  componentDidMount()
  {
    // Return nothing if the fetch isn't complete
    if(this.state.user === undefined) return;

    this.props.updateCurrentView("Details of user: " + this.state.user.first_name + " " + this.state.user.last_name);
  }
}

export default UserDetail;