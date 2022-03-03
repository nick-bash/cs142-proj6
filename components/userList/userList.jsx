import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText  
}
from '@material-ui/core';
import {Link} from 'react-router-dom';
import './userList.css';
import axios from 'axios';

class UserList extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {users: undefined};

    var promise = axios.get("http://localhost:3000/user/list");
    promise.then(response => {      
      this.setState({users: response.data});
      })
      .catch(err => console.err(err));
  }

  render() {
    // If promise not returned, return nothing
    if(this.state.users === undefined) return (<div/>);
    
    if(this.props.twoUserLists)
    {
      this.forceUpdate();    
    }
    return (
      <List component="nav">
        {this.state.users.map(user => {return (
          <div key={user._id}>
            <Link to={`/users/${user._id}`} key={user._id} replace>
              <ListItem key={user._id}>
                <ListItemText key={user._id}>{user.first_name} {user.last_name}</ListItemText>
              </ListItem>
            </Link>
            <Divider/>
          </div>
          );
        })
        }
      </List>
    );
  }

  // Change currentView if the user list is being shown in the main body of the UI
  componentDidMount() {    
    if(this.props.twoUserLists) {
      this.props.updateCurrentView("");
    }
  }

  // Change currentView if the user list is being shown in the main body of the UI
  componentDidUpdate() {
    if(this.props.twoUserLists) {
      this.props.updateCurrentView("");
    }
  }
}

export default UserList;