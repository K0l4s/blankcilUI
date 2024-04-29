import React, { useEffect, useRef, useState } from 'react';
import './PodcastPost.css';
import { CiPlay1 } from 'react-icons/ci';
import { FcComments, FcLike } from 'react-icons/fc';
import { act } from 'react-dom/test-utils';
import { use } from 'i18next';
import { useAudioPlayer } from './PodcastContext';

const PodcastPost = ({ podcast, index }) => {
  const { audioRefs, pauseOthers } = useAudioPlayer();
  const audioRef = useRef(null);

  audioRefs.current[index] = audioRef;

  const handlePlay = () => {
    pauseOthers(index);
  };
  return (

    <div className="podcast">
      
      {/* <div className="playButton">
        <button onClick={handlePlay}><CiPlay1 /></button>
      </div> */}
      <div className="header">
        <div className="info">
          <img src="https://cdn.tgdd.vn/hoi-dap/1314184/podcast-la-gi-co-gi-thu-vi-nghe-podcast-o-dau-2-1.jpg" alt="" className="img" />
          <div className="titleAndName">
            <h3>Tiêu đề: Podcast 01</h3>
            <p>Tác giả: Huỳnh Trung Kiên</p>
          </div>

        </div>

        <div className="react">
          <div className="like">
            <FcLike />
            <span>10K</span>
          </div>
          <div className="comment">
            <FcComments />
            <span>10K</span>
          </div>
        </div>

      </div>
      <div className="body">
        <div className="description">
          <p>Chúng tôi rất tự hào về sản phẩm này!</p>
        </div>
        <div className="audio">
          <audio ref={audioRef} controls onPlay={handlePlay}>
            <source src={podcast.audioUrl} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
};

export default PodcastPost;
