import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import Joi from "joi-browser";
class LogInForm extends Component {
  state = {
    users: {
      password: "",
      email: "",
      errors: {},
    },
  };

  handleChange = ({ target }) => {
    //Clone
    const users = { ...this.state.users };
    //console.log(users);
    //Edit
    //console.log(target.name);
    users[target.name] = target.value;
    //Set Satate
    this.setState({ users });
  };

  getErrorEmail() {
    const classes = this.state.users.errors?.email != null ? "error" : "";
    return classes;
  }

  getErrorPassword() {
    const classes = this.state.users.errors?.password != null ? "error" : "";
    return classes;
  }

  schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(20).required(),
  };

  validate = (value) => {
    console.log(value);
    const result = Joi.validate(value, this.schema, {
      abortEarly: false,
    });

    const errors = {};
    const users = { ...this.state.users };
    console.log(result);

    //No Errors

    if (result.error === null) {
      users.errors = errors;

      this.setState({ users });

      return null;
    }
    //Errors
    for (const error of result.error.details) {
      errors[error.path] = error.message;
    }
    console.log(errors);
    users.errors = errors;
    this.setState({ users });
    return errors;
  };

  // console.log(this.props.users);
  // const users = [...this.props.users];
  // console.log(users);
  // console.log(this.state.user.email);
  // const user = users.filter(u => u.email == e.target[0].value);
  // console.log(user);
  // //console.log(user.password)
  // console.log();
  //if (user.length>0) {

  handleSubmitUser = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_URL+ "/",
      this.state.users
    );
    console.log(data.searcheduser);
    //   if(data.searcheduser.email!=undefined){
    //  // console.log(user.password)
    //   console.log(this.state.users.password)
    //  // console.log(user[0].password ==this.state.users.password)
    console.log(data.token);
    if (data.searcheduser) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("Name", data.searcheduser.userName);
      localStorage.setItem("_id", data.searcheduser._id);
      console.log(localStorage.getItem("Name"));
      this.props.history.replace(`/Post`);
    } else {
    
       swal("Oops!", "Invalid credintials!", "error");

      this.props.history.replace("/SignUp");
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container loginwall offset-2 margin-top-md">
          <div className="row">
            <div className=" col-sm-6 col-md-4">
              <div className="log_form">
                <div className="form_Header">
                  <h2 className="log_h"> Log In Form </h2>
                  <i className="fas fa-lock fa-3x" id="lock"></i>
                </div>
                <form id="form1" onSubmit={this.handleSubmitUser}>
                  <input
                    value={this.state.users.email}
                    onChange={this.handleChange}
                    className={this.getErrorEmail}
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    id="log-t1"
                  />
                  <input
                    value={this.state.users.password}
                    onChange={this.handleChange}
                    className={this.getErrorPassword()}
                    onBlur={() => this.validate(this.state.users)}
                    type="password"
                    name="password"
                    required
                    placeholder="Passsword"
                    id="log-t2"
                  />
                  <button className="log-button" type="submit" id="log-button">
                    
                    Log In
                  </button>
                </form>
              </div>
            </div>
            <div className=" col-sm-6 col-md-4 offset-2">
              <div
                className="login-img"
                style={{ backgroundImage: "url('/login2.PNG')" }}
              ></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default LogInForm;
