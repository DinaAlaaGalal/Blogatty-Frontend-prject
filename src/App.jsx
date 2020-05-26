import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Route, Switch } from "react-router-dom";
import Navbar from "./Components/navbar.jsx";
import UnFollow from'./Components/UnFollow';

import Post from "./Components/Post";
import LogInForm from "./Components/LogIn";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import SignIn from'./Components/SignIn';
import OtherProfile from'./Components/OtherProfile';
import Following from'./Components/Following';
import AllFollowers from'./Components/ALLFollwers';
// import Joi from'joi-browser';
import axios from'axios';
// import Register from'./Components/Register'
class App extends Component {

  // state=require('./database/mydb.json');
state={
}
async componentDidMount(){

  var {data}=await axios.get(process.env.REACT_APP_BACKEND_URL+"/")
  // const users=data;
  console.log(data)
    this.setState({originalData:data.users,users:data.users,PageNo:data.response.pages,PageCount:data.response.pagesCount,activePage:1,pageSize:6

    })
     console.log(this.state.PageNo)
     console.log(this.state.PageCount)
     console.log(this.state.activePage)
     console.log(this.state.originalData)
    //=JSON.parse(JSON.stringify(users))

     console.log(data)
     console.log(this.state.users)
      // console.log(this.state.orignalData)  
}

// handleSplice = (Uindex,pindexx) => {
//   let   users = [...this.state.users];
//  if(users[uindex].posts.length===pindexx)
//     users.splice(uindex,1)

//     else
//     {
//      users[uindex]= users[uindex].posts.filter((p,index)=>p[index]!==pindex)
//     }
//    this.setState({users})
// };

handlePageChange=page=>{
   
  this.setState({ activePage:page});


 }


  handleAddUser = user => {
    console.log(this.state.users)
    let users = [{...this.state.users}];
    
    users.push(user);
   
    this.setState({ users:users });
    
  };

  handleUserUpdate=user=>{
    const users=[{...this.state.users}];
    console.log(users)
    const index=users.findIndex(p=>p.id=user.id);
    users[index]=user;
    this.setState({users}); 

    }
    
    // GetReady=()=>{
    //   let  myUsers=JSON.parse(JSON.stringify(this.state.users))
    //   this.state.orignalData=JSON.parse(JSON.stringify(myUsers))
    //   this.setState({originalData:myUsers})

    // }
  SearchPosts = ({ target }) => {
    // clone

    if(localStorage.getItem("token")){
   //  let users = [...this.state?.users];
   let users = JSON.parse(JSON.stringify(this.state.users));
    console.log(users)
  let copy=JSON.parse(JSON.stringify(this.state?.users))

    copy= copy.filter(c=>c.posts=[]);
      console.log(users)
    // filter
     users.filter((u,index)=>
      u.posts.filter((post) => {
        if (post.postTitle?.includes(target.value.toString())) {
          console.log(u.posts)
          console.log(post);
           u.posts = [];
           u.posts.push(post);
            copy[index].posts.push(post);
            console.log(copy)
          return post;
        }
        else if (post.tagName?.includes(target.value.toString())) {
           u.posts = [];
           u.posts.push(post);
            copy[index].posts.push(post);
          return post;
        }
       else if(u.userName?.includes(target.value.toString())) {
          u.posts = [];
          u.posts.push(post);
           copy[index].posts.push(post);
         return post;
       }

      })
    );
if(target.value==""){
  let originalData=[...this.state.originalData]
   console.log(originalData)
    
   this.setState({users:[...originalData]});
   console.log(this.state.users)

  // console.log(copy)
  // this.setState({users});

}
   // return copy;
  else{
       users=[...copy];
    console.log(copy)
    console.log(users);
    // setState
    this.setState({users});}
   }
  };
     
