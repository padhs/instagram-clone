import React, {useState} from 'react';
import './App.css';
import Post from './Post.js'

function App() {

    //adding post-state
    // const postStates = [posts, setPosts] = useState({
    //     userName: "",
    //     imageUrl: "",
    //     captions: "",
    //     postAvatar: {/*this will contain  user-profile-image*/},
    //     likeCount: 0})

  return (
    <div className = "app">
      <div className= "nav-bar">
          <img className="nav-bar-image"
               src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
               alt="insta-letter-logo"
          />
      </div>
        <Post
            userName="padhs"
            captions="This is my first Instagram post."
            imageUrl="https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/08/gettyimages-464163411.jpg?crop=1.0xw:1xh;center,top&resize=980:*"
            postAvatar="https://thispersondoesnotexist.com/image"/>

        <Post
            userName="chipun"
            captions="This is my second Instagram post."
            imageUrl="https://www.petlandflorida.com/wp-content/uploads/2019/09/Petland_Florida_Cavalier_King_Charles_Spaniel_puppy.jpg"
            postAvatar="https://thispersondoesnotexist.com/image"/>

        <Post
            userName="DorkyHead"
            captions="This is my third Instagram post."
            imageUrl="https://cdn.akc.org/content/article-body-image/cavkingcharlessmalldogs.jpg"
            postAvatar="https://thispersondoesnotexist.com/image"/>
    </div>
  );
}

export default App;
