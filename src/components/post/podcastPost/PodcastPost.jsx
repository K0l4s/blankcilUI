import React, { createElement, useEffect, useRef, useState } from 'react';
import './PodcastPost.css';
import { CiPlay1 } from 'react-icons/ci';
import { FcComments, FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { act } from 'react-dom/test-utils';
import { use } from 'i18next';
import { useAudioPlayer } from './PodcastContext';
import { Comment } from '../comment/Comment';
import { delay } from 'framer-motion';
import { apiPath } from '../../../api/endpoint';
import axios from 'axios';

const PodcastPost = ({ podcast, index }) => {
  const [comments, setComments] = useState([]);

  const { audioRefs, pauseOthers } = useAudioPlayer();
  const videoRef = useRef(null);
  const [isLike, setIsLike] = useState(false);
  audioRefs.current[index] = videoRef;
  useEffect(() => {
    console.log(podcast.hasLiked)
    if (podcast.hasLiked) {
      setIsLike(true);
    }
  }, []);
  const handleLike = () => {
    
    const token = localStorage.getItem('access_token');
    axios.post(apiPath + `users/like/podcast/${podcast.id}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data);
      if(response.data.message === "Liked"){
        setIsLike(true);
        podcast.numberOfLikes += 1;
      }else{
        setIsLike(false);
        podcast.numberOfLikes -= 1;
      }
    //   setIsLike(!isLike);
    // if (isLike) {
    //   podcast.numberOfLikes -= 1;
    // } else {
    //   podcast.numberOfLikes += 1;
    // }
    }
    ).catch((error) => {
      console.error('Error:', error);
    });
  }

  const handlePlay = () => {
    pauseOthers(index);
    if (videoRef.current) {
      videoRef.current.play();
      // Kiểm tra vị trí của video hiện tại, nếu vượt ngoài khung hình thì sẽ scroll đến vị trí của video
      const rect = videoRef.current.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        // videoRef.current.scrollIntoView();
        // Cuộn xuống, vị trí của video sẽ nằm ở giữa màn hình
        videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
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

  const commentRequest = async () => {
    const content = document.getElementById('createComment'+podcast.id).value;
    console.log(content);
    const token = localStorage.getItem('access_token');
    
    // axios.post(apiPath + `users/comment/podcast`, {
    //   content: content,
    //   podcastId: podcast.id,
    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // }).then((response) => {
    //   console.log(response.data);
    //   setComments([...comments, response.data.body]);
    // }
    // ).catch((error) => {
    //   console.error('Error:', error);
    // });
    // Gửi x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append('content', content);
    formData.append('podcastId', podcast.id);
    axios.post(apiPath + `users/comment/podcast`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      console.log(response.data);
      setComments([...comments, response.data.body]);
    }
    ).catch((error) => {
      console.error('Error:', error);
    });

  }

  const [isOpenComment, setIsOpenComment] = useState(false);
  useEffect(() => {
    // Nếu isOpenComment là true thì sẽ mở tab comment
    // const item= document.getElementById("podcast"+index).scrollIntoView();

    if (isOpenComment) {
      // Thêm className .isCommentOpen để hiển thị tab comment
      document.getElementById("podcast" + index).classList.add("isCommentOpen");
      console.log("isOpenComment", isOpenComment);
      // Ẩn element reaction
      document.getElementById("reaction" + index).style.display = "none";
      document.getElementById("closeComment" + index).style.display = "flex";
      getComments();
      // Xoá hết comment có parentComment khác rỗng trong comments
      const newComments = comments.filter((comment) => comment.parentComment === null);
      setComments(newComments);

    } else {
      // Xoas className .isCommentOpen 
      document.getElementById("podcast" + index).classList.remove("isCommentOpen");
      document.getElementById("reaction" + index).style.display = "flex";
      document.getElementById("closeComment" + index).style.display = "none";
    }
  }, [isOpenComment]);
  const getComments = async () => {
    // const response = await fetch(apiPath + `podcast/view/${podcast.id}/comments`);
    // const data = await response.json();
    // setComments(data.body);
    // Dùng axios, endpoint này không có authentication
    axios.get(apiPath + `podcast/view/${podcast.id}/comments`
      ,{headers: {
        'ngrok-skip-browser-warning': 'any_value'
      }
      }
    )
      .then((response) => {
        setComments(response.data.body);
      })
    // console.log(comments);
  }

  return (
    <div className="podcast" id={"podcast" + index}>
      <div id={"closeComment" + index} className="closeComment" onClick={() => setIsOpenComment(!isOpenComment)}>
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
      <div className="reaction" id={"reaction" + index}>
        <div className="like">
          {isLike ? 
            (<FcLike onClick={handleLike} className='icon' />):
            (<FcLikePlaceholder onClick={handleLike} className='icon' />)
          }
          <span>{podcast.numberOfLikes}</span>
        </div>
        <div className="comment">
          <FcComments className='icon' onClick={() => setIsOpenComment(!isOpenComment)} />
          <span>{podcast.numberOfComments}</span>
        </div>
      </div>
      {/* <div className="description">
        <p>{podcast.content}</p>
      </div> */}
      {isOpenComment && comments && (
        <>
        <div className="commentTab">

          <div className="comments">
            <p style={{ color: 'black' }}>CÁC BÌNH LUẬN HIỆN CÓ</p>
            {comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </div>
          
          

        </div>
        <div className="createComment">
        <input id={'createComment'+podcast.id} type="text" placeholder="Viết bình luận" />
        <button onClick={commentRequest}>Gửi</button>
      </div>
      </>
      )}



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