  // SearchPosts = ({ target }) => {
  //   // clone
  //   let users = [...this.state?.users];
  //   console.log(users)
  //   let copy=JSON.parse(JSON.stringify(this.state?.users))
  //   copy= copy.filter(c=>c.posts=[]);
  //     console.log(users)
  //   // filter
  //    users.filter(u=>
  //     u.posts.filter(post => {
  //       if (post.postTitle?.includes(target.value.toString())) {
  //         console.log(u.posts)
  //         console.log(post);
  //          u.posts = [];
  //          u.posts.push(post);
  //           copy[u.id-1].posts.push(post);
  //         return post;
  //       }
  //       else if (post.tagName?.includes(target.value.toString())) {
  //          u.posts = [];
  //          u.posts.push(post);
  //           copy[u.id-1].posts.push(post);
  //         return post;
  //       }
  //       if(u.username?.includes(target.value.toString())) {
  //         u.posts = [];
  //         u.posts.push(post);
  //          copy[u.id-1].posts.push(post);
  //        return post;
  //      }
  //     })
  //   );
  //    users=[...copy];
  //   console.log(copy)
  //   console.log(users);
  //   // setState
  //   this.setState({users});
  // };

      //   handleDelete=async (userId,postId)=>{
      //     //  const orignaldata={...this.state.searchedPosts};
      //     // console.log(this.state.searchedPosts)
      //      // const posts=this.state.users.posts.filter(u=>u._id!=userId);
      // //      
      // //   //  console.log(posts)
      // //     this.setState({users:posts });
      //   //  console.log(posts)
      //   //  this.setState({ posts });
      //     //  axios.defaults.baseURL=`http://localhost:3000/users/${user._id}/${postId}`;
      //           //clone
      //     const users={...this.state.users};
      //     console.log(users)
      //          // filter
      //         //  console.log(users)
      //        const posts= users.users.filter(u=>
      //     u.posts.filter(post =>post._id!=userId));
      //     //setstate
      //     this.setState({users });
      //     //delete frm database
      //    // const {data}=await axios.delete(`http://localhost:3000/users/${userId}/${postId}`);
      //     // axios.interceptors.response.use(error=>{
      //     //   if(error.response && error.response.status==404){
      //     //        this.setState({data})
      //     //          alert('this user already deleted');
      //     //        }
      //     //        else{
      //     //              alert('something went wrong');
      //     //             }
          
      //     //             this.setState({orignaldata })
      //     // })  
        
      //   }      
  render() {
    console.log(this.state.users)
    return (
      <div className="App" >
        <React.Fragment>
          <Navbar  users={this.state?.users} SearchPosts={this.SearchPosts} GetReady={this.GetReady} ></Navbar>
            <Switch>   
                <Route
                  path="/Home"
                  render={props => <Home {...props} users={this.state?.users} PageNo={this.state?.PageNo}  pageChange={this.handlePageChange} pageSize={this.state.pageSize} activePage={this.state.activePage}/>}
                />
               <Route
                path="/SignUp"
                render={props => 
                  <SignIn {...props} handleAddUser={this.handleAddUser}  users={this.state.users}/>
                }
              /> 
                   <Route path="/Profile" render={props => <Profile {...props}  handleDelete={this.handleDelete} handleUserUpdate={this.handleUserUpdate} users={this.state.users}/>} /> 
                <Route path="/Profile/:id" render={props => <Profile {...props}  handleDelete={this.handleDelete} handleUserUpdate={this.handleUserUpdate} users={this.state.users}/>} /> 
                <Route path="/AnotherProfile/:id" render={props => <OtherProfile {...props}  handleDelete={this.handleDelete} handleUserUpdate={this.handleUserUpdate} users={this.state.users}/>} /> 

                <Route
                path="/unFollow/:id"
                render={props => <UnFollow  {...props} users={this.state.users}/>}
              />
               <Route
                path="/Post"
                render={props => <Post {...props} users={this.state.users} />}
              />
              <Route
                path="/Follow/:id"
                render={props => <Following {...props} users={this.state.users}/>}
              />

                <Route
                path="/Follow"
                render={props => <AllFollowers {...props} users={this.state.users}/>}
              />
              {/* <Route
                path="/Following"
                render={props => <Following {...props} users={this.state.users} />}
              /> */}
             
                 <Route
                path="/"
                render={props =>
                <LogInForm {...props} users={this.state.users} handleAddUser={this.handleAddUser} />
                }
              />
            </Switch>
            
        </React.Fragment>
      </div>
    );
  }
}
export default App;
