import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class SignUpForm extends Component 
{
    constructor() 
    {
        super();

        this.state = 
        {
          fields: {},
          errors: {}
        };

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
  
  handleSubmit(event) 
  {
       
      event.preventDefault();
      var apiBaseUrl = "http://localhost:5000/register";
      var self = this;
      var payload = 
      {
        "email":this.state.fields['email'],
        "fname":this.state.fields['fname'],
        "lname":this.state.fields['lname'],
        "password":this.state.fields['password'],
      }
      var config = 
      {
          
          header: {'Access-Control-Allow-Origin': '*'}
          
      };
      if (this.validateForm()) 
      {
      axios.post(apiBaseUrl, payload, config).then(function (response) 
       {
        console.log(response);
        
          if (response.data.status === 201) 
          {
            self.props.history.push
            (
        
              {
              pathname: '/regsucc',
              state: {email: self.state.email}
              }
            );
          }
          else if(response.data.status === 200)
        {
          alert("Please use a different email");
          self.props.history.push({
            pathname: '/register'
           
          });
        }
          else 
          {
            alert("Internal Server Error: Unable to register");
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
        errors["email"] = "*Please enter your email.";
      }
      if (!fields["fname"]) {
        formIsValid = false;
        errors["fname"] = "*Please enter your firstname.";
      }
      if (!fields["lname"]) {
        formIsValid = false;
        errors["lname"] = "*Please enter your lastname.";
      }
      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }
      this.setState({
        errors: errors
      });
      return formIsValid;
  
    }

    render() 
    {
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="fname">First Name</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Enter your first name" name="fname" value={this.state.fname} onChange={this.handleChange} />
                <div>{this.state.errors.fname}</div>
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="lname">Last Name</label>
                <input type="text" id="lname" className="FormField__Input" placeholder="Enter your last name" name="lname" value={this.state.lname} onChange={this.handleChange} />
                <div>{this.state.errors.lname}</div>
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                <div>{this.state.errors.password}</div>
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                <div>{this.state.errors.email}</div>
              </div>
            <div className="FormField">
                  <button className="FormField__Button mr-20">Sign Up</button> 
              </div>
            </form>
          </div>
        );
    }
  }
export default withRouter(SignUpForm);