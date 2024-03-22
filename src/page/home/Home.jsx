import React, { useState } from 'react'
import PodcastPost from '../../components/post/podcastPost/PodcastPost'
import PodcastDetail from '../../components/post/podcastDetail/PodcastDetail'
const Home = () => {
  const podcast1 = {
    id: 'S1',
    name: 'Code4life',
    theme_url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    voice_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    background_url: null,
    like:10000,
    comment:1000
  }
  const podcast2 = {
    id: 'S2',
    name: 'Code4life',
    author: 'Huỳnh Trung Kiên',
    theme_url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    voice_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    background_url: '',
    like:38000,
    comment:1000
  }
  const podcast3 = {
    id: 'S3',
    name: 'Code4life',
    author: 'Tào Việt Đức',
    theme_url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    voice_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    background_url: null,
    like:10000,
    comment:1000
  }
  const podcast4 = {
    id: 'S4',
    name: 'Code4life',
    author: 'Nguyễn Hoàng Phương Ngân',
    theme_url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    voice_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    background_url: null,
    like:10000,
    comment:1000
  }
  const [activePodcast, setActivePodcast] = useState(false);

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(!isOpen)
  return (
    <div>
        <button onClick={()=>setActivePodcast(!activePodcast)}>Halo</button>
        <PodcastPost podcast={podcast1} active={activePodcast}/>
        <PodcastPost podcast={podcast2}/>
        <PodcastPost podcast={podcast3}/>
        <PodcastPost podcast={podcast4}/>
        <PodcastDetail isOpen={isOpen} onClose={onClose}/>
    </div>
  )
}

export default Home