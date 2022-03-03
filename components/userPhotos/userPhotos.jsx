import React from 'react';
import { Typography, Divider } from '@material-ui/core'; 
import { Link } from 'react-router-dom';
import './userPhotos.css';
import axios from 'axios';

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);    
    this.state = { photos: undefined, user: undefined };

    var promise = axios.get("http://localhost:3000/photosOfUser/" + this.props.match.params.userId);
    promise.then(response => {
        this.setState({photos: response.data});
      })
      .catch(err => console.err(err));
      
    promise = axios.get("http://localhost:3000/user/" + this.props.match.params.userId);
    promise.then(response => {
        this.setState({user: response.data});
        this.props.updateCurrentView("Photos of user: " + this.state.user.first_name + " " + this.state.user.last_name);
      })
      .catch(err => console.err(err));
  }

  render() {
    // If promise not returned, return nothing
    if(this.state.photos === undefined || this.state.user === undefined)
    {
      return (<div/>);
    }
    
    return (
      <div>
        {this.state.photos.map(photo => {
          if(photo === undefined) return (<div/>);

          return (
          <div className="cs142-photo-box" key={photo._id}>
            <Typography variant="subtitle2">{photo.date_time.substr(0,10)}</Typography>
            <img src={`../../images/${photo.file_name}`} className="cs142-photo"/>
            {this.renderComments(photo)}
          </div>
          );       
        })}        
      </div>
    );
  }

  renderComments(photo) {
    if(this.state.photos === undefined) return (<div/>);
    
    if(photo.comments === undefined) return (<div/>);

    // console.log("userPhotos.jsx/User is " + this.state.user.first_name);
    // console.log("userPhotos.jsx/First comment is" + photo.comments[0].comment);
    // console.log("userPhotos.jsx/First comment user" + photo.comments[0].user);

    return (
      photo.comments.map(comment => {
        let name = comment.user.first_name + " " + comment.user.last_name;
        return (
          <div className="cs142-comment" key={comment._id}>            
            <Link to={`/users/${comment.user._id}`} key={comment.user._id} replace>
              <Typography variant="subtitle2">{name} </Typography>
            </Link>            
            <Typography variant="subtitle2">{comment.comment} </Typography>
            <Typography variant="subtitle2">{comment.date_time.substr(0,10)}</Typography>
            <Divider/>
          </div>
        );
      })
    );    
  }

  // Update the view context
  componentDidMount()
  {
    // If promise hasn't returned, return nothing
    if(this.state.user === undefined) return;
    
    this.props.updateCurrentView("Photos of user: " + this.state.user.first_name + " " + this.state.user.last_name);
  }

}

export default UserPhotos;