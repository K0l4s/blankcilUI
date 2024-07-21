import React from 'react'
import './PodcastBox.css'
import { Tooltip } from '@chakra-ui/react';
import { IoFastFood } from 'react-icons/io5';
const PodcastBox = ({ podcast }) => {
  const shorten = (text, maxLength) => {
    if(!text) return 'Không có nội dung';
    if (text && text.length > maxLength) {
      return text.substr(0, maxLength) + '...';
    }
    return text;
  }
  return (
    <div>
      <div className='podcastBox'>
        <div className="image">
          <img src={podcast.thumbnail_url} alt="" />
        </div>
        <div className="info">
          <h3>{podcast.title}</h3>
          <p>30</p>
        </div>
      </div>
          <Tooltip hasArrow label={podcast.content} bg='gray.300' color='black'>
            <p style={{ 'width': '200px', 'cursor':'pointer'}}>{shorten(podcast.content, 24)}</p>
          </Tooltip>
    </div>
  )
}

export default PodcastBox