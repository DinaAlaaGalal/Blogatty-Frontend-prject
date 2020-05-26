import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
  state = {
    users: {
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
    },
    shownBtn: false,
  };

  async componentDidMount() {
       const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL+`/Profile`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    console.log(data);
    this.state.shownBtn = false;
    this.setState({ users: data.searchedPosts });
    console.log(this.state);
  }

  handleSetUrlONDelete = async (e, postId) => {
    e.preventDefault();
    // const orignalData=JSON.parse(JSON.stringify(this.state.users))
    const users = { ...this.state.users };
    const posts = users.posts.filter((post) => post._id != postId);
    console.log(posts);
    const u = { ...users, posts };
    // this.props.history.replace(`/Profile/${postId}`);
    this.setState({ users: u });
    console.log(this.state.users);
    await axios.delete(`http://localhost:3000/Profile/${postId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

   
  };
  //  componentWillUnmount(){

  //   }

  handleChange = async ({ target }, id) => {
    //Clone
    const users = { ...this.state.users };
    //Edit
    // console.log(target.name)
    users.posts[target.name] = target.value;
  

    users.posts[id][target.name] = target.value;
    //Set Satate
    this.state.shownBtn = true;
    this.setState({ users });
    console.log(this.state.users);
  };

  handleSubmit = async (e, index) => {
    e.preventDefault();
    console.log(this.state.users.posts[index]._id);
    this.props.history.replace(`/Profile/${this.state.users.posts[index]._id}`);
    let { data } = await axios.patch(
      process.env.REACT_APP_BACKEND_URL+`/Profile/${this.state.users.posts[index]._id}/${this.state.users.posts[index].postTitle}/${this.state.users.posts[index].postBody}`,
      null,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    this.setState({ users: data.searchedUser });
  };

  
  getBShown() {
    const classes =
      this.state.shownBtn != false
        ? "btn btn-info mb-3 btn-lg text-center shown"
        : "btn btn-primary unshown";
    return classes;
  }
 
  render() {
    return (
      <React.Fragment>
        <div className="jumbotron jumbotron-fluid backstyle">
          <h1 className="display-4 name">Blogatty!</h1>
          <hr className="my-4" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
        </div>

        <div className="container">
          <div className="row"></div>
          <div className=" col-sm-12 col-md-12">
            <div
              className="Home-img"
              style={{ backgroundImage: "url('/profile.jpg')" }}
            ></div>
          </div>
        </div>

        {this.state.users?.posts?.map((post, index) => (
          <div className="container" key={post._id}>
            <div className="row">
              <div className="col-sm-12 col-md-9">
                <div className="card  mt-5 mb-5 text-center">
                  <div className="card-header myheader">
                    <h4>Your Mind</h4>
                    <i
                      className="fa fa-trash  margin-right-sm prim-color"
                      aria-hidden="true"
                      onClick={(e) => this.handleSetUrlONDelete(e, post._id)}
                    ></i>
                  </div>
                  <img className="pst-img" src={post.photo} />
                  <form onSubmit={(e) => this.handleSubmit(e, index)}>
                    <h3 className="card-title name text-info">
                      {this.state.users?.userName}
                    </h3>
                    <div className="card-body">
                      <input
                        type="text"
                        className="form-control card-text sizing-lg tertiary-color"
                        name="postTitle"
                        value={post.postTitle}
                        aria-label="POST Title"
                        aria-describedby="addon-wrapping"
                        onChange={(e) => this.handleChange(e, index)}
                      />
                      <textarea
                        className="form-control card-text col-xs-12 tertiary-color"
                        rows="7"
                        cols="50"
                        aria-label="With textarea"
                        onChange={(e) => this.handleChange(e, index)}
                        name="postBody"
                      >
                        {post.postBody}
                      </textarea>
                      <div className="pull-right"></div>
                      <div>
                        {post.tagName.split(",").map((tag) => (
                          <span className="badge badge-info mt-3 margin-right-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button type="submit" className={this.getBShown()}>
                      Save{" "}
                    </button>
                    <div
                      className="card-footer text-muted myheader"
                      onChange={this.handleChange}
                    >
                      {post.postDate}
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-sm-3 col-md-3">
                <div className="card p-3 mb-3 mt-5">
                  <blockquote className="blockquote mb-0 card-body">
                    <p className="text-info reviews">{post.postBody}.</p>
                    <footer className="blockquote-footer">
                      <small className="text-muted">
                        Someone famous in{" "}
                        <cite title="Source Title">Source Title</cite>
                      </small>
                    </footer>
                  </blockquote>
                </div>
                <div className="card p-3 mb-3">
                  <blockquote className="blockquote mb-0 card-body">
                    <p className="text-warning reviews">{post.postBody}.</p>
                    <footer className="blockquote-footer">
                      <small className="text-muted">
                        Someone famous in{" "}
                        <cite title="Source Title">Source Title</cite>
                      </small>
                    </footer>
                  </blockquote>
                </div>
                <div className="card p-3 mb-3">
                  <blockquote className="blockquote mb-0 card-body">
                    <p className="text-info reviews">{post.postBody}.</p>
                    <footer className="blockquote-footer">
                      <small className="text-muted">
                        Someone famous in{" "}
                        <cite title="Source Title">Source Title</cite>
                      </small>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
export default Profile;
