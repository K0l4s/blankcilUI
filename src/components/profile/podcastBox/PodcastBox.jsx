import React from 'react'
import './PodcastBox.css'
const PodcastBox = ({podcast}) => {
  return (
    <div className='podcastBox'>
        <div className="image">
            <img src={podcast.cover_url} alt="" />
        </div>
        <div className="info">
            <h3>{podcast.title}</h3>
            <p>{podcast.description}</p>
        </div>
    </div>
  )
}

export default PodcastBox