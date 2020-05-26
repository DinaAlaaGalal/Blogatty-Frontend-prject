import React, { Component } from "react";
import axios from "axios";
import ReactJoiValidations from "react-joi-validation";
import Joi from "joi-browser";

ReactJoiValidations.setJoi(Joi);

class signIn extends Component {
  state = {
    users: {
      username: "",
      password: "",
      email: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(20).required(),
  };
  //  }
  getErrorEmail() {
    const classes = this.state.users.errors?.username != null ? "error" : "";
    return classes;
  }

  getErrorPassword() {
    const classes = this.state.users.errors?.password != null ? "error" : "";
    return classes;
  }

  getErrorUsername() {
    const classes = this.state.users.errors?.email != null ? "error" : "";
    return classes;
  }

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

  handleChange = ({ target }) => {
    //Clone
    const users = { ...this.state.users };
    console.log(users);
    //Edit
    console.log(target.name);
    users[target.name] = target.value;
    //Set Satate
    this.setState({ users });
  };

  handleSubmitUser = async (e) => {
    e.preventDefault();
    const users = { ...this.state.users };
    console.log(users);
    const { data } = await axios.post(process.env.REACT_APP_BACKEND_URL+"/SignUp", users);
    console.log(data);
    localStorage.setItem("Name", data.myobj.userName);
    localStorage.setItem("_id", data.myobj._id);
    localStorage.setItem("token", data.token);

    this.props.history.replace(`/Post`);
  };

  
  render() {
    return (
      <React.Fragment>
        <div className="container loginwall offset-2 margin-top-md">
          <div className="row">
            <div className=" col-sm-6 col-md-4 ">
              <div className="sign_form">
                <div className="form_Header">
                  <h2 className="sign_h"> Sign Up Form </h2>
                  <i className="fas fa-pencil-alt fa-3x" id="pen"></i>
                </div>
                <form id="form2" onSubmit={this.handleSubmitUser}>
                  <input
                    type="text"
                    placeholder="Name"
                    id="sign-t1"
                    required
                    name="username"
                    value={this.state.users.username}
                    onChange={this.handleChange}
                    onBlur={() => this.validate(this.state.users)}
                    className={this.getErrorUsername()}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    id="sign-t2"
                    required
                    name="password"
                    value={this.state.users.password}
                    onChange={this.handleChange}
                    onBlur={() => this.validate(this.state.users)}
                    className={this.getErrorPassword()}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    id="sign-t3"
                    required
                    name="email"
                    value={this.state.users.email}
                    onChange={this.handleChange}
                    onBlur={() => this.validate(this.state.users)}
                    className={this.getErrorEmail()}
                  />
                  <button type="submit" id="sign_button">
                    {" "}
                    Sign Up
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
export default signIn;
