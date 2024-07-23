import React from 'react'
import './PodcastPlayBox.css'
const PodcastPlayBox = () => {
  return (
    <div className='podcastPlayBox'>
      <h1>Đang phát: BẠN CỦA HÔM NAY THẾ NÀO?</h1>
      <h1>Tác giả: Nguyễn Phan Quế Mai</h1>
      <h1>Thể loại: Podcast</h1>
      <h1>Thời lượng: 1 giờ 30 phút</h1>
      <h1>Ngày phát: 20/10/2021</h1>
      <div className='podcastPlayBox__control'>
        <button>Phát</button>
        <button>Tạm dừng</button>
        <button>Quay lại</button>
        <button>Chuyển tiếp</button>
        <div className="video_controls">
        <div className="time">
          <p style={{fontFamily:'Blackoninaut Bold BRK'}}></p>
        </div>
        <div className="timeline">
          <div className="progress" style={{ width: `0%` }}><div className="currentDot"></div></div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default PodcastPlayBox