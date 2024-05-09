import React, { createElement, useEffect, useRef, useState } from 'react';
import './PodcastPost.css';
import { CiPlay1 } from 'react-icons/ci';
import { FcComments, FcLike } from 'react-icons/fc';
import { act } from 'react-dom/test-utils';
import { use } from 'i18next';
import { useAudioPlayer } from './PodcastContext';
import { Comment } from '../comment/Comment';
import { delay } from 'framer-motion';

const PodcastPost = ({ podcast, index }) => {
  const { audioRefs, pauseOthers } = useAudioPlayer();
  const videoRef = useRef(null);

  audioRefs.current[index] = videoRef;

  const handlePlay = () => {
    pauseOthers(index);
    if (videoRef.current) {
      videoRef.current.play();
      // Kiểm tra vị trí của video hiện tại, nếu vượt ngoài khung hình thì sẽ scroll đến vị trí của video
      const rect = videoRef.current.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        // videoRef.current.scrollIntoView();
        // Cuộn xuống, vị trí của video sẽ nằm ở giữa màn hình
        videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center'});
      }

    }
  };
  useEffect(() => {
  videoRef.current?.addEventListener('ended', () => {
    const nextVideo = audioRefs.current[index + 1];
    if (nextVideo && nextVideo.current) {
      nextVideo.current.play();
    }
  });
  if (!podcast.audio_url) {
    return null;
  }
  }, []);

  const [isOpenComment, setIsOpenComment] = useState(false);
  useEffect(() => {
    // Nếu isOpenComment là true thì sẽ mở tab comment
    // const item= document.getElementById("podcast"+index).scrollIntoView();

    if (isOpenComment) {
      // Thêm className .isCommentOpen để hiển thị tab comment
      document.getElementById("podcast" + index).classList.add("isCommentOpen");
      console.log("isOpenComment", isOpenComment);
      // Ẩn element reaction
      document.getElementById("reaction"+index).style.display="none";
      document.getElementById("closeComment"+index).style.display="flex";
    } else {
      // Xoas className .isCommentOpen 
      document.getElementById("podcast" + index).classList.remove("isCommentOpen");
      document.getElementById("reaction"+index).style.display="flex";
      document.getElementById("closeComment"+index).style.display="none";
    }
  }, [isOpenComment]);

  return (
    <div className="podcast" id={"podcast" + index}>
      <div id={"closeComment"+index} className="closeComment" onClick={() => setIsOpenComment(!isOpenComment)}>
        X
      </div>
      {/* <div className="playButton">
        <button onClick={handlePlay}><CiPlay1 /></button>
      </div> */}
      <div className="header">
        <div className="info">
          <img src="https://cdn.tgdd.vn/hoi-dap/1314184/podcast-la-gi-co-gi-thu-vi-nghe-podcast-o-dau-2-1.jpg" alt="" className="img" />
          <div className="titleAndName">
            <h3>{podcast.title}</h3>
            <p>Tác giả: {podcast.user_podcast.fullname}</p>
          </div>
        </div>
      </div>
      <div className="reaction" id={"reaction"+index}>
        <div className="like">
          <FcLike className='icon'/>
          <span>{podcast.numberOfLikes}</span>
        </div>
        <div className="comment">
          <FcComments className='icon' onClick={() => setIsOpenComment(!isOpenComment)} />
          <span>{podcast.numberOfComments}</span>
        </div>
      </div>
      <div className="description">
        <p>{podcast.content}</p>
      </div>
      {isOpenComment? (
      <div className="commentTab">
        <p>CÁC BÌNH LUẬN HIỆN CÓ</p>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
      </div>):null}
      <div className="body">

        {/* <div className="audio">
          <audio ref={audioRef} controls onPlay={handlePlay}>
            <source src={podcast.audioUrl} type="audio/mpeg" />
          </audio>
        </div> */}
        <div className="video">
          <video width="360px" height="640px" ref={videoRef} onPlay={handlePlay} controls>
            <source src={podcast.audio_url} type="video/mp4" />
          </video>
        </div>
      </div>

    </div>
  );
};

export default PodcastPost;
