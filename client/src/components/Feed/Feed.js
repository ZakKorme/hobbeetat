import {useState} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import { Typography, IconButton, AvatarGroup } from "@mui/material";


import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

import { useSelector } from "react-redux";
import { capitalize } from "../../utils/index";


// const posts = [
//   {
//     user: "John Smith",
//     time: "29min",
//     post: "I love this new book I've been reading!",
//     img: "",
//   },
//   {
//     user: "John Smith",
//     time: "2d",
//     post: "I love this new book I've been reading!",
//     img: "https://picsum.photos/200/200/",
//   },
//   {
//     user: "John Smith",
//     time: "15w",
//     post: "Join this new group I started!",
//     img: "",
//   },
//   {
//     user: "John Smith",
//     time: "29min",
//     post: "I love this new book I've been reading!",
//     img: "https://picsum.photos/200/200/",
//   },
//   {
//     user: "John Smith",
//     time: "2d",
//     post: "I love this new book I've been reading!",
//     img: "",
//   },
//   {
//     user: "John Smith",
//     time: "15w",
//     post: "Join this new group I started!",
//     img: "",
//   },
// ];

const Feed = (props) => {
  const hobbyState = useSelector((state => state.hobby));
  const posts = hobbyState.posts

  const [commentSelected, setCommentSelected] = useState(null);
  return (
    <>
      {posts.map((post, index) => {
        // Returns the details of the author
        return (
          // <Card key={index} style={{ marginBottom: "2%" }}>
            <div className="flex flex-col">
              <div className="p-5 bg-white mt-4 rounded-t-2xl shadow-sm">
                <div className="flex items-center space-x-2">
                <Avatar
                  alt="user profile"
                  src="https://www.fillmurray.com/500/900"
                  height={40}
                  width={40}
                />
                    <div >
                      <p className="font-medium m-0">{`${capitalize(post.author['first_name'])} ${capitalize(post.author['last_name'])}`}</p>
                      <p className="text-xs text-gray-400 m-0">{'07/10/21, 10:45PM'}</p>
                    </div>
                  </div>
                  <p className="m-0 pt-4">{post.content}</p>
                  </div>
                  {post.postImg ? (
                    <div className="relative h-56 md:h-96 bg:white">
                        <img alt="post" src={post.postImg} style={{ objectFit: "cover", layout: "fill"}}/>
                    </div>
                  ):null}

                  
              {/* <div className="flex items-center bg-white p-1">
                    <AvatarGroup >
                      <Avatar sx={{ height: 25, width: 25}}
                   alt="user profile"
                  src="https://loremflickr.com/640/360"/>
                      <Avatar 
                  sx={{ height: 25, width: 25}}  alt="user profile"
                  src="https://placekitten.com/640/360
                  "/>
                      <Avatar 
                  sx={{ height: 25, width: 25}}  alt="user profile"
                  src="https://placebeard.it/640x360"
                  />
                    </AvatarGroup>
                    <p className="text-xs text-gray-500 m-0">Zak Korme, Joe Smith, Jane Doe, and 25 others</p>
              </div>
               */}
              {/* Foot of the post */}
              
              {/* <div className="flex justify-between bg-white p-3 pb-0 border-b">
                      <div className="flex items-center p-1 rounded-none ">
                        <ThumbUpIcon className="text-gray-400" style={{ fontSize: "15px"}} />
                        <p className="pl-1 text-sm text-gray-400 m-0">25</p>
                      </div>
                      <div></div>
                      <div className="flex items-center p-1 rounded-none">
                        <p className="text-sm text-gray-400 m-0">3 comments</p>
                      </div>
                  </div> */}
                  <div className="flex justify-between items-center bg-white shadow-sm text-gray-400 border-t">
                <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-1 rounded-none cursor-pointer">
                  <ThumbUpIcon fontSize="small" />
                  <p className="text-xs sm:text-base m-0">Like</p>
                </div>
                <div onClick={() => setCommentSelected(!commentSelected)}className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-1 cursor-pointer">
                  <CommentIcon fontSize="small" />
                  <p className="text-xs sm:text-base m-0">Comment</p>
                </div>
                <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-1 cursor-pointer">
                  <ShareIcon fontSize="small" />
                  <p className="text-xs sm:text-base m-0">Share</p>
                </div>
              </div>
              {commentSelected ? (
              <div className="flex rounded-b-2xl bg-white shadow-sm text-gray-400 pt-1">
                <div className="flex p-3">
                <Avatar
                  alt="user profile"
                  src="https://placebeard.it/640x360"
                  height={30}
                  width={30}
                />
                <input className="flex p-1 pl-2 focus:outline-none" placeholder="Write a comment..." />
                </div>
                {/* <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-1 rounded-none rounded-bl-2xl cursor-pointer">
                  <ThumbUpIcon fontSize="small" />
                  <p className="text-xs sm:text-base m-0">Like</p>
                </div>
                <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-1 rounded-none cursor-pointer">
                  <CommentIcon fontSize="small" />
                  <p className="text-xs sm:text-base m-0">Comment</p>
                </div>
                <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-1 rounded-none rounded-br-2xl cursor-pointer">
                  <ShareIcon fontSize="small" />
                  <p className="text-xs sm:text-base m-0">Share</p>
                </div> */}
              </div>
              ):null}
            </div>
           
      )})}
    </>
  );
};

export default Feed;
