import './App.css';
import React, { useState, useEffect, useRef } from 'react';


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
    
  }, [props.PostInfo.post.id])

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
            comment => <Comment key={comment.id} CommentInfo={comment}></Comment>)
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

  const postId = useRef(0)
  
  useEffect(() => {
    const getPosts = () => {
      fetch("https://jsonplaceholder.typicode.com/posts/")
       .then(response => response.json())
       .then(inputJson => inputJson.map(input=> {
          const tmpUrl = 'https://jsonplaceholder.typicode.com/posts/'+input.id+'/comments';
          setPosts((posts) => [...posts,
            {post: input, commentUrl: tmpUrl}])
            postId.current = input.id;
          }
       ))
       setIsReady(true);
      }
    setTimeout(() => {
      getPosts();
    }, 2000);
  }, [])
   
  const [postUser, setPostUser] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const addPost = () => {
    postId.current += 1;
    if ( postUser && postTitle && postBody){
      const newPost = {
        id: postId.current, 
        userId: postUser, 
        title: postTitle,
        body: postBody
      };
      setPosts((posts) => [{post: newPost, commentUrl: ""}, ...posts]);
      setPostUser("");
      setPostTitle("");
      setPostBody("");
      console.log( posts);
    } else {alert("You must fill all of (User, Title, Body)")}
  }

  return (
    <div className="App">
      <h1>Hello! Simple Blog of WIT Week-03 study 😊</h1>
      <div className="WritePost">
        <p><textarea className="WritePostUser" 
          type="text" placeholder="User" 
          value={postUser} onChange={(e) => {setPostUser(e.target.value)}} >
        </textarea>
        
        <textarea className="WritePostTitle" 
              type="text" placeholder="Title"
              value={postTitle} onChange={(e) => {setPostTitle(e.target.value)}}>
          </textarea>
        </p>
        <p><textarea className="WritePostBody" 
              type="text" placeholder="Body"
              value={postBody} onChange={(e) => {setPostBody(e.target.value)}}>
            </textarea>
        </p>
        <button onClick={addPost}>+</button>
      </div>
      <div>
        {
          isReady ?  
          posts.map(post => <Post key={post.post.id} PostInfo={post}></Post>)
          : "Loding..."
        }
      </div>
    </div>
  );
}

export default App

