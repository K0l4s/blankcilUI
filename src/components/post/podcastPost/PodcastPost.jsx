import React, { useEffect, useState } from 'react';
import './PodcastPost.css';
import { CiPlay1 } from 'react-icons/ci';
import { FcComments, FcLike } from 'react-icons/fc';
import { act } from 'react-dom/test-utils';
import { use } from 'i18next';

const PodcastPost = ({ podcast }) => {
  const podcastId = podcast.id;
  const [podcastCurrent, setPodcastCurrent] = useState('00:00');
  const [podcastDuration, setPodcastDuration] = useState('00:00');
  // Xử lý like và comment về dạng 1K, 1M
  const formatLike = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    } else {
      return number;
    }
  };
  useEffect(() => {
    podcast.like = formatLike(podcast.like);
    podcast.comment = formatLike(podcast.comment);
  }, [podcast.like, podcast.comment]);

  // const playAudio = () => {
  //   const themeAudio = document.getElementById('Theme_' + podcastId);
  //   const voiceAudio = document.getElementById('Voice_' + podcastId);
  //   const playButton = document.getElementById('play_' + podcastId);

  //   setPodcastDuration(formatTime(voiceAudio.duration));
  //   const playButtons = document.getElementsByClassName('play');
  //   for (let i = 0; i < playButtons.length; i++) {
  //     playButtons[i].style.display = 'flex';
  //   } if (voiceAudio.paused && themeAudio.paused) {
  //     pauseAllAudio();
  //     playButton.style.display = 'none';
  //     themeAudio.play();
  //     voiceAudio.play();
  //   } else if(!themeAudio.paused && !voiceAudio.paused){
  //     playButton.style.display = 'flex';
  //     themeAudio.pause();
  //     voiceAudio.pause();
  //   }
  // };
  const playAudio = () => {
    const themeAudio = document.getElementById('Theme_' + podcastId);
    const voiceAudio = document.getElementById('Voice_' + podcastId);
    const playButton = document.getElementById('play_' + podcastId);
  
    setPodcastDuration(formatTime(voiceAudio.duration));
    const playButtons = document.getElementsByClassName('play');
  
    // Ẩn tất cả các nút play trước khi xử lý sự kiện mới
    for (let i = 0; i < playButtons.length; i++) {
      playButtons[i].style.display = 'flex';
    }
  
    if (voiceAudio.paused && themeAudio.paused) {
      pauseAllAudio();
      playButton.style.display = 'none';
      themeAudio.play().then(() => {
        voiceAudio.play().catch(error => {
          console.error('Error playing voice audio:', error);
        });
      }).catch(error => {
        console.error('Error playing theme audio:', error);
      });
    } else if (!themeAudio.paused && !voiceAudio.paused) {
      playButton.style.display = 'flex';
      themeAudio.pause();
      voiceAudio.pause();
    }
  };
  
  const pauseAllAudio = () => {
    const audioElements = document.getElementsByTagName('audio');
    for (let i = 0; i < audioElements.length; i++) {
      if (!audioElements[i].paused) {
        audioElements[i].pause();
      }
    }
  };
  const updateProgress = () => {
    const voiceAudio = document.getElementById('Voice_' + podcastId);
    const themeAudio = document.getElementById('Theme_' + podcastId);
    const currentTime = voiceAudio.currentTime;

    themeAudio.currentTime = currentTime;
    setPodcastCurrent(formatTime(currentTime));
    const progressBar = document.getElementById('pBar_' + podcastId);
    const progressPercent = (currentTime / voiceAudio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const adjustProgress = (event) => {
    const progressBar = document.getElementById('pBar_' + podcastId);
    const progressContainer = document.querySelector('.progress');
    const progressContainerRect = progressContainer.getBoundingClientRect();
    const clickPosition = event.clientX - progressContainerRect.left;
    const progressBarWidth = progressContainerRect.width;
    const percentage = (clickPosition / progressBarWidth) * 100;
    progressBar.style.width = `${percentage}%`;

    const Voice = document.getElementById('Voice_' + podcastId);
    const newTime = (percentage / 100) * Voice.duration;
    Voice.currentTime = newTime;

    const Theme = document.getElementById('Theme_' + podcastId);
    Theme.currentTime = newTime;

    const currentMinutes = Math.floor(newTime / 60);
    const currentSeconds = Math.floor(newTime % 60);
    setPodcastCurrent(`${currentMinutes}:${currentSeconds}`);
  };
  useEffect(() => {
    const voiceAudio = document.getElementById('Voice_' + podcastId);
    voiceAudio.addEventListener('timeupdate', updateProgress);
    return () => {
      voiceAudio.removeEventListener('timeupdate', updateProgress);
    };
  }, [podcastId]);

  return (
    <div className='podcastPost'>
      <img
        src='https://img.freepik.com/free-vector/detailed-podcast-logo-template_23-2148786067.jpg'
        alt='background'
        className='background'
      />
      <div className='info'>
        <h4>{podcast.name}</h4>
        <h4>{podcast.author}</h4>
        <p>{podcast.description}</p>
      </div>
      <div className='likeAndComment' onClick={playAudio}>
        <div className='like'>
          <FcLike size={30} />
          <p>{podcast.like}</p>
        </div>
        <div className='comment'>
          <FcComments size={30} />
          <p>{podcast.comment}</p>
        </div>
      </div>
      {/* {isActive && ( */}
      <div className='play' id={'play_' + podcastId}>
        <CiPlay1 />
      </div>
      {/* )} */}
      <div className='timeline'>
        <div onClick={adjustProgress} className='timeBar'>
          <div className='progress'>
            <div className='progressBar' id={'pBar_' + podcastId}></div>
          </div>
        </div>
        <div className='timer'>
          <p>
            {podcastCurrent} - {podcastDuration}
          </p>
        </div>
      </div>
      <audio hidden={true} className='themesong' src={podcast.theme_url} id={'Theme_' + podcastId} controls></audio>
      <audio hidden={true} className='voice' src={podcast.voice_url} id={'Voice_' + podcastId} controls></audio>
    </div>
  );
};

export default PodcastPost;
