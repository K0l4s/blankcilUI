import React, { useState, useRef, useEffect } from 'react';
import PodcastPost from '../../components/post/podcastPost/PodcastPost';
import PodcastDetail from '../../components/post/podcastDetail/PodcastDetail';
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

  const [isOpen, setIsOpen] = useState(false);
  const [activePodcast, setActivePodcast] = useState(null);

  const handleClose = () => {
    setIsOpen(false);
    setActivePodcast(null);
  };

  const handlePodcastClick = (podcastIndex) => {
    setIsOpen(true);
    setActivePodcast(podcasts[podcastIndex]);
  };
  
  return (
    <div className="home">
      <p style={{ color: 'white' }}>@Blankcil Team</p>
      <div>
        {podcasts.map((podcast, index) => (
          <PodcastPost
            key={index}
            index={index}
            podcast={podcast}
            onClick={() => handlePodcastClick(index)}
          />
        ))}
      </div>
      {activePodcast && (
        <PodcastDetail
          isOpen={isOpen}
          onClose={handleClose}
          podcast={activePodcast}
        />
      )}
    </div>
  );
};

export default Home;
