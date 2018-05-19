import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router-dom';

class PostsShow extends Component{
  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.fetchPost(id);
  }
  onDeleteClick(){
    const {id} = this.props.match.params;
    this.props.deletePost(id, ()=> {
      this.props.history.push('/');
    });
  }
  render(){
    const { post } = this.props;
    if (!post){
      return <div>Loading...</div>;
    }
    //this.props === ownProps
    //posts[this.props.match.params.id]; // the post we want to show
    //console.log(posts[this.props.match.params.id]);
    return (
      <div>
        Posts Show!
        <Link to='/'> Back To Index</Link>        
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete Post</button>
        <h3>Title: {post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>Content: {post.content}</p>
      </div>
      
    );
  }
}

function mapStateToProps({posts}, ownProps){
  return { post: posts[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);

