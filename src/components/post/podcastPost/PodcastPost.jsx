import React, { useEffect, useRef, useState } from 'react';
import './PodcastPost.css';
import { CiPlay1 } from 'react-icons/ci';
import { FcComments, FcLike } from 'react-icons/fc';
import { act } from 'react-dom/test-utils';
import { use } from 'i18next';
import { useAudioPlayer } from './PodcastContext';
import { Comment } from '../comment/Comment';

const PodcastPost = ({ podcast, index }) => {
  const { audioRefs, pauseOthers } = useAudioPlayer();
  const videoRef = useRef(null);

  audioRefs.current[index] = videoRef;

  const handlePlay = () => {
    pauseOthers(index);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

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
    <div className="podcast" id={"podcast" + index} >
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
            <h3>Tiêu đề: Podcast 01</h3>
            <p>Tác giả: Huỳnh Trung Kiên</p>
          </div>
        </div>
      </div>
      <div className="reaction" id={"reaction"+index}>
        <div className="like">
          <FcLike className='icon'/>
          <span>10K</span>
        </div>
        <div className="comment">
          <FcComments className='icon' onClick={() => setIsOpenComment(!isOpenComment)} />
          <span>10K</span>
        </div>
      </div>
      <div className="description">
        <p>Chúng tôi rất tự hào về sản phẩm này!</p>
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
            <source src="https://storage.googleapis.com/download/storage/v1/b/blankcil.appspot.com/o/main%2F2-thuanngo9112@gmail.com%2F41c93001-03b7-403a-895c-8d130a656cd9.mp4?generation=1714732026459117&alt=media" type="video/mp4" />
          </video>
        </div>
      </div>

    </div>
  );
};

export default PodcastPost;
