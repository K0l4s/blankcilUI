import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Single_podcast.css';
import { FcLike } from "react-icons/fc";
import { MdOutlineComment } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

const Single_podcast = ({ podcast }) => {
  const imageDefault = 'https://static.vecteezy.com/system/resources/previews/024/051/849/original/podcast-topic-rgb-color-icon-entertainment-platform-streaming-media-content-production-radio-show-themes-isolated-illustration-simple-filled-line-drawing-editable-stroke-vector.jpg';

  return (
    <div className="podcast-item">
      <img src={podcast.thumbnail_url || imageDefault} alt="ImagePodcast" className="image" />
      <div className="info">
        {/* <p className="name">{podcast.id}</p> */}
        <p className="description">{podcast.content}</p>
      </div>
      <div className="icons">
        <div className="love">
          <FcLike/>
          <span>{podcast.numberOfLikes}</span>
        </div>
        <div className="comments">
          <MdOutlineComment/>
          <span>52</span>
        </div>
        <div className="views">
          <FaPlay/>
          <span>52K</span>
        </div>
      </div>
    </div>
  );
};

export default Single_podcast;
