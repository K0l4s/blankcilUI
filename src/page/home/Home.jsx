import React, { useState, useRef, useEffect } from 'react';
import PodcastPost from '../../components/post/podcastPost/PodcastPost';
import './Home.css';
import podcastListSample from '../../testjson/podcastListSample.json';
import { apiPath } from '../../api/endpoint';
const Home = () => {
  // const podcasts = podcastListSample.body;
  const [podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    fetch(apiPath+'podcast/view/page?pageNumber=0&trending=false')
      .then((response) => response.json())
      .then((data) => {
        setPodcasts(data.body);
      });
  }, []);
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
