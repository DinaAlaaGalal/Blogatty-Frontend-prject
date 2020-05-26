import React, { Component } from "react";
import axios from "axios";

class UnFollow extends Component {
  state = {
    users: [
      {
        username: "",
        password: "",
        email: "",
        posts: [
          {
            postTitle: "",
            postBody: "",

            tagName: "",
            photo: "",
            postDate: new Date().toString(),
          },
        ],
        following: [],
      },
    ],
  };

  async componentDidMount() {
    const { data } = await axios.delete(
      process.env.REACT_APP_BACKEND_URL+`/unFollow/${this.props.match.params.id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    console.log(data);
    this.setState({ users: data.users });
    console.log(this.state.users);
  }
  render() {
    return (
      <React.Fragment>
        {this.state?.users?.map((user, ucount) =>
          user.posts.map((post, index) => (
            // {this.state.users.map.posts?.map((post, index) => (
            <div className="container" key={post._id}>
              <div className="row">
                <div className="col-sm-12 col-md-8 offset-md-2">
                  <div className="card  mt-5 mb-5 text-center">
                    <div className="card-header myheader">
                      <h4>Your Mind</h4>
                    </div>
                    <form readonly>
                      <h3 className="card-title name text-info">
                        {user?.userName}
                      </h3>
                      <div className="card-body">
                        <input
                          readOnly
                          type="text"
                          className="form-control card-text sizing-lg tertiary-color"
                          name="postTitle"
                          value={post.postTitle}
                          aria-label="POST Title"
                          aria-describedby="addon-wrapping"
                        />
                        <textarea
                          readOnly
                          className="form-control card-text col-xs-12 tertiary-color"
                          rows="7"
                          cols="50"
                          aria-label="With textarea"
                          name="postBody"
                        >
                          {post.postBody}
                        </textarea>
                        <div className="pull-right"></div>
                        <div>
                          {post.tagName?.split(",").map((tag) => (
                            <span className="badge badge-info mt-3 margin-right-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="card-footer text-muted myheader">
                        {post.postDate}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </React.Fragment>
    );
  }
}
export default UnFollow;
