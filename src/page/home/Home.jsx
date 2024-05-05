import React, { useState, useRef, useEffect } from 'react';
import PodcastPost from '../../components/post/podcastPost/PodcastPost';
import './Home.css';

const Home = () => {
  const podcasts = [
    {
      title: 'Podcast 01',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      title: 'Podcast 02',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      title: 'Podcast 03',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
  ];
  
  return (
    <div className="home">
      <p style={{ color: 'white' }}>@Blankcil Team</p>
      <div>
        {podcasts.map((podcast, index) => (
          <PodcastPost
            key={index}
            index={index}
            podcast={podcast}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
