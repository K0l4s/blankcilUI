import React, { useState, useRef, useEffect } from 'react';
import PodcastPost from '../../components/post/podcastPost/PodcastPost';
import './Home.css';
import podcastListSample from '../../testjson/podcastListSample.json';
const Home = () => {
  const podcasts = podcastListSample.body;
  useEffect(() => {
    document.title = 'Home - Blankcil';
  }, []);
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
