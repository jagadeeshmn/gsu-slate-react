import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


class SignInForm extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          fields: {},
          errors: {}
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    

    handleChange(event) 
  {
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
      fields
    });
  }
    handleSubmit(event) {
        event.preventDefault();

    var apiBaseUrl = "http://localhost:5000/login";
    var self = this;
    var payload = {
 
      "email":this.state.fields['email'],
      "password":this.state.fields['password']
      
    }
    var config = {
        
        header: {'Access-Control-Allow-Origin': '*'}
        
};
    if (this.validateForm()) {
    axios.post(apiBaseUrl, payload, config).then(function (response) 
   {
      console.log(response);
      
      
        if (response.data.status === 200 ) 
        {
       
          self.props.history.push
        
           (
      
             {
            pathname: '/home',
            state: {email: self.state.fields['email'],aid: response.data.aid}
            }
           );
        }
        else if(response.data.status === 401)
        {
          alert("Invalid credentials");
          self.props.history.push({
            pathname: '/login'
           
          });
        }
        else {
          alert("Internal Server Error");
          self.props.history.push({
            pathname: '/serverError'
          });
        }
      
    }
    )
  
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }
  //else
  //{alert("Fill the form details");}
  }
  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your username.";
    }
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your email-ID.";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;

  }
   render() {
   
        return (
         
        <div className="FormCenter">
        
        <form className="FormFields" onSubmit={this.handleSubmit}>
            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                <div>{this.state.errors.email}</div>
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                <div>{this.state.errors.password}</div>
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign In</button> 
              </div> 
             
          </form>
         </div>
          
          
        );
    }
}
export default withRouter(SignInForm);