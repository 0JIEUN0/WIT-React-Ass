import './App.css';
import React, { Component } from 'react';


async function fetchEvent(url) {
  const response = await fetch(url);
  return await response.json();
}

class Post extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.PostInfo.id,
      url: "https://jsonplaceholder.typicode.com/posts/"+ this.props.PostInfo.id +"/comments",
      json: []
    }
  }
  /*
  const getComment = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1/comments");
    setResult(response.json());
  }
  //fetchEvent("https://jsonplaceholder.typicode.com/posts/1/comments").map(re => console.log(re.email));
  */

  render() {
    fetch(this.state.url)
      .then(response => response.json())
      .then(inputJson => this.setState(
        {json: inputJson}
      ));
    return (
      <div className="App-post">
        <div className="Box">
          <div className="Theme">User</div>
          <div>{this.props.PostInfo.userId}</div>
        </div>
        <div className="Box">
          <div className="Theme">Title</div>
          <div>{this.props.PostInfo.title}</div>
        </div>
        <hr />
        <div className="Box">
          <div className="Theme">Body</div>
          <div>{this.props.PostInfo.body}</div>
        </div>
        <hr />
        <div>
          {this.state.json.map(
            comment => <Comment key={comment.id} CommentInfo={comment}></Comment>
          )}
        </div>
      </div>
    );  
   }
  /*
  
      {getComment().map(
          comment => <Comment key={comment.id} CommentInfo={comment}></Comment>
        )}
        */
}

function Comment(props) {
  return (
    <div className="Box">
      <span className="Theme">ㄴ</span>
      <div>
        <strong>{props.CommentInfo.name}</strong> {props.CommentInfo.email}<br />
        {props.CommentInfo.body}
      </div>
    </div>
  );
}

class App extends Component {
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

