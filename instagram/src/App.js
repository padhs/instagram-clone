import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post.js'
import {database} from "./firebase";

function App() {

    const [posts, setPosts] =useState([]);

    useEffect(() => {
        database.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => doc.data()));
        })
    }, [posts])

  return (
    <div className = "app">
      <div className= "nav-bar">
          <img className="nav-bar-image"
               src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
               alt="insta-letter-logo"
          />
      </div>

        {
            posts.map(posts =>(
                <Post
                    //these elements are not being rendered
                    userName={posts.userName}
                    captions={posts.captions}
                    imageUrl={posts.imageUrl}
                    postAvatar={posts.postAvatar}/>
            ))
        }

    </div>
  );
}

export default App;
