import React, { Component } from "react";
// import { Link, NavLink } from "react-router-dom";
// import{Route}from"react-router-dom";
import axios from "axios";

class Post extends Component {
  state = {
    posts: {
      postTitle: "",
      postBody: "",

      tagName: "",

      photo: "",
      postDate: new Date().toString(),
    },
  };

  handleChange = ({ target }) => {
    //Clone
    const posts = { ...this.state.posts };
    console.log(posts);
    //Edit
    console.log(target.name);
    posts[target.name] = target.value;
    //Set Satate
    this.setState({ posts });
  };
  componentDidMount() {
   
  }
  onFileChange = async ({ target }) => {
    const posts = { ...this.state.posts };
    posts[target.name] = target.files[0].name;
    // await axios.post("http://localhost:3000/upload");

    //Set Satate
    this.setState({ posts });
    // e.target.files[0].name
  };

  handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
        console.log(localStorage.getItem("token"));
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL+"/Post",
        this.state.posts,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(localStorage.getItem("token"));
      console.log(data.searcheduser);

      //  this.props.handleAddUser(data);
      this.setState(data.searcheduser)
      console.log("Done!");
      // this.props.history.replace(`/Profile/${data.searcheduser._id}`);}
      this.props.history.replace(`/Profile`);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-8 offset-md-2">
              <div className="card  mt-5 mb-5 text-center">
                <div className="card-header myheader">Your Mind</div>
                <form onSubmit={this.handleSubmitUser}>
                  <div className="card-body">
                    {/* <h3 className="card-title name text-info">{this.state.P.username}</h3> */}
                    <input
                      type="text"
                      className="form-control card-text sizing-lg"
                      placeholder="POST Title"
                      aria-label="POST Title"
                      aria-describedby="addon-wrapping"
                      onChange={this.handleChange}
                      name="postTitle"
                    />
                    <textarea
                      className="form-control card-text col-xs-12"
                      rows="7"
                      cols="50"
                      aria-label="With textarea"
                      placeholder="POST Body"
                      name="postBody"
                      onChange={this.handleChange}
                    ></textarea>

                    <input
                      type="text"
                      className="form-control card-text  sizing-lg"
                      name="tagName"
                      placeholder="tags are comma separted"
                      aria-label="Tags"
                      aria-describedby="addon-wrapping"
                      onChange={this.handleChange}
                    />
                    <div className="mb-3 mt-2">
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#browseModal"
                      >
                        <i
                          type="file"
                          id="photo"
                          name="photo"
                          className="fas fa-images"
                        ></i>
                      </button>
                    </div>
                    <div
                      className="modal fade"
                      id="browseModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog margin-top-lg"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Browse Your image
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form
                              action="/api/images"
                              method="post"
                              enctype="multipart/form-data"
                            >
                              <input
                                type="file"
                                id="myfile"
                                name="photo"
                                onChange={this.onFileChange}
                              />
                              <input
                                type="submit"
                                value="Submit"
                                data-dismiss="modal"
                              />
                            </form>
                          </div>
                          {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div></div>
                    <button type="submit" className="btn btn-primary btn-lg">
                      Post
                    </button>
                  </div>
                </form>
                <div className="card-footer text-muted myheader">
                  {this.state.postDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Post;
