import React, { Component } from "react";
import Pagination from "./paginatin";
import axios from "axios";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    users: [],
  };

  static getDerivedStateFromProps(props, state) {
    return {
      users: props.users,
    };
  }

  componentDidMount() {}
  handleVisitProfile = async (PId) => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_URL+`/AnotherProfile/${PId}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(data.searchedPosts);
  };

  handleSeeFollwerProfile = async (PId) => {
    const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL+`/Following`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(data.searchedPosts);
  };

  // handleSplice = (uIndex, pIndexx) => {
  //   let users = [...this.state.users];
  //   users = users.filter((u, ui) => {
  //     if (ui > uIndex) {
  //       return u;
  //     } else if (ui == uIndex) {
  //       u.posts = u.posts.filter((p, pi) => pi > pIndexx);
  //       return u;
  //     }
  //   });
  //   console.log(users);
  //   this.setState({ users });
  // };
  // handleSpliceSmaller = (uIndex, pIndexx) => {
  //   let users = [...this.state.users];
  //   users = users.filter((u, ui) => {
  //     if (ui < uIndex) {
  //       return u;
  //     } else if (ui == uIndex) {
  //       u.posts = u.posts.filter((p, pi) => pi < pIndexx);
  //       return u;
  //     }
  //   });
  // }

  // handleSpliceSmaller = (uIndex, pIndexx) => {
  //   let users = [...this.props.users];
  //   users = users.filter((u, ui) => {
  //     if (ui < uIndex) {
  //       return u;
  //     } else if (ui == uIndex) {
  //       u.posts = u.posts.filter((p, pi) => pi < pIndexx);
  //       return u;
  //     }
  //   });
  // }
  // handleSpliceSmaller = (uIndex, pIndexx) => {
  //   let users = [...this.props.users];
  //   counter=
  //   users = users.filter((u, ui) => {
  //     if (ui < uIndex) {
  //       return u;
  //     } else if (ui == uIndex) {
  //       u.posts = u.posts.filter((p, pi) => pi < pIndexx);
  //       return u;
  //     }
  //   });
  //   console.log(users);
  //   this.setState({ users });
  // };

  render() {
    console.log(this.props.users);
    const startIndex = (this.props.activePage - 1) * this.props.pageSize;
    console.log(startIndex);
    let counter2 = 0;
    let counter = startIndex;
    // const showedItems = this.props.users?.slice(startIndex,startIndex + this.props.pageSize);
    const showedItems = startIndex + this.props.pageSize;
    console.log(startIndex);
    var uIndex;
    var pIndex;
    console.log(this.props.activePage);

    // let  users=[...this.state?.users]

    // var items = users.slice(
    //   startIndex,
    //   startIndex + this.props.pageSize);
    //   //  var counter2=0;
    // console.log(showedItems);
    // console.log(this.props.users);
    // console.log(this.state.users)
    return (
      <React.Fragment>
        <div className="container">
          <div className="row"></div>
          <div className=" col-sm-12 col-md-12">
            <div
              className="Home-img"
              style={{ backgroundImage: "url('/Home.jpg')" }}
            ></div>
          </div>
        </div>

        {this.state?.users?.map((user, ucount) =>
          user.posts.map((post, index) => {
            counter2 += 1;
            counter += 1;
          
            return counter2 > startIndex && counter2 <= showedItems ? (
             
              // (console.log("hhhh" + showedItems),
              // console.log("nnnn" + startIndex),
              // (uIndex = ucount),
              // (pIndex = index),
              (
                <div className="container">
                  <div className="row">
                    <div className="col-sm-3 col-md-3">
                      <div className="card">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <img className="news-icon" src="./news.jpg" />
                            <a href="">
                              <p class="text-center cody">
                                To shewing another demand to Received shutters
                                expenses.
                              </p>
                            </a>
                          </li>
                          <li className="list-group-item">
                            <img className="news-icon" src="./news.jpg" />
                            <a href="">
                              <p class="text-center cody">
                                To shewing another demand to Received shutters
                                expenses.
                              </p>
                            </a>
                          </li>
                        </ul>
                      </div>{" "}
                    </div>
                    <div className="col-sm-6 col-md-9 ">
                      <div
                        className="card mb-5"
                        style={{ maxWidth: "540px;" }}
                        key={post.postTitle}
                      >
                        <div className="row no-gutters">
                          <div className="col-md-4">
                            <img
                              src={post.photo}
                              className="card-img crdImg"
                              alt="..."
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body ">
                              <Link
                                to={`/AnotherProfile/${user._id}`}
                                onClick={() =>
                                  this.handleVisitProfile(user._id)
                                }
                              >
                                <h5 className="card-title">{user.userName}</h5>
                              </Link>

                              {localStorage.getItem("token") &&
                              localStorage.getItem("Name") !==
                                user.userName ? (
                                <Link to={`/Follow/${user._id}`}>
                                  <i class="fab fa-foursquare sec-color follow name mr-5"></i>
                                </Link>
                              ) : (
                                <i></i>
                              )}

                              {localStorage.getItem("token") &&
                              localStorage.getItem("Name") !==
                                user.userName ? (
                                <Link to={`/unFollow/${user._id}`}>
                                  <i class="fas fa-unlink sec-color follow name"></i>
                                </Link>
                              ) : (
                                <i></i>
                              )}

                              <h5 className="card-title">{post.postTitle}</h5>
                              <p className="card-text">{post.postBody}</p>
                              {post.tagName.split(",").map((tag) => (
                                <span className="badge badge-info margin-right-sm">
                                  {tag}
                                </span>
                              ))}
                              <p className="card-text">
                                <small className="text-muted">
                                  {post.postDate}
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <React.Fragment></React.Fragment>
            );
          })
        )}
        <Pagination
          PageNo={this.props?.PageNo}
          pageChange={this.props?.pageChange}
          pageSize={this.props?.pageSize}
          activePage={this.props?.activePage}
          handleSplice={this.handleSplice}
          handleSpliceSmaller={this.handleSpliceSmaller}
          uIndex={uIndex}
          pIndex={pIndex}
        ></Pagination>
      </React.Fragment>
    );
  }
}

export default Home;
