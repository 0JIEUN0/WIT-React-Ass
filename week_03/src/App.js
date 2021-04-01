import './App.css';
import React, { useState, useEffect } from 'react';


function Post(props) {
  const [comments, setComments] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const getComments = () => {
    fetch(props.PostInfo.commentUrl)
      .then(response => response.json())
      .then(inputJson => {
        inputJson.map((input) => setComments((comments) => [...comments, input]));
      });
    
    setIsReady(true);
  };

  useEffect(() => {
    setTimeout(() => {
        getComments();
      }, 2000);
    
  }, [])

  return (
      <div className="App-post">
        <div className="Box">
          <div className="Theme">User</div>
          <div>{props.PostInfo.post.userId}</div>
        </div>
        <div className="Box">
          <div className="Theme">Title</div>
          <div>{props.PostInfo.post.title}</div>
        </div>
        <hr />
        <div className="Box">
          <div className="Theme">Body</div>
          <div>{props.PostInfo.post.body}</div>
        </div>
        <hr />
        <div>
          { 
          isReady?
          comments.map(
            comment => <Comment CommentInfo={comment}></Comment>)
            : "Loding..."
          }
        </div>
      </div>
    );  
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

function App(props) {
  const [posts, setPosts] = useState([]);
  const [isReady, setIsReady] = useState(false)

  
  useEffect(() => {
    const getPosts = () => {
      fetch("https://jsonplaceholder.typicode.com/posts/")
       .then(response => response.json())
       .then(inputJson => inputJson.map(input=> {
          const tmpUrl = 'https://jsonplaceholder.typicode.com/posts/'+input.id+'/comments';
          setPosts((posts) => [...posts,
            {post: input, commentUrl: tmpUrl}])
          }
       ));
       setIsReady(true);
      }
    setTimeout(() => {
      getPosts();
    }, 2000);
  }, [])
   
  return (
    <div className="App">
      <h1>Hello! Simple Blog of WIT Week-03 study 😊</h1>
      <div>
        {
          isReady ?  
          posts.map(post => <Post PostInfo={post}></Post>)
          : "Loding..."
        }
      </div>
    </div>
  );
}

export default App

