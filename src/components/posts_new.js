import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';



class PostsNew extends Component {
  renderField(field){
    //{...field.input}  fiels.input is an object which contains a bunch of different handlers and a bunch of different props. Stuff like onchange, onBlur onFocus, it has also has the value of the input.
    // by doing the ..., want all of the different properties and this object to be comuunicated as props to the input
    //{...field.input}  equal to 
    //onChange={field.input.onChange}
    //onBlur={field.input.onBlur}
    //onFocus={field.input.onFocus}
    // we don't need wire above thing manually
    return(
      <div className={`form-group row ${field.meta.touched && field.meta.error? 'has-danger':'has-success'}`}>
        <label>{field.labelToShow}</label>
        <input className="form-control" type="text" {...field.input} /> 
        <div className="text-danger">
        {field.meta.touched? field.meta.error : ''}
        </div>
      </div>
    );
  }
  onSubmit(values){
    //onSubmit we really want to call action creator that action creator will be responsible for posting the API 
    // go to actions folder to create export fucntion createPost(values){}
    this.props.createPost(values, ()=>{
      this.props.history.push('/');
    });
  }
  render(){
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field labelToShow="Title" name="title" component={this.renderField}/>
        <Field labelToShow="Category" name="category" component={this.renderField}/>
        <Field labelToShow="Post Content" name="content" component={this.renderField} />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to='/' className="btn btn-danger">Cancel</Link>

      </form>
    );
  }
}
// the validate function will automatically be called for us at certain points during the form's lifecycle
function validate(values){
  //cosole.log(values) -> 
  const errors = {};
  //Validates the inputs from 'values'
  if(!values.title || values.title.length < 3){
    errors.title = "Title cannot empty or less than 3 characters!";
  }
  if(!values.category){
    errors.category = "Title cannot empty!";
  }
  if(!values.content){
    errors.content = "Title cannot empty!";
  }
  //If errors is empty, the form is fine to submit
  //If errors has *any* properties, redux form assumes for is invalid
  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'   //unique name of form
})(
  connect(null, { createPost })(PostsNew)
);