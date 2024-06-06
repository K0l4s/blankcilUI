import React, { createElement, useEffect, useRef, useState } from 'react';
import './PodcastPost.css';
import { CiPlay1 } from 'react-icons/ci';
import { FcComments, FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { act } from 'react-dom/test-utils';
import { use } from 'i18next';
import { useAudioPlayer } from './PodcastContext';
import { Comment } from '../comment/Comment';
import { delay } from 'framer-motion';
import { apiPath, domainName } from '../../../api/endpoint';
import axios from 'axios';
import { Tooltip, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BsPlay } from 'react-icons/bs';

const PodcastPost = ({ podcast, index }) => {

  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  let userAvatar = podcast.user_podcast.avatar_url;
  if (userAvatar === null) {
    userAvatar = "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611750.jpg"
  }

  const toast = useToast();
  const [commentIndex, setCommentIndex] = useState(0);

  const [comments, setComments] = useState([]);

  const { audioRefs, pauseOthers } = useAudioPlayer();
  const videoRef = useRef(null);
  useEffect(() => {
    if (podcast.audio_url) {
      videoRef.current.src = podcast.audio_url;
    }
  }, [podcast]);
  useEffect(() => {
    if (!videoRef.current)
      return <p>Loading...</p>
  }, [videoRef.current]);
  const [isLike, setIsLike] = useState(false);
  audioRefs.current[index] = videoRef;
  useEffect(() => {
    // console.log(podcast.hasLiked)
    if (podcast.hasLiked) {
      setIsLike(true);
    }
  }, []);
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const progressValue = (video.currentTime / video.duration) * 100;
      setProgress(progressValue);

    };
  }
  const handleLike = () => {

    const token = localStorage.getItem('access_token');
    axios.post(apiPath + `users/like/podcast/${podcast.id}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data);
      if (response.data.message === "Liked") {
        setIsLike(true);
        podcast.numberOfLikes += 1;
      } else {
        setIsLike(false);
        podcast.numberOfLikes -= 1;
      }
    }
    ).catch((error) => {
      console.error('Error:', error);
      toast({
        title: "Lỗi",
        description: "Thao tác quá nhanh hoặc chưa đăng nhập. Vui lòng thử lại!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
    });

  }

  const handlePlay = () => {
    pauseOthers(index);
    const video = videoRef.current;

    if (!video) {
      alert("Đang tải video");
      return;
    }

    if (video.paused) {
      video.play();

      // Update UI elements
      document.getElementById('playicon' + index).style.display = 'none';
      document.getElementById('backdrop' + index).style.opacity = 0;
      document.getElementById(`avatar${index}`).classList.add('isPlay');

      // Scroll to the video if it's not in view
      const rect = video.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        video.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }
  };

  const handlePause = () => {
    const video = videoRef.current;

    if (video && !video.paused) {
      // Pause the video if it's playing
      video.pause();

      // Update UI elements
      document.getElementById(`avatar${index}`).classList.remove('isPlay');
      document.getElementById('playicon' + index).style.display = 'block';
      document.getElementById('backdrop' + index).style.opacity = 1;
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
    const content = document.getElementById('createComment' + podcast.id).value;
    console.log(content);
    const token = localStorage.getItem('access_token');
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
      document.getElementById('createComment' + podcast.id).value = '';
      podcast.numberOfComments += 1;
    }
    ).catch((error) => {
      console.error('Error:', error);
      toast({
        title: "Lỗi",
        description: "Thao tác quá nhanh hoặc chưa đăng nhập. Vui lòng thử lại!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right"
      });
    });

  }

  const [isOpenComment, setIsOpenComment] = useState(false);
  const formatTime = (timeInSeconds) => {
    const totalSeconds = Math.floor(timeInSeconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours > 0 ? `${hours}:` : '';
    const formattedMinutes = hours > 0 ? String(minutes).padStart(2, '0') : minutes;
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  };
  useEffect(() => {
    // Nếu isOpenComment là true thì sẽ mở tab comment
    // const item= document.getElementById("podcast"+index).scrollIntoView();
    // const aside = document.querySelector('aside');
    // const mediaQuery = window.matchMedia("(max-width: 768px)");

    if (isOpenComment) {
      // if (aside.style.width == "250px" && !mediaQuery.matches) {
      //   aside.style.width = "0";
      //   aside.style.opacity = "0";
      // }
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
      // if (window.innerWidth > 768) {
      //   document.querySelector('aside').classList.add('minum');
      // }
    } else {
      // Xoas className .isCommentOpen 

      document.getElementById("podcast" + index).classList.remove("isCommentOpen");

      document.getElementById("reaction" + index).style.display = "flex";
      document.getElementById("closeComment" + index).style.display = "none";
      // toggleAside();
      // if (window.innerWidth > 768) {
      //   document.querySelector('aside').classList.remove('minum');
      // }
    }
  }, [isOpenComment]);
  const getComments = () => {
    console.log("commentindex: " + commentIndex)
    toast.closeAll()
    toast({
      title: "Đang tải bình luận",
      description: "Vui lòng chờ trong giây lát",
      status: "info",
      duration: 9000,
      isClosable: true,
      position: "bottom-right"
    })
    axios.get(apiPath + `podcast/view/${podcast.id}/comments?page=${commentIndex}`
      , {
        headers: {
          'ngrok-skip-browser-warning': 'any_value'
        }
      }
    )
      .then((response) => {
        setComments([...comments, ...response.data.body]);
        setCommentIndex(commentIndex + 1);
        toast.closeAll();
        toast({
          title: "Tải bình luận thành công",
          description: "Đã tải xong bình luận",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom-right"
        })

      })
  }
  const handleTimelineClick = (e) => {
    const video = videoRef.current;
    const timeline = e.target;
    const newTime = (e.nativeEvent.offsetX / timeline.offsetWidth) * video.duration;
    video.currentTime = newTime;
  };
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };
  return (
    <div className="podcast" id={"podcast" + index} >
      {!isVideoLoaded && <div className="loading">
        <div className="loader"></div>
        <p>ĐANG TẢI...</p>
      </div>}
      
      <div id={"closeComment" + index} className="closeComment" onClick={() => { setIsOpenComment(!isOpenComment) }}>
        X
      </div>
      <div className="header">
        <div className="info">
          <img id={`avatar${index}`} onClick={() => navigate("/profile/" + podcast.user_podcast.id)} src={userAvatar} alt=""
            className="img" />
          <div className="titleAndName">
          <Tooltip hasArrow label={podcast.title} bg='gray.300' color='black'>
            <h3 style={{fontFamily:'lightmorning'}}>{podcast.title.length < 12 ? podcast.title : podcast.title.substring(0, 12) + '...'}</h3>
          </Tooltip>
            <p
              onClick={() => navigate("/profile/" + podcast.user_podcast.id)}
            >Tác giả:{podcast.user_podcast.fullname}</p>
          </div>
        </div>
      </div>
      <div className="reaction" id={"reaction" + index}>
        <div className="like">
          {isLike ?
            (<FcLike onClick={handleLike} className='icon' />) :
            (<FcLikePlaceholder onClick={handleLike} className='icon' />)
          }
          <span>{podcast.numberOfLikes >= 1000 ? (podcast.numberOfLikes / 100).toFixed(2) + 'K' :
            podcast.numberOfLikes >= 1000000 ? (podcast.numberOfLikes / 100000).toFixed(2) + 'M' :
              podcast.numberOfLikes >= 1000000000 ? (podcast.numberOfLikes / 1000000000).toFixed(2) + 'B' :
                podcast.numberOfLikes}</span>
        </div>
        <div className="comment">
          <FcComments className='icon' onClick={() => setIsOpenComment(!isOpenComment)} />
          <span>{podcast.numberOfComments >= 1000 ? (podcast.numberOfComments / 100).toFixed(2) + 'K' :
            podcast.numberOfComments >= 1000000 ? (podcast.numberOfComments / 100000).toFixed(2) + 'M' :
              podcast.numberOfComments >= 1000000000 ? (podcast.numberOfComments / 1000000000).toFixed(2) + 'B' :
                podcast.numberOfComments}</span>
        </div>
      </div>
      {/* <div className="description">
        <p>{podcast.content}</p>
      </div> */}
      {isOpenComment && comments && (
        <>
          <div className="commentTab">

            <div className="comments">
              {/* <p style={{ color: 'black' }}>CÁC BÌNH LUẬN HIỆN CÓ</p> */}
              {comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
              ))}
              {/* Nếu comments.length < numberOfComments thì hiển thị nút xem thêm */}
              {comments.length < podcast.numberOfComments && (
                <div className="viewMore">
                  <button onClick={getComments}>Xem thêm</button>
                </div>
              )}
            </div>



          </div>
          <div className="createComment">
            <input id={'createComment' + podcast.id} type="text" placeholder="Viết bình luận" />
            <button onClick={commentRequest}>Gửi</button>
          </div>
        </>
      )}



      <div className="body">
      {isVideoLoaded &&
        <BsPlay className='playicon' id={'playicon' + index} onClick={handlePlay} />}
        <div className="backdrop" id={'backdrop' + index} onClick={handlePause}></div>
      
        <div className="video">

          <video width="360px" height="640px"
            ref={videoRef}
            onPlay={handlePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleVideoLoaded}>
            <source src={podcast.audio_url} type="video/mp4" />
          </video>
        </div>
      </div>
      {isVideoLoaded &&
      <div className="video_controls">
        <div className="time">
          <p style={{fontFamily:'Blackoninaut Bold BRK'}}>{videoRef.current && formatTime(videoRef.current.currentTime)}/{videoRef.current && formatTime(videoRef.current.duration)}</p>
        </div>
        <div className="timeline" onClick={handleTimelineClick}>
          <div className="progress" style={{ width: `${progress}%` }}><div className="currentDot"></div></div>
        </div>
      </div>}
    </div>
  );
};

export default PodcastPost;
