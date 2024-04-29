import React, { useState } from 'react'
import PodcastPost from '../../components/post/podcastPost/PodcastPost'
import PodcastDetail from '../../components/post/podcastDetail/PodcastDetail'
import './Home.css'
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
  const [activePodcast, setActivePodcast] = useState(false);

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(!isOpen)
  return (
    <div className='home'>
      <p style={{color:'white'}}>@More about this project</p>
        {podcasts.map((podcast, index) => (
          <PodcastPost key={index} index={index} podcast={podcast} />
        ))}
        <PodcastDetail isOpen={isOpen} onClose={onClose}/>
    </div>
  )
}

export default Home