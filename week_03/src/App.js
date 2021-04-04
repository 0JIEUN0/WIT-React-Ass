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
          <div>{props.PostInfo.post.userName}</div>
        </div>
        <div className="Box">
          <div className="Theme">Title</div>
          <div>{props.PostInfo.post.title}</div>
        </div>
        <hr />
        <div className="Box">
          <div className="Theme">Body</div>
          <div>{props.PostInfo.post.content}</div>
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

  const postId = useRef(106)
  
  useEffect(() => {
    const getPosts = () => {
      fetch("http://localhost:8080/api/v1/posts")
       .then(response => response.json())
       .then(inputJson => {
         inputJson.map(input=> {
          const tmpUrl = 'https://jsonplaceholder.typicode.com/posts/'+input.id+'/comments';
          setPosts((posts) => [...posts,
            {post: input, commentUrl: tmpUrl}])
          })
          postId.current = Math.max.apply(null, inputJson.map(input => input.id))
          //console.log(postId.current)
        }
       )
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
    if ( postUser && postTitle && postBody){
      postId.current += 1;
      const newPost = {
        id: postId.current, 
        userName: postUser, 
        title: postTitle,
        content: postBody,
      };      
      
      setPosts((posts) => [{post: newPost, commentUrl: ""}, ...posts]);
      fetch("http://localhost:8080/api/v1/posts", {
        method: 'POST',
        headers: new Headers({
          "Content-Type": "application/json",
        }) ,
        body: JSON.stringify({
          userName: postUser, 
          title: postTitle,
          content: postBody,
          time: new Date()
        })
      })
      
      setPostUser("");
      setPostTitle("");
      setPostBody("");

      console.log(newPost.id)
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

