import './App.css';
import React, { Component } from 'react';

function Post(props) {
  return (
    <div className="App-post">
      <div><strong>User</strong> {props.PostInfo.userId}</div>
      <div><strong>Title</strong> {props.PostInfo.title}</div>
      <div><strong>Body</strong> {props.PostInfo.body}</div>
      <div>
      </div>
    </div>
  );
}

function Comment(props) {
  return (
    <div>
      <div><strong>{props.CommentInfo.name}</strong> {props.CommentInfo.email}</div>
      <div>{props.CommentInfo.body}</div>
    </div>
  );
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: "https://jsonplaceholder.typicode.com/posts/",
      json: []
    };  
  }


  render () {
    fetch(this.state.url)
      .then(response => response.json())
      .then(inputJson => this.setState(
        {json: inputJson}
      )
      );
    return (
      <div className="App">
        <h1>Hello! Simple Blog of WIT Week-02 study 😊</h1>
        <div>{this.state.json.map(
          post => <Post key={post.id} PostInfo={post}></Post>
        )}</div>
      </div>
    );
  };
}

export default App

