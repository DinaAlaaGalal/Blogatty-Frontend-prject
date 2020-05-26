import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {};

  render() {
    console.log(this.props.users);

    return (
      <React.Fragment>
        <nav>
          <div className="brandContainer">
            <div className="brandContainer__skewed_container">
              <div className="brandContainer__brand_parent">
                <a className="brandContainer__brand_parent__navbar-brand">
                  Blogatty
                </a>{" "}
              </div>
            </div>
          </div>
          <div>
            <ul className="navbar-itemcontainer">
              <li className="navbar-itemcontainer__item">
                <Link className="nav__link link" to="/Home">
                  home
                </Link>
              </li>
              <li className="navbar-itemcontainer__item">
                <Link className="nav__link  link" to="/Profile">
                  Blogs
                </Link>
              </li>
              <li className="navbar-itemcontainer__item">
                {" "}
                <Link className="nav__link  link" to={`/Follow`}>
                  {" "}
                  Followers
                </Link>
              </li>
            </ul>
          </div>
          {localStorage.getItem("token") ? (
            <input
              className="searchBar"
              type="search"
              placeholder="Search"
              onChange={this.props.SearchPosts}
              aria-label="Search"
            />
          ) : (
            <input
              readOnly
              className="searchBar"
              type="search"
              placeholder="Search"
              onChange={this.props.SearchPosts}
              aria-label="Search"
            />
          )}

          <button className="search-btn" type="submit">
            <i className="fas fa-search fa-2x search "></i>
          </button>
          <div className="userdata">
            <i className="fas fa-user-circle nav-icons"></i>

            {localStorage.getItem("token") ? (
              <h5 className="seccolor">Hi,{localStorage.getItem("Name")}</h5>
            ) : (
              <h5></h5>
            )}
          </div>
          <i className="far fa-bell nav-icons"></i>

                <Link type="button" className="postbtn" to="/Post">
            {" "}
            Write Post
          </Link>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
